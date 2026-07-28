/*
 * Self-contained WebGL2 point-cloud viewer for the OV-MAP project page.
 * No external dependencies (CSP-safe): loads a quantized .bin point cloud and a
 * JSON manifest, then renders it with three view modes — RGB scan, per-instance
 * segmentation, and open-vocabulary query highlight.
 *
 * Markup contract:
 *   <div class="pp-viewer" data-ovmap-viewer
 *        data-bin="/assets/data/projects/ov-map/scene0011_00.bin"
 *        data-manifest="/assets/data/projects/ov-map/scene0011_00.json">
 *     <canvas class="pp-viewer-canvas"></canvas>
 *     <div class="pp-viewer-modes">...</div>   (optional, buttons wired by data-attrs)
 *     <div class="pp-viewer-queries"></div>     (query chips injected here)
 *   </div>
 */
(function () {
  "use strict";

  var ACCENT = [0.98, 0.36, 0.14]; // highlight color
  var DIM = [0.82, 0.82, 0.84]; // non-matching color when a query is active

  // Shared fetch cache so multiple viewers on one page (e.g. the demo + the merge
  // animation, which use the same scene) download each asset only once.
  var fetchCache = {};
  function fetchOnce(url, kind) {
    if (!fetchCache[url]) {
      fetchCache[url] = fetch(url).then(function (r) {
        return kind === "json" ? r.json() : r.arrayBuffer();
      });
    }
    return fetchCache[url];
  }

  // ---- minimal mat4 helpers ------------------------------------------------
  function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
      nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
  }
  function lookAt(out, eye, center, up) {
    var z0 = eye[0] - center[0],
      z1 = eye[1] - center[1],
      z2 = eye[2] - center[2];
    var zl = 1 / Math.hypot(z0, z1, z2);
    z0 *= zl;
    z1 *= zl;
    z2 *= zl;
    var x0 = up[1] * z2 - up[2] * z1,
      x1 = up[2] * z0 - up[0] * z2,
      x2 = up[0] * z1 - up[1] * z0;
    var xl = Math.hypot(x0, x1, x2) || 1;
    xl = 1 / xl;
    x0 *= xl;
    x1 *= xl;
    x2 *= xl;
    var y0 = z1 * x2 - z2 * x1,
      y1 = z2 * x0 - z0 * x2,
      y2 = z0 * x1 - z1 * x0;
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]);
    out[13] = -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]);
    out[14] = -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]);
    out[15] = 1;
    return out;
  }
  function multiply(out, a, b) {
    for (var i = 0; i < 4; i++) {
      var ai0 = a[i],
        ai1 = a[i + 4],
        ai2 = a[i + 8],
        ai3 = a[i + 12];
      out[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
      out[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
      out[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
      out[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
    }
    return out;
  }

  var VERT =
    "#version 300 es\n" +
    "layout(location=0) in vec3 aPos;\n" +
    "layout(location=1) in vec3 aRGB;\n" +
    "layout(location=2) in vec3 aInst;\n" +
    "layout(location=3) in float aHi;\n" +
    "layout(location=4) in float aReveal;\n" +
    "layout(location=5) in vec3 aSegNaive;\n" +
    "uniform mat4 uMVP;\n" +
    "uniform float uPoint;\n" +
    "uniform int uMode;\n" + // 0 rgb, 1 instance, 2 query, 3 naive/ablation instance coloring
    "uniform float uReveal;\n" + // points with aReveal > uReveal are hidden (merge animation)
    "uniform vec3 uAccent;\n" +
    "uniform vec3 uDim;\n" +
    "out vec3 vColor;\n" +
    "void main(){\n" +
    "  if (aReveal > uReveal) { gl_Position = vec4(2.0,2.0,2.0,1.0); gl_PointSize = 0.0; return; }\n" +
    "  gl_Position = uMVP * vec4(aPos,1.0);\n" +
    "  gl_PointSize = clamp(uPoint / max(gl_Position.w, 0.15), 2.0, 22.0);\n" +
    "  if(uMode==0){ vColor=aRGB; }\n" +
    "  else if(uMode==1){ vColor=aInst; }\n" +
    "  else if(uMode==3){ vColor=aSegNaive; }\n" +
    "  else { vColor = aHi>0.5 ? uAccent : uDim; }\n" +
    "}\n";

  var FRAG =
    "#version 300 es\n" +
    "precision mediump float;\n" +
    "in vec3 vColor;\n" +
    "out vec4 outColor;\n" +
    "void main(){\n" +
    "  vec2 d = gl_PointCoord - vec2(0.5);\n" +
    "  if(dot(d,d) > 0.25) discard;\n" +
    "  outColor = vec4(vColor,1.0);\n" +
    "}\n";

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(s) || "shader compile failed");
    }
    return s;
  }

  // Multiple viewers can request a WebGL2 context in the same tick (one per demo
  // scene); on some browsers/GPUs the very first context creation right after page
  // load is flaky and briefly returns null even though WebGL2 is genuinely supported
  // (a reload "fixes" it once the GPU process has caught up). Retry a couple of times
  // with a short delay before concluding it's actually unsupported.
  function getWebGL2ContextRetrying(canvas, attempt, cb) {
    var gl = canvas.getContext("webgl2", { antialias: true, alpha: false });
    if (gl || attempt >= 3) {
      cb(gl);
      return;
    }
    setTimeout(function () {
      getWebGL2ContextRetrying(canvas, attempt + 1, cb);
    }, 150);
  }

  function initViewer(root) {
    var canvas = root.querySelector(".pp-viewer-canvas");
    var binUrl = root.getAttribute("data-bin");
    var manifestUrl = root.getAttribute("data-manifest");
    if (!canvas || !binUrl || !manifestUrl) return;

    getWebGL2ContextRetrying(canvas, 0, function (gl) {
      if (!gl) {
        root.classList.add("pp-viewer--unsupported");
        return;
      }
      initViewerWithContext(root, canvas, binUrl, manifestUrl, gl);
    });
  }

  function initViewerWithContext(root, canvas, binUrl, manifestUrl, gl) {
    var timeline = root.hasAttribute("data-ovmap-timeline");
    var state = {
      radius: 2.4,
      theta: 0.9,
      phi: 1.15,
      target: [0, 0, 0],
      mode: timeline ? 1 : 0, // merge animation shows instance colors accumulating
      dirty: true,
      n: 0,
      reveal: timeline ? 0 : 255, // 255 = all points shown
    };
    var mvp = new Float32Array(16),
      view = new Float32Array(16),
      proj = new Float32Array(16);

    var prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    var uMVP = gl.getUniformLocation(prog, "uMVP");
    var uPoint = gl.getUniformLocation(prog, "uPoint");
    var uMode = gl.getUniformLocation(prog, "uMode");
    var uReveal = gl.getUniformLocation(prog, "uReveal");
    gl.uniform3fv(gl.getUniformLocation(prog, "uAccent"), ACCENT);
    gl.uniform3fv(gl.getUniformLocation(prog, "uDim"), DIM);

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    var hiBuf = null,
      hiArray = null,
      instByPoint = null;

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(1, 1, 1, 1);

    // Draw only when something changed. markDirty() schedules a single frame; the loop
    // does not spin at 60 fps when the scene is static (no per-frame layout reads / draws).
    var frameQueued = false;
    function markDirty() {
      state.dirty = true;
      if (!frameQueued) {
        frameQueued = true;
        requestAnimationFrame(render);
      }
    }

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.round(canvas.clientWidth * dpr),
        h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        state.dirty = true;
      }
    }

    function render() {
      frameQueued = false;
      resize();
      if (!state.dirty) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      var eye = [
        state.target[0] + state.radius * Math.sin(state.phi) * Math.cos(state.theta),
        state.target[1] + state.radius * Math.sin(state.phi) * Math.sin(state.theta),
        state.target[2] + state.radius * Math.cos(state.phi),
      ];
      perspective(proj, 0.9, canvas.width / canvas.height, 0.01, 100);
      lookAt(view, eye, state.target, [0, 0, 1]);
      multiply(mvp, proj, view);
      gl.uniformMatrix4fv(uMVP, false, mvp);
      // point size proportional to view distance so apparent density stays stable
      gl.uniform1f(uPoint, state.radius * 3.0 * Math.min(window.devicePixelRatio || 1, 2));
      gl.uniform1i(uMode, state.mode);
      gl.uniform1f(uReveal, state.reveal);
      gl.drawArrays(gl.POINTS, 0, state.n);
      state.dirty = false;
    }

    function attrib(loc, buffer, size, type, normalize) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, type, !!normalize, 0, 0);
    }

    function upload(bin, manifest) {
      var n = manifest.nPoints,
        scale = manifest.posScale;
      state.n = n;
      // layout: int16 xyz | uint8 rgb | uint8 seg (instance color) | [uint8 segNaive]? | uint16 inst | uint8 reveal
      // segNaive (mode 3: an ablation/comparison coloring, e.g. "no tracking") is optional —
      // manifest.hasNaiveSeg gates its presence so older manifests without it still parse correctly.
      var i16 = new Int16Array(bin, 0, n * 3);
      var off = n * 6;
      var rgb = new Uint8Array(bin, off, n * 3);
      off += n * 3;
      var seg = new Uint8Array(bin, off, n * 3);
      off += n * 3;
      var segNaive = null;
      if (manifest.hasNaiveSeg) {
        segNaive = new Uint8Array(bin, off, n * 3);
        off += n * 3;
      }
      // Uint16Array requires an even byte offset. The preceding fields are all
      // n*(odd count of 3-byte pixels), so this offset is only even when n itself is
      // even -- pad one byte when n is odd (the writer inserts the same pad byte).
      if (off % 2 !== 0) off += 1;
      var inst = new Uint16Array(bin, off, n);
      off += n * 2;
      var reveal = new Uint8Array(bin, off, n);
      instByPoint = inst;

      var pos = new Float32Array(n * 3);
      var ext = 0;
      for (var i = 0; i < n * 3; i++) {
        pos[i] = i16[i] * scale;
        if (Math.abs(pos[i]) > ext) ext = Math.abs(pos[i]);
      }
      // frame the whole scene: pull the camera back to roughly twice its extent
      state.radius = Math.max(2, ext * 2.1);
      hiArray = new Float32Array(n);

      var b;
      b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
      attrib(0, b, 3, gl.FLOAT, false);
      b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, rgb, gl.STATIC_DRAW);
      attrib(1, b, 3, gl.UNSIGNED_BYTE, true);
      b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, seg, gl.STATIC_DRAW);
      attrib(2, b, 3, gl.UNSIGNED_BYTE, true);
      hiBuf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, hiBuf);
      gl.bufferData(gl.ARRAY_BUFFER, hiArray, gl.DYNAMIC_DRAW);
      attrib(3, hiBuf, 1, gl.FLOAT, false);
      b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, reveal, gl.STATIC_DRAW);
      attrib(4, b, 1, gl.UNSIGNED_BYTE, false);
      if (segNaive) {
        b = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(gl.ARRAY_BUFFER, segNaive, gl.STATIC_DRAW);
        attrib(5, b, 3, gl.UNSIGNED_BYTE, true);
      }
      state.dirty = true;
    }

    function setHighlight(instIds) {
      if (!hiArray) return;
      var set = {};
      for (var k = 0; k < instIds.length; k++) set[instIds[k]] = 1;
      for (var i = 0; i < hiArray.length; i++) hiArray[i] = set[instByPoint[i]] ? 1 : 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, hiBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, hiArray);
      state.mode = 2;
      markDirty();
    }

    function setMode(m) {
      state.mode = m;
      markDirty();
    }

    // ---- pointer / wheel orbit controls ------------------------------------
    var dragging = false,
      lastX = 0,
      lastY = 0;
    canvas.addEventListener("pointerdown", function (e) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      state.theta -= (e.clientX - lastX) * 0.008;
      state.phi = Math.max(0.15, Math.min(Math.PI - 0.15, state.phi - (e.clientY - lastY) * 0.008));
      lastX = e.clientX;
      lastY = e.clientY;
      markDirty();
    });
    canvas.addEventListener("pointerup", function () {
      dragging = false;
    });
    canvas.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
        state.radius = Math.max(0.5, Math.min(40, state.radius * (1 + Math.sign(e.deltaY) * 0.1)));
        markDirty();
      },
      { passive: false }
    );
    window.addEventListener("resize", function () {
      markDirty();
    });
    // Redraw when the canvas actually gets/changes size (also covers the first layout,
    // so the dirty-driven loop never stalls on a zero-size initial frame).
    if (window.ResizeObserver) {
      new ResizeObserver(function () {
        markDirty();
      }).observe(canvas);
    }

    // ---- load data + wire UI -----------------------------------------------
    Promise.all([fetchOnce(binUrl, "bin"), fetchOnce(manifestUrl, "json")])
      .then(function (res) {
        var bin = res[0],
          manifest = res[1];
        upload(bin, manifest);
        buildQueryUI(root, manifest, setHighlight);
        if (timeline) setupTimeline(root, state, manifest, markDirty);
        markDirty();
      })
      .catch(function () {
        root.classList.add("pp-viewer--error");
      });

    // mode buttons declared in markup
    root.querySelectorAll("[data-ovmap-mode]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var m = parseInt(btn.getAttribute("data-ovmap-mode"), 10);
        setMode(m);
        selectButton(root, "[data-ovmap-mode]", btn);
        clearActive(root, ".pp-query-chip");
      });
    });
  }

  function buildQueryUI(root, manifest, setHighlight) {
    var wrap = root.querySelector(".pp-viewer-queries");
    if (!wrap) return;
    manifest.queryOrder.forEach(function (word) {
      var ids = manifest.queries[word];
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "pp-query-chip";
      chip.setAttribute("aria-pressed", "false");
      chip.textContent = word + " (" + ids.length + ")";
      chip.addEventListener("click", function () {
        setHighlight(ids);
        selectButton(root, ".pp-query-chip", chip);
        clearActive(root, "[data-ovmap-mode]");
      });
      wrap.appendChild(chip);
    });
  }

  function setupTimeline(root, state, manifest, requestFrame) {
    var range = root.querySelector(".pp-timeline-range");
    var play = root.querySelector("[data-ovmap-play]");
    var count = root.querySelector(".pp-timeline-count");
    var nViews = manifest.nViews || 1;
    var playing = false,
      raf = null;

    function viewOf(r) {
      return Math.min(nViews, Math.max(0, Math.round((r / 255) * nViews)));
    }
    function setReveal(r) {
      state.reveal = r;
      requestFrame();
      if (range) range.value = r;
      if (count) count.textContent = "view " + viewOf(r) + " / " + nViews;
    }
    function stop() {
      playing = false;
      if (raf) cancelAnimationFrame(raf);
      if (play) play.textContent = "▶ Play";
    }
    function start() {
      playing = true;
      if (play) play.textContent = "⏸ Pause";
      var from = state.reveal >= 255 ? 0 : state.reveal;
      var t0 = performance.now();
      var dur = (6000 * (255 - from)) / 255;
      (function step(t) {
        if (!playing) return;
        var f = from + (255 - from) * Math.min(1, (t - t0) / Math.max(dur, 1));
        setReveal(Math.round(f));
        if (f >= 255) {
          stop();
          return;
        }
        raf = requestAnimationFrame(step);
      })(t0);
    }

    if (range)
      range.addEventListener("input", function () {
        stop();
        setReveal(+range.value);
      });
    if (play)
      play.addEventListener("click", function () {
        playing ? stop() : start();
      });
    setReveal(0);
  }

  function selectButton(root, selector, active) {
    clearActive(root, selector);
    active.classList.add("is-active");
    if (active.hasAttribute("aria-pressed")) active.setAttribute("aria-pressed", "true");
  }
  function clearActive(root, selector) {
    root.querySelectorAll(selector).forEach(function (b) {
      b.classList.remove("is-active");
      if (b.hasAttribute("aria-pressed")) b.setAttribute("aria-pressed", "false");
    });
  }

  // ---- before/after image comparison slider (used for depth supplementation) ----
  function initCompare(root) {
    var before = root.querySelector(".pp-compare-before");
    var range = root.querySelector(".pp-compare-range");
    var handle = root.querySelector(".pp-compare-handle");
    if (!before || !range) return;
    function apply() {
      var v = +range.value;
      before.style.clipPath = "inset(0 " + (100 - v) + "% 0 0)";
      if (handle) handle.style.left = v + "%";
    }
    range.addEventListener("input", apply);
    apply();
  }

  // A viewer inside a hidden tab panel (display:none) has a zero-size canvas at page
  // load; on some browsers WebGL2 context creation on a zero-size/hidden canvas fails
  // outright (not just flakily), so switching to that tab later never recovers -- the
  // failure was already latched in. Defer init until the canvas is actually laid out.
  function initViewerWhenVisible(root) {
    var canvas = root.querySelector(".pp-viewer-canvas");
    if (!canvas) return;
    var rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      initViewer(root);
      return;
    }
    if (!window.IntersectionObserver) {
      initViewer(root);
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var r = entries[i].target.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          obs.disconnect();
          initViewer(root);
          return;
        }
      }
    });
    obs.observe(canvas);
  }

  function init() {
    var roots = document.querySelectorAll("[data-ovmap-viewer]");
    for (var i = 0; i < roots.length; i++) initViewerWhenVisible(roots[i]);
    var cmp = document.querySelectorAll("[data-pp-compare]");
    for (var j = 0; j < cmp.length; j++) initCompare(cmp[j]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
