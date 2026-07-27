---
layout: page
title: "Ov-Map: Open-Vocabulary Zero-Shot 3D Instance Segmentation Map for Robots"
description: IEEE/RSJ IROS 2024 (Oral)
permalink: /projects/ov-map/
_styles: |
  @import url("/assets/css/project-page.css");
  /* These figures are the paper's own exported figure files (not screen
     captures), so they have no inherent breathing room like a captured
     crop would — add it back here so they don't look edge-to-edge. */
  .pp-figure img {
    padding: 1.5rem;
    box-sizing: border-box;
  }
---

<div class="project-page">

  <header class="pp-header">
    <p class="pp-venue">IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) 2024 (Oral)</p>
    <p class="pp-authors">
      Juno Kim<sup>1,*</sup> ·
      Yesol Park<sup>1,*</sup> ·
      Hye-Jung Yoon<sup>1,*</sup> ·
      Byoung-Tak Zhang<sup>1,2,3</sup>
    </p>
    <p class="pp-affiliations">
      <sup>1</sup>Interdisciplinary Program in AI, Seoul National University &nbsp;·&nbsp;
      <sup>2</sup>AI Institute, Seoul National University &nbsp;·&nbsp;
      <sup>3</sup>Dept. of Computer Science, Seoul National University
      <br>
      <sup>*</sup>Equal contribution
    </p>
    <div class="pp-buttons">
      <a href="https://arxiv.org/abs/2506.11585" target="_blank" rel="noopener noreferrer">arXiv</a>
      <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10801841" target="_blank" rel="noopener noreferrer">Paper</a>
      <a href="https://github.com/teamROBI/OV-MAP" target="_blank" rel="noopener noreferrer">Code</a>
      <a href="#bibtex">BibTeX</a>
    </div>
  </header>

  <div class="pp-teaser pp-figure pp-figure--md">
    {% include figure.liquid loading="eager" path="assets/img/projects/ov-map/teaser.png" class="img-fluid rounded z-depth-1" alt="A mobile robot is asked to tidy up a bed. OV-MAP's 3D instance segmentation map of the room lets it identify and localize the correct object (circled) among all the per-instance segments in the scene." %}
  </div>

  <p class="pp-tldr">
    OV-MAP builds <strong>zero-shot, open-vocabulary 3D instance maps</strong> for robots
    by lifting 2D class-agnostic masks into 3D with supplemented (raw + synthetic) depth
    and a 3D mask-voting mechanism — accurate per-instance segmentation without any
    3D-supervised network.
  </p>

  <section class="pp-section" id="demo">
    <h2>Interactive Demo</h2>
    <p>
      This is a real OV-MAP output — a ScanNet200 scene (<code>scene0011_00</code>)
      that OV-MAP segmented into per-instance 3D masks with <em>no</em> 3D-supervised
      network. Drag to rotate, scroll to zoom. Switch between the 3D scene (real colors)
      and OV-MAP's class-agnostic instance masks, or click an open-vocabulary query to
      light up every instance the map matches to that word.
    </p>
    <div
      class="pp-viewer"
      data-ovmap-viewer
      data-bin="{{ '/assets/data/projects/ov-map/scene0011_00.bin' | relative_url }}"
      data-manifest="{{ '/assets/data/projects/ov-map/scene0011_00.json' | relative_url }}"
    >
      <div class="pp-viewer-stage">
        <canvas class="pp-viewer-canvas" aria-label="Interactive 3D point cloud of an OV-MAP scene"></canvas>
        <span class="pp-viewer-hint">drag to rotate · scroll to zoom</span>
      </div>
      <div class="pp-viewer-controls">
        <span class="pp-control-label">View</span>
        <button type="button" class="pp-mode-btn is-active" data-ovmap-mode="0" aria-pressed="true">3D Scene</button>
        <button type="button" class="pp-mode-btn" data-ovmap-mode="1" aria-pressed="false">Class-Agnostic Instances</button>
      </div>
      <div class="pp-viewer-controls">
        <span class="pp-control-label">Query</span>
        <div class="pp-viewer-queries"></div>
      </div>
    </div>
    <p class="pp-note">
      Each query is resolved by matching a CLIP text embedding against every 3D
      instance's open-vocabulary feature — the same mechanism a robot would use to
      localize an object from a spoken command. Highlighted regions are OV-MAP's
      predictions, computed offline and replayed here for an instant response.
      An interactive real-world scan is coming soon.
    </p>
  </section>

  <section class="pp-section" id="abstract">
    <h2>Abstract</h2>
    <p>
      We introduce OV-MAP, a novel approach to open-world 3D mapping for mobile robots by
      integrating open-features into 3D maps to enhance object recognition capabilities. A
      significant challenge arises when overlapping features from adjacent voxels reduce
      instance-level precision, as features spill over voxel boundaries, blending
      neighboring regions together. Our method overcomes this by employing a class-agnostic
      segmentation model to project 2D masks into 3D space, combined with a supplemented
      depth image created by merging raw and synthetic depth from point clouds. This
      approach, along with a 3D mask voting mechanism, enables accurate zero-shot 3D
      instance segmentation without relying on 3D supervised segmentation models. We assess
      the effectiveness of our method through comprehensive experiments on public datasets
      such as ScanNet200 and Replica, demonstrating superior zero-shot performance,
      robustness, and adaptability across diverse environments. Additionally, we conducted
      real-world experiments to demonstrate our method's adaptability and robustness when
      applied to diverse real-world environments.
    </p>
  </section>

  <section class="pp-section" id="method">
    <h2>Method</h2>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/ov-map/method.png" class="img-fluid rounded z-depth-1" alt="OV-MAP pipeline diagram: RGB-D and point cloud input are fused into a supplemented depth; a 2D mask network produces per-frame class-agnostic masks; masks are projected into 3D, merged, and resolved by a voting mechanism into per-instance 3D masks; each instance is labeled with CLIP for open-vocabulary querying." caption="Overview of the proposed method. RGB-D and point cloud input are fused into a supplemented depth; a 2D mask network produces per-frame class-agnostic masks; masks are projected into 3D and merged; a voting mechanism resolves the merged masks into per-instance 3D segments; each instance is labeled via CLIP for open-vocabulary querying." %}
    </figure>
    <p>OV-MAP's pipeline has four stages:</p>
    <ol>
      <li>
        <strong>Depth supplementation</strong> — raw depth is merged with synthetic depth
        rendered from the reconstructed point cloud, correcting gaps and noise (e.g. from
        reflective surfaces) in the raw sensor depth before it's used for 2D-to-3D
        projection.
      </li>
      <li>
        <strong>2D mask projection</strong> — CropFormer produces per-frame class-agnostic
        2D masks from the RGB-D input, which are projected into 3D using the supplemented
        depth.
      </li>
      <li>
        <strong>Merge &amp; dominant voting</strong> — per-frame 3D masks are merged, and a
        voting mechanism over mesh-segmented areas assigns each area to its dominant mask
        group — yielding per-instance 3D proposals without any 3D-supervised network.
      </li>
      <li>
        <strong>Open-vocabulary labeling</strong> — each 3D instance is labeled with CLIP
        features computed from its highest-scoring 2D view, enabling open-vocabulary
        querying of the resulting map.
      </li>
    </ol>
  </section>

  <section class="pp-section" id="depth">
    <h2>Depth Supplementation</h2>
    <p>
      Consumer RGB-D sensors leave large holes in their depth maps — on dark, reflective, or
      distant surfaces the sensor simply returns nothing. Those holes break the 2D-to-3D
      projection that OV-MAP relies on. OV-MAP renders a <em>synthetic</em> depth map from the
      reconstructed point cloud and uses it to fill only the missing pixels of the raw depth,
      leaving valid measurements untouched. <strong>Drag the slider</strong> to compare the raw
      sensor depth with the supplemented result on a real frame from <code>scene0011_00</code>.
    </p>
    <div class="pp-compare" data-pp-compare>
      <img
        src="{{ '/assets/img/projects/ov-map/depth/supplemented.png' | relative_url }}"
        alt="Supplemented depth map: the raw sensor depth with its holes filled from point-cloud-rendered synthetic depth, leaving a dense depth image."
        loading="lazy"
      />
      <img
        class="pp-compare-before"
        src="{{ '/assets/img/projects/ov-map/depth/raw.png' | relative_url }}"
        alt="Raw sensor depth map with large black holes where the depth camera returned no measurement."
        loading="lazy"
      />
      <input type="range" class="pp-compare-range" min="0" max="100" value="50" aria-label="Slide to compare raw and supplemented depth" />
      <div class="pp-compare-handle"></div>
      <span class="pp-compare-label pp-compare-label--before">Raw sensor depth</span>
      <span class="pp-compare-label pp-compare-label--after">Supplemented depth</span>
    </div>
    <p class="pp-note">
      On this frame the raw depth is missing ~37% of its pixels; supplementation brings that
      down to ~4%. Only the raw holes are replaced with the point-cloud-rendered synthetic
      depth, so real measurements are never overwritten.
    </p>
  </section>

  <section class="pp-section" id="merging">
    <h2>Building the Map: Merging Across Views</h2>
    <p>
      OV-MAP never sees the whole room at once. It walks through the RGB-D stream one view
      at a time, lifts each view's class-agnostic 2D masks into 3D, and <em>merges</em> them:
      overlapping 3D masks from different views are fused into a single instance, and a
      dominant-vote step settles the rest — no 3D-supervised network anywhere.
      <strong>Press play</strong> to watch the per-instance map assemble, view by view.
    </p>
    <div
      class="pp-viewer"
      data-ovmap-viewer
      data-ovmap-timeline
      data-bin="{{ '/assets/data/projects/ov-map/scene0011_00.bin' | relative_url }}"
      data-manifest="{{ '/assets/data/projects/ov-map/scene0011_00.json' | relative_url }}"
    >
      <div class="pp-viewer-stage">
        <canvas class="pp-viewer-canvas" aria-label="3D point cloud assembling as camera views are merged"></canvas>
        <span class="pp-viewer-hint">drag to rotate · scroll to zoom</span>
      </div>
      <div class="pp-viewer-controls">
        <button type="button" class="pp-mode-btn" data-ovmap-play>▶ Play</button>
        <input type="range" class="pp-timeline-range" min="0" max="255" value="0" aria-label="Scrub through the views as the map is built" />
        <span class="pp-timeline-count"></span>
      </div>
    </div>
    <p class="pp-note">
      Each point appears at the view where OV-MAP first observes it; colors are the final
      per-instance labels it converges to, and structural surfaces (wall / floor / ceiling)
      are drawn in gray. Sampled every 10th frame of the trajectory.
    </p>
  </section>

  <section class="pp-section" id="presentation">
    <h2>Presentation Video</h2>
    <video
      class="pp-demo-video"
      controls
      muted
      playsinline
      preload="none"
      poster="{{ '/assets/img/projects/ov-map/posters/presentation.jpg' | relative_url }}"
    >
      <source src="{{ '/assets/video/projects/ov-map/presentation.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p class="pp-note">
      IROS 2024 conference presentation — method overview and results walkthrough.
    </p>
  </section>

  <section class="pp-section" id="results">
    <h2>Results</h2>
    <p>3D instance segmentation on ScanNet200 (paper Table I).</p>
    <div class="pp-table-scroll">
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Open-Vocab</th>
            <th>3D Proposal</th>
            <th>Map Type</th>
            <th>AP</th>
            <th>AP50</th>
            <th>AP25</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mask3D</td><td>–</td><td>Supervised</td><td>Per-Instance</td>
            <td>26.9</td><td>36.2</td><td>41.4</td>
          </tr>
          <tr>
            <td>OpenMask3D</td><td>✓</td><td>Mask3D</td><td>Per-Instance</td>
            <td>15.4</td><td>19.9</td><td>23.1</td>
          </tr>
          <tr>
            <td>OpenScene</td><td>✓</td><td>–</td><td>Per-Voxel</td>
            <td>6.6</td><td>10.2</td><td>14.8</td>
          </tr>
          <tr>
            <td>SAM3D</td><td>✓</td><td>None</td><td>Per-Instance</td>
            <td>8.4</td><td>13.1</td><td>18.7</td>
          </tr>
          <tr>
            <td><strong>OV-MAP (ours)</strong></td><td>✓</td><td>None</td><td>Per-Instance</td>
            <td class="pp-best">11.9</td><td class="pp-best">17.4</td><td class="pp-best">23.2</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>Zero-shot generalization to the Replica dataset (paper Table II).</p>
    <div class="pp-table-scroll">
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>AP</th>
            <th>AP50</th>
            <th>AP25</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mask3D</td><td>5.8</td><td>8.5</td><td>10.7</td>
          </tr>
          <tr>
            <td>OpenMask3D</td><td>13.1</td><td>18.4</td><td>24.2</td>
          </tr>
          <tr>
            <td>OpenScene</td><td>7.3</td><td>9.4</td><td>11.2</td>
          </tr>
          <tr>
            <td><strong>OV-MAP (ours)</strong></td>
            <td class="pp-best">14.2</td><td class="pp-best">19.6</td><td class="pp-best">28.1</td>
          </tr>
        </tbody>
      </table>
    </div>

    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/ov-map/qualitative.png" class="img-fluid rounded z-depth-1" alt="Qualitative results across five ScanNet200/Replica scenes: input point cloud, OV-MAP's predicted 3D instance segmentation, and the ground-truth annotation." caption="Qualitative results across five scenes — input scan, OV-MAP's prediction, and ground truth (ordered top to bottom)." %}
    </figure>

    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/ov-map/comparison.jpg" class="img-fluid rounded z-depth-1" alt="Per-voxel (OpenScene) vs per-instance (OV-MAP) qualitative comparison on three scenes: OV-MAP separates nearby objects such as items on a desk, a trash bin, and sofa cushions that the per-voxel method conflates together." caption="Per-voxel (OpenScene) vs. per-instance (ours) segmentation. Circled regions show where the per-voxel method conflates nearby objects — items on a desk, an attached trash bin, sofa cushions — that OV-MAP separates correctly." %}
    </figure>

  </section>

  <section class="pp-section" id="real-world">
    <h2>Real-World Validation</h2>
    <p>
      Beyond the ScanNet200/Replica benchmarks, OV-MAP was also validated on a real-world
      scan captured outside either dataset, then queried with open-vocabulary text prompts.
    </p>
    <figure class="pp-figure pp-figure--sm">
      {% include figure.liquid loading="lazy" path="assets/img/projects/ov-map/realworld.png" class="img-fluid rounded z-depth-1" alt="Real-world map creation validation: (a) 3D instance segmentation result on a real-world scan. (b) Open-vocabulary query results correctly localizing a door, a shelf, a water purifier, and a refrigerator." caption="(a) 3D instance segmentation on real-world data. (b) Open-vocabulary query results — the model correctly localizes objects for the text queries &ldquo;door,&rdquo; &ldquo;shelf,&rdquo; &ldquo;water purifier,&rdquo; and &ldquo;refrigerator.&rdquo;" %}
    </figure>
  </section>

  <section class="pp-section" id="bibtex">
    <h2>BibTeX</h2>
    <div class="pp-bibtex">
{% highlight bibtex %}
@inproceedings{kim2024ovmap,
  title={OV-MAP: Open-Vocabulary Zero-Shot 3D Instance Segmentation Map for Robots},
  author={Kim, Juno and Park, Yesol and Yoon, Hye-Jung and Zhang, Byoung-Tak},
  booktitle={2024 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)},
  pages={13780--13786},
  year={2024},
  organization={IEEE}
}
{% endhighlight %}
    </div>
  </section>

  <section class="pp-section" id="acknowledgements">
    <h2>Acknowledgements &amp; License</h2>
    <p>
      This work builds on
      <a href="https://github.com/facebookresearch/segment-anything" target="_blank" rel="noopener noreferrer">Segment Anything</a>,
      <a href="https://github.com/Pointcept/Pointcept" target="_blank" rel="noopener noreferrer">Pointcept</a>,
      <a href="https://github.com/Pointcept/SegmentAnything3D" target="_blank" rel="noopener noreferrer">SAM3D</a>,
      <a href="https://github.com/qqlu/Entity" target="_blank" rel="noopener noreferrer">CropFormer</a>, and
      <a href="https://github.com/OpenMask3D/openmask3d" target="_blank" rel="noopener noreferrer">OpenMask3D</a>.
      The code release is MIT-licensed (see the
      <a href="https://github.com/teamROBI/OV-MAP/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a>
      file); vendored/dependent components retain their own licenses. This is a separate
      license from this website's own template/code.
    </p>
  </section>

</div>

<script defer src="{{ '/assets/js/project-page.js' | relative_url }}"></script>
<script defer src="{{ '/assets/js/ovmap-viewer.js' | relative_url }}"></script>
