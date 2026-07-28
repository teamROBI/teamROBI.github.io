---
layout: page
title: "CDIS: Cross-Dimensional Class-Agnostic 3D Instance Segmentation via 2D Mask Tracking and 3D–2D Projection Merging"
description: IEEE/RSJ IROS 2025
permalink: /projects/cdis/
_styles: |
  @import url("/assets/css/project-page.css");
  /* These figures are the paper's own exported figure files (not screen
     captures), so they have no inherent breathing room like a captured
     crop would — add it back here so they don't look edge-to-edge. */
  .pp-figure img {
    padding: 1.5rem;
    box-sizing: border-box;
  }
  .pp-figure--queue {
    max-width: 85%;
    margin-left: auto;
    margin-right: auto;
  }
  .project-page .pp-note--overlay {
    font-size: 0.83rem;
  }
---

<div class="project-page">

  <header class="pp-header">
    <p class="pp-venue">IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) 2025</p>
    <p class="pp-authors">
      Juno Kim<sup>1,*</sup> ·
      Hye-Jung Yoon<sup>1,*</sup> ·
      Yesol Park<sup>1,*</sup> ·
      Byoung-Tak Zhang<sup>1</sup>
    </p>
    <p class="pp-affiliations">
      <sup>1</sup>Interdisciplinary Program in AI, Seoul National University
      <br>
      <sup>*</sup>Equal contribution
    </p>
    <div class="pp-buttons">
      <a href="https://arxiv.org/abs/2607.17778" target="_blank" rel="noopener noreferrer">arXiv</a>
      <a href="https://ieeexplore.ieee.org/document/11247636" target="_blank" rel="noopener noreferrer">Paper</a>
      <a href="https://github.com/teamROBI/CDIS" target="_blank" rel="noopener noreferrer">Code</a>
      <a href="#bibtex">BibTeX</a>
    </div>
  </header>

  <div class="pp-teaser pp-figure pp-figure--md">
    {% include figure.liquid loading="eager" path="assets/img/projects/cdis/teaser.png" class="img-fluid rounded z-depth-1" alt="Overview of CDIS: a reconstructed 3D scene from sequentially captured RGB-D frames at timestamps t1, t2, t3, with 2D instance segmentation results shown below progressively improving via mask tracking across frames." %}
  </div>

  <p class="pp-tldr">
    CDIS is a <strong>zero-shot, class-agnostic 3D instance segmentation</strong> framework
    that explicitly tracks 2D instance masks across frames and cross-references them with
    3D superpoints — creating a feedback loop between 2D and 3D that produces globally
    consistent 3D instance labels without any 3D-specific training.
  </p>

  <section class="pp-section" id="demo">
    <h2>Interactive Demo</h2>
    <p>
      These are real CDIS outputs — ScanNet200 scenes that CDIS segmented into class-agnostic
      3D instance masks by tracking 2D masks across frames and merging them with 3D superpoints,
      with <em>no</em> 3D-supervised network. Pick a scene below, drag to rotate, scroll to zoom,
      and switch between the raw 3D scan and CDIS's predicted instances.
    </p>
    <div class="pp-tabs" data-pp-tabs>
      <div class="pp-tab-list" role="tablist" aria-label="Demo scenes">
        <button class="pp-tab" role="tab" id="tab-scene0011-00" aria-controls="panel-scene0011-00" aria-selected="true">scene0011_00</button>
        <button class="pp-tab" role="tab" id="tab-scene0609" aria-controls="panel-scene0609" aria-selected="false" tabindex="-1">scene0609_03</button>
      </div>

      <div class="pp-tab-panel" id="panel-scene0011-00" role="tabpanel" aria-labelledby="tab-scene0011-00">
        <div
          class="pp-viewer"
          data-ovmap-viewer
          data-bin="{{ '/assets/data/projects/cdis/scene0011_00.bin' | relative_url }}"
          data-manifest="{{ '/assets/data/projects/cdis/scene0011_00.json' | relative_url }}"
        >
          <div class="pp-viewer-stage">
            <canvas class="pp-viewer-canvas" aria-label="Interactive 3D point cloud of CDIS scene0011_00"></canvas>
            <span class="pp-viewer-hint">drag to rotate · scroll to zoom</span>
          </div>
          <div class="pp-viewer-controls">
            <span class="pp-control-label">View</span>
            <button type="button" class="pp-mode-btn is-active" data-ovmap-mode="0" aria-pressed="true">3D Scene</button>
            <button type="button" class="pp-mode-btn" data-ovmap-mode="1" aria-pressed="false">Class-Agnostic Instances</button>
            <button type="button" class="pp-mode-btn" data-ovmap-mode="3" aria-pressed="false">Naive (No Tracking)</button>
          </div>
        </div>
        <p class="pp-note">
          <strong>Naive (No Tracking)</strong> replays CDIS's pre-paper prototype: per-frame 2D
          masks are projected into 3D and merged directly, with no cross-frame 2D tracking step.
          On this scene it fragments objects into 83 instances instead of 62 — the same failure
          mode the paper argues against, from an earlier point in this repo's own history.
        </p>
      </div>

      <div class="pp-tab-panel" id="panel-scene0609" role="tabpanel" aria-labelledby="tab-scene0609" hidden>
        <div
          class="pp-viewer"
          data-ovmap-viewer
          data-bin="{{ '/assets/data/projects/cdis/scene0609_03.bin' | relative_url }}"
          data-manifest="{{ '/assets/data/projects/cdis/scene0609_03.json' | relative_url }}"
        >
          <div class="pp-viewer-stage">
            <canvas class="pp-viewer-canvas" aria-label="Interactive 3D point cloud of CDIS scene0609_03"></canvas>
            <span class="pp-viewer-hint">drag to rotate · scroll to zoom</span>
          </div>
          <div class="pp-viewer-controls">
            <span class="pp-control-label">View</span>
            <button type="button" class="pp-mode-btn is-active" data-ovmap-mode="0" aria-pressed="true">3D Scene</button>
            <button type="button" class="pp-mode-btn" data-ovmap-mode="1" aria-pressed="false">Class-Agnostic Instances</button>
            <button type="button" class="pp-mode-btn" data-ovmap-mode="3" aria-pressed="false">Naive (No Tracking)</button>
          </div>
        </div>
        <p class="pp-note">
          <strong>Naive (No Tracking)</strong> replays CDIS's pre-paper prototype: per-frame 2D
          masks are projected into 3D and merged directly, with no cross-frame 2D tracking step.
          On this scene it fragments objects into 66 instances instead of 22 — the same failure
          mode the paper argues against, from an earlier point in this repo's own history.
        </p>
      </div>
    </div>
    <p class="pp-note">
      CDIS is class-agnostic — it labels <em>instances</em>, not object categories — so there is
      no open-vocabulary query here. Each color is a distinct 3D instance produced by tracking 2D
      masks across frames and merging them with 3D superpoints; structural surfaces (wall, floor)
      and points CDIS left unassigned are shown in gray. Computed offline and replayed here for an
      instant response.
    </p>
  </section>

  <section class="pp-section" id="abstract">
    <h2>Abstract</h2>
    <p>
      Class-agnostic 3D instance segmentation is critical for robotic systems operating in
      unknown environments, enabling perception of previously unseen objects for reliable
      manipulation and navigation. Existing approaches typically project per-frame 2D
      instance masks into 3D and merge them, which often breaks object identities across
      time and yields fragmented 3D instances. We introduce Cross-Dimensional Class-Agnostic
      3D Instance Segmentation (CDIS), a zero-shot framework that explicitly tracks 2D
      instance masks across frames and associates them with 3D superpoints, creating a
      feedback loop between 2D and 3D. This cross-dimensional reasoning links temporally
      stable 2D tracks with spatially coherent 3D regions, producing globally consistent 3D
      instance labels without any 3D-specific training. Experiments on benchmark datasets
      demonstrate that CDIS achieves higher accuracy and consistency than state-of-the-art
      zero-shot methods, while remaining efficient and scalable to diverse real-world
      environments.
    </p>
  </section>

  <section class="pp-section" id="method">
    <h2>Method</h2>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/cdis/method.jpg" class="img-fluid rounded z-depth-1" alt="Overall framework of CDIS: posed RGB-D frames are input to a 2D mask predictor, tracked over time via 2D instance tracking, merged with 3D superpoints via 3D instance merging, producing a class-agnostic 3D instance segmentation." caption="Overall framework of CDIS. Posed RGB-D frames are input to a 2D mask predictor to generate instance masks for each frame, which are tracked over time using depth-based projection, frame warping, and 2D IoU matching. Tracked masks are then associated with pre-computed 3D superpoints, enabling spatio-temporal merging of instances across frames based on geometric consistency. Finally, duplicate superpoint assignments are resolved through overlap and temporal co-occurrence analysis, resulting in a unified and consistent 3D instance segmentation." %}
    </figure>
    <p>CDIS produces 3D instance segmentation in three stages:</p>
    <ol>
      <li>
        <strong>2D instance tracking</strong> — a 2D mask predictor generates per-frame
        instance masks, which are projected into 3D using depth and warped from past frames
        via the relative camera transform. Instances are matched across frames by 2D
        mask IoU, giving temporally consistent 2D instance labels even when a single frame's
        segmentation is noisy.
      </li>
      <li>
        <strong>3D-guided 2D instance merging</strong> — pre-computed 3D superpoints are
        projected onto every frame; each superpoint is assigned the instance label it
        overlaps most in that frame. Instance pairs whose associated superpoints agree
        strongly (3D IoU) are merged, hierarchically halving the number of frame groups
        until a single consistent set of instance identities remains.
      </li>
      <li>
        <strong>3D instance consolidation</strong> — since multiple instance IDs can share
        superpoints, an iterative refinement resolves overlapping and duplicate assignments
        (via 3D IoMin and temporal co-occurrence analysis) until every superpoint maps to
        exactly one instance ID.
      </li>
    </ol>
    <p>
      This bidirectional design — 2D tracking corrects short-term per-frame errors, while 3D
      superpoint structure resolves spatial ambiguity and prevents long-term drift — is what
      the paper calls <em>cross-dimensional</em> processing.
    </p>
  </section>

  <section class="pp-section" id="tracking-2d">
    <h2>2D Instance Tracking</h2>
    <p>
      This is CDIS's real cached tracking output on <code>scene0011_00</code> — 16 sampled
      frames spanning a ~230-frame stretch of the camera trajectory, with each 2D instance
      mask colored by its <em>tracked</em> id. Scrub through them (or press play): the same
      object keeps the same color as the camera moves, even as other instances enter and
      leave the frame.
    </p>
    {% assign tracking_frames = "0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225" | split: "," %}
    <div
      class="pp-viewer"
      data-pp-scrubber
      data-frames="[{% for idx in tracking_frames %}&quot;{{ '/assets/img/projects/cdis/tracking/frame_' | append: idx | append: '.jpg' | relative_url }}&quot;{% unless forloop.last %},{% endunless %}{% endfor %}]"
    >
      <div class="pp-viewer-stage">
        <img
          class="pp-scrubber-img"
          src="{{ '/assets/img/projects/cdis/tracking/frame_0.jpg' | relative_url }}"
          alt="RGB frame overlaid with CDIS's tracked 2D instance mask"
          loading="eager"
        />
      </div>
      <div class="pp-viewer-controls">
        <button type="button" class="pp-mode-btn" data-pp-scrubber-play>▶ Play</button>
        <input type="range" class="pp-timeline-range" min="0" max="15" value="0" aria-label="Scrub through tracked frames" />
        <span class="pp-timeline-count">frame 1 / 16</span>
      </div>
    </div>
    <p class="pp-note pp-note--overlay">
      Overlay is the raw RGB frame blended with CDIS's tracked 2D instance mask (from
      <code>CDIS/matching_2d.py</code>); gray means no instance at that pixel.
    </p>
    <p>
      CDIS also ships its own visualization for the tracker's internal state: the current
      frame's mask (leftmost) alongside the last four frames warped into it, all colored by
      tracked id. Watching the right-hand panels shows exactly what the tracker is matching
      the current frame against, frame by frame, across the full trajectory.
    </p>
    <video
      class="pp-demo-video"
      controls
      muted
      playsinline
      preload="none"
      poster="{{ '/assets/img/projects/cdis/posters/demo_2d_matching.jpg' | relative_url }}"
    >
      <source src="{{ '/assets/video/projects/cdis/demo_2d_matching.mp4' | relative_url }}" type="video/mp4" />
    </video>
    <p class="pp-note">
      Rendered by the codebase's own <code>visualize_warped_masks_over_time</code> debug
      visualization (<code>utils/util.py</code>).
    </p>
    <p>
      Tracking doesn't just match against the previous frame — each frame is matched against a
      sliding <strong>queue of the last <code>q_max</code> = 5 frames</strong>
      (<code>matching_2d.queue_size</code>), so an instance can be re-identified even after
      going undetected for a few frames in between. This is a real example from the same scene:
      the door edge (highlighted red, id 679) is tracked in frame 410, missed entirely by the 2D
      mask predictor for three straight frames, then re-matched to the <em>same</em> id in frame
      414 — 4 frames back, within the queue window. A predictor that only compared to frame
      <em>t&minus;1</em> would have assigned it a brand-new id here.
    </p>
    <figure class="pp-figure pp-figure--queue">
      {% include figure.liquid loading="lazy" path="assets/img/projects/cdis/tracking/queue_recovery.jpg" class="img-fluid rounded z-depth-1" alt="Five consecutive frames (410-414). The door edge (id 679, highlighted red) is tracked in frame 410, goes undetected in frames 411-413, and is re-matched to the same id in frame 414." caption="Frames 410-414 of scene0011_00's trajectory. The door edge (id 679, red) drops out of the 2D mask predictor for 3 frames and is recovered with the same tracked id 4 frames later, thanks to the 5-frame matching queue." %}
    </figure>
  </section>

  <section class="pp-section" id="results">
    <h2>Results</h2>
    <p>Class-agnostic instance segmentation AP on ScanNet200 and ScanNet++ (paper Tables I &amp; II).</p>
    <div class="pp-table-scroll">
      <table>
        <thead>
          <tr>
            <th>Dataset</th>
            <th>Model</th>
            <th>2D Model</th>
            <th>AP</th>
            <th>AP50</th>
            <th>AP25</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="3">ScanNet200</td>
            <td>Open3DIS (best prior, SAM)</td>
            <td>SAM</td>
            <td>31.5</td><td>45.3</td><td>51.9</td>
          </tr>
          <tr>
            <td>OV-Map (best prior, CropFormer)</td>
            <td>CropFormer</td>
            <td>29.9</td><td>49.4</td><td>57.8</td>
          </tr>
          <tr>
            <td><strong>Ours (CropFormer)</strong></td>
            <td>CropFormer</td>
            <td class="pp-best">33.2</td><td class="pp-best">52.1</td><td class="pp-best">69.2</td>
          </tr>
          <tr>
            <td rowspan="2">ScanNet++</td>
            <td>MaskClustering (best prior)</td>
            <td>CropFormer</td>
            <td>27.9</td><td>42.8</td><td class="pp-best">54.7</td>
          </tr>
          <tr>
            <td><strong>Ours (CropFormer)</strong></td>
            <td>CropFormer</td>
            <td class="pp-best">28.2</td><td class="pp-best">43.7</td><td>54.3</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="pp-note">
      Mask3D (a fully-supervised model trained with 3D ground-truth masks) scores higher
      still (AP 39.7 on ScanNet200) but requires dense 3D annotation; CDIS is zero-shot and
      uses no 3D-specific training.
    </p>

    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/cdis/qualitative.jpg" class="img-fluid rounded z-depth-1" alt="Qualitative comparison on ScanNet200 across four scenes: Input, GT, Mask3D, SAM3D, and CDIS (Ours). CDIS more closely matches the ground truth instance boundaries than Mask3D and SAM3D, with fewer over-segmentation errors highlighted by red circles." caption="Comparison of class-agnostic 3D instance segmentation on ScanNet200. From left to right: input, ground truth (GT), Mask3D, SAM3D, and CDIS (ours). CDIS improves segmentation accuracy, particularly in distinguishing object boundaries and reducing over-segmentation, as highlighted with red circles." %}
    </figure>

  </section>

  <section class="pp-section" id="real-world">
    <h2>Real-World Experiments</h2>
    <p>
      CDIS was also validated on real-world RGB-D data (not from ScanNet200/ScanNet++)
      captured with RTAB-Map visual SLAM across an office, a bedroom, and a kitchen —
      reconstructed via TSDF volume integration, with no 3D-specific training involved.
    </p>
    <figure class="pp-figure pp-figure--sm">
      {% include figure.liquid loading="lazy" path="assets/img/projects/cdis/real-world.jpg" class="img-fluid rounded z-depth-1" alt="Real-world class-agnostic 3D instance segmentation examples: an office scene (red), a bedroom scene (yellow), and a kitchen scene (blue), each with class-agnostic instance segmentation overlaid." caption="Example of real-world class-agnostic 3D instance segmentation. CDIS performance across an office (red), a bedroom (yellow), and a kitchen (blue) — effectively segmenting cluttered and complex scenes without 3D training." %}
    </figure>
  </section>

  <section class="pp-section" id="bibtex">
    <h2>BibTeX</h2>
    <div class="pp-bibtex">
{% highlight bibtex %}
@inproceedings{kim2025cdis,
  title={CDIS: Cross-Dimensional Class-Agnostic 3D Instance Segmentation via 2D Mask Tracking and 3D--2D Projection Merging},
  author={Kim, Juno and Yoon, Hye-Jung and Park, Yesol and Zhang, Byoung-Tak},
  booktitle={2025 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)},
  year={2025},
  organization={IEEE}
}
{% endhighlight %}
    </div>
  </section>

  <section class="pp-section" id="acknowledgements">
    <h2>Acknowledgements &amp; License</h2>
    <p>
      This work was partly supported by the IITP (RS-2021-II212068-AIHub/10%,
      RS-2021-II211343-GSAI/15%, RS-2022-II220951-LBA/15%, RS-2022-II220953-PICA/20%), NRF
      (RS-2024-00353991-SPARC/20%), and KEIT (RS-2024-00423940/10%) grants funded by the
      Korean government.
    </p>
    <p>
      This work builds on
      <a href="https://github.com/facebookresearch/segment-anything" target="_blank" rel="noopener noreferrer">Segment Anything</a>,
      <a href="https://github.com/qqlu/Entity" target="_blank" rel="noopener noreferrer">CropFormer / Entity</a>,
      <a href="https://github.com/Pointcept/Pointcept" target="_blank" rel="noopener noreferrer">Pointcept</a>,
      <a href="https://github.com/Pointcept/SegmentAnything3D" target="_blank" rel="noopener noreferrer">SAM3D</a>,
      and the ScanNet evaluation toolkit, and extends our earlier project
      <a href="{{ '/projects/ov-map/' | relative_url }}">OV-MAP</a>.
      The code release is MIT-licensed (see the
      <a href="https://github.com/teamROBI/CDIS/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a>
      file); vendored/dependent components retain their own licenses. This is a separate
      license from this website's own template/code.
    </p>
  </section>

</div>

<script defer src="{{ '/assets/js/project-page.js' | relative_url }}"></script>
<script defer src="{{ '/assets/js/ovmap-viewer.js' | relative_url }}"></script>
