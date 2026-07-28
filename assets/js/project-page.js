/*
 * Shared demo-tabs component for teamROBI academic project pages.
 * Markup contract (see docs/PROJECT_PAGES.md):
 *
 *   <div class="pp-tabs" data-pp-tabs>
 *     <div class="pp-tab-list" role="tablist" aria-label="...">
 *       <button class="pp-tab" role="tab" id="tab-x" aria-controls="panel-x" aria-selected="true">...</button>
 *       ...
 *     </div>
 *     <div class="pp-tab-panel" id="panel-x" role="tabpanel" aria-labelledby="tab-x">...</div>
 *     <div class="pp-tab-panel" id="panel-y" role="tabpanel" aria-labelledby="tab-y" hidden>...</div>
 *   </div>
 *
 * Images use native lazy-loading (loading="lazy"). Video panels may use
 * <video data-src="..."> to defer loading until the tab is activated —
 * this component assigns src/calls load() on activation and pauses/clears
 * on deactivation, so inactive-tab videos are never fetched.
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function activateVideosIn(panel) {
    var videos = panel.querySelectorAll("video[data-src]");
    for (var i = 0; i < videos.length; i++) {
      var video = videos[i];
      var source = video.querySelector("source[data-src]") || video;
      var target = source.tagName === "SOURCE" ? source : video;
      target.setAttribute("src", target.getAttribute("data-src"));
      video.load();
      if (!prefersReducedMotion && video.hasAttribute("autoplay")) {
        var playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(function () {
            /* Autoplay was blocked — the poster image / controls remain usable. */
          });
        }
      }
    }
  }

  function deactivateVideosIn(panel) {
    var videos = panel.querySelectorAll("video");
    for (var i = 0; i < videos.length; i++) {
      var video = videos[i];
      video.pause();
    }
  }

  function initTabs(root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    function panelFor(tab) {
      return document.getElementById(tab.getAttribute("aria-controls"));
    }

    function select(tab, moveFocus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.tabIndex = selected ? 0 : -1;
        var panel = panelFor(t);
        if (!panel) return;
        if (selected) {
          panel.hidden = false;
          activateVideosIn(panel);
        } else {
          deactivateVideosIn(panel);
          panel.hidden = true;
        }
      });
      if (moveFocus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        select(tab, false);
      });

      tab.addEventListener("keydown", function (event) {
        var newIndex = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          newIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          newIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          newIndex = 0;
        } else if (event.key === "End") {
          newIndex = tabs.length - 1;
        }
        if (newIndex !== null) {
          event.preventDefault();
          select(tabs[newIndex], true);
        }
      });
    });

    // Ensure initial state matches whichever tab is marked aria-selected="true"
    // in the markup (falls back to the first tab).
    var initial =
      tabs.filter(function (t) {
        return t.getAttribute("aria-selected") === "true";
      })[0] || tabs[0];
    select(initial, false);
  }

  // ---- frame scrubber (scrub/play through a precomputed image sequence) ----
  // Markup contract:
  //   <div data-pp-scrubber data-frames='["url1","url2",...]'>
  //     <div class="pp-viewer-stage"><img class="pp-scrubber-img" src="url1"></div>
  //     <div class="pp-viewer-controls">
  //       <button data-pp-scrubber-play>Play</button>
  //       <input type="range" class="pp-timeline-range">
  //       <span class="pp-timeline-count"></span>
  //     </div>
  //   </div>
  function initScrubber(root) {
    var img = root.querySelector(".pp-scrubber-img");
    var range = root.querySelector(".pp-timeline-range");
    var count = root.querySelector(".pp-timeline-count");
    var play = root.querySelector("[data-pp-scrubber-play]");
    if (!img || !range) return;

    var frames;
    try {
      frames = JSON.parse(root.getAttribute("data-frames"));
    } catch (e) {
      return;
    }
    if (!frames || !frames.length) return;

    range.min = 0;
    range.max = frames.length - 1;

    function setFrame(i) {
      i = Math.max(0, Math.min(frames.length - 1, i));
      img.src = frames[i];
      range.value = i;
      if (count) count.textContent = "frame " + (i + 1) + " / " + frames.length;
    }

    var playing = false,
      raf = null;
    function stop() {
      playing = false;
      if (raf) cancelAnimationFrame(raf);
      if (play) play.textContent = "▶ Play";
    }
    function start() {
      if (prefersReducedMotion) return;
      playing = true;
      if (play) play.textContent = "⏸ Pause";
      var last = 0,
        msPerFrame = 500;
      (function step(t) {
        if (!playing) return;
        if (t - last >= msPerFrame) {
          last = t;
          setFrame((+range.value + 1) % frames.length);
        }
        raf = requestAnimationFrame(step);
      })(0);
    }

    range.addEventListener("input", function () {
      stop();
      setFrame(+range.value);
    });
    if (play) {
      play.addEventListener("click", function () {
        playing ? stop() : start();
      });
    }

    setFrame(0);
  }

  function init() {
    var tabRoots = document.querySelectorAll("[data-pp-tabs]");
    for (var i = 0; i < tabRoots.length; i++) {
      initTabs(tabRoots[i]);
    }
    var scrubberRoots = document.querySelectorAll("[data-pp-scrubber]");
    for (var j = 0; j < scrubberRoots.length; j++) {
      initScrubber(scrubberRoots[j]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
