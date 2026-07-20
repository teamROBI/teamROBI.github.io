---
layout: page
title: "Seg2Grasp: A Robust Modular Suction Grasping in Bin Picking"
description: IEEE/RSJ IROS 2024
permalink: /projects/seg2grasp/
_styles: |
  @import url("/assets/css/project-page.css");
---

<div class="project-page">

  <header class="pp-header">
    <p class="pp-venue">IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) 2024</p>
    <p class="pp-authors">
      Hye-Jung Yoon<sup>1,*</sup> ·
      Juno Kim<sup>1,*</sup> ·
      Yesol Park<sup>1,*</sup> ·
      Jun-Ki Lee<sup>2</sup> ·
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
      <a href="https://ieeexplore.ieee.org/document/10801644" target="_blank" rel="noopener noreferrer">Paper</a>
      <a href="https://github.com/teamROBI/Seg2Grasp" target="_blank" rel="noopener noreferrer">Code</a>
      <a href="#bibtex">BibTeX</a>
    </div>
  </header>

  <div class="pp-teaser pp-figure pp-figure--md">
    {% include figure.liquid loading="eager" path="assets/img/projects/seg2grasp/teaser.png" class="img-fluid rounded z-depth-1" alt="Seg2Grasp overview: a suction gripper sorts arbitrary objects from a mixed bin into snack, drink, and cleaning bins, using a segmentation, grasping, and open-vocabulary classification pipeline." %}
  </div>

  <p class="pp-tldr">
    Seg2Grasp is a <strong>modular</strong> suction bin-picking pipeline —
    <strong>segment &rarr; grasp &rarr; classify</strong> — that robustly
    transfers arbitrary, unseen objects between bins in cluttered, dynamic
    scenes, outperforming end-to-end methods.
  </p>

  <section class="pp-section" id="abstract">
    <h2>Abstract</h2>
    <p>
      Current bin-picking methods that rely heavily on end-to-end learning
      often falter when confronted with unfamiliar or complex objects in
      unstructured environments. To overcome these limitations, we introduce
      Seg2Grasp, a modular pipeline designed for robust suction grasping in
      dynamic and cluttered bin scenarios. Seg2Grasp is built on a
      three-step process: Segmentation, Grasping, and Classification. The
      Segmentation module employs a Transformer-based model to generate
      class-agnostic object masks from RGB-D images, ensuring accurate
      detection across various conditions. The Grasping module uses surface
      normals and mask proposals to determine the optimal suction points,
      enhancing grasp success. Finally, the Classification module leverages
      open-vocabulary matching for precise object identification, enabling
      versatile handling of diverse objects. Real-world robotic experiments
      demonstrate that Seg2Grasp outperforms existing methods in success
      rates and adaptability, establishing it as a powerful tool for
      automated bin picking in industrial settings.
    </p>
    <p class="pp-note">
      <strong>Note on the public code release:</strong> the published system
      used a fine-tuned Mask-CLIP classifier. The
      <a href="https://github.com/teamROBI/Seg2Grasp" target="_blank" rel="noopener noreferrer">released code</a>
      upgrades the classification module to a Qwen vision-language model (the
      segmented target and the full scene are shown to the VLM, which names
      the category) — simpler to reproduce and open-vocabulary. Segmentation
      and grasping follow the paper.
    </p>
  </section>

  <section class="pp-section" id="method">
    <h2>Method</h2>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/seg2grasp/pipeline.png" class="img-fluid rounded z-depth-1" alt="Seg2Grasp pipeline diagram: (a) object segmentation from fused RGB and depth via a class-agnostic mask proposal network, (b) object grasping via suction point scoring, (c) object classification via image-text feature matching." %}
    </figure>
    <p>
      Seg2Grasp is three specialized modules orchestrated by a single
      pipeline:
    </p>
    <ol>
      <li>
        <strong>Segmentation</strong> — a Mask2Former (Swin-L) class-agnostic
        mask-proposal network fed the RGB image fused with an inverted,
        normalized depth image (its shared backbone runs on each and the
        outputs are averaged). Produces per-object instance masks.
      </li>
      <li>
        <strong>Grasping</strong> — an analytic (non-learning) suction
        planner. It samples geometrically-uniform candidate points over the
        target's point cloud and scores each by a weighted criterion:
        surface angle (how top-facing the patch normal is), proximity to the
        object's center of gravity, and graspable-point count, returning the
        optimal suction point and camera-facing normal.
      </li>
      <li>
        <strong>Classification</strong> — an open-vocabulary classifier. The
        public release uses a Qwen VLM: the full scene (for context) and the
        cropped target are shown to the model, which returns the object
        category.
      </li>
    </ol>
    <figure class="pp-figure pp-figure--md">
      {% include figure.liquid loading="lazy" path="assets/img/projects/seg2grasp/grasp_selection.png" class="img-fluid rounded z-depth-1" sizes="40vw" alt="Suction-point selection visualization: object point cloud, RANSAC flat-plane inliers, a suction-cup-sized disc of candidates scored by suction quality, and the chosen point with its camera-facing normal." caption="Suction-point selection: object surface → largest flat-plane inliers → cup-sized disc of candidates → the chosen point (red) with its camera-facing normal." %}
    </figure>
  </section>

  <section class="pp-section" id="robot-demo">
    <h2>Robot Demonstration</h2>
    <video
      class="pp-demo-video"
      controls
      muted
      playsinline
      preload="none"
      poster="{{ '/assets/img/projects/seg2grasp/posters/robot-demo.jpg' | relative_url }}"
    >
      <source src="{{ '/assets/video/projects/seg2grasp/robot-demo.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p class="pp-note">
      IROS 2024 presentation video — method overview followed by real UR5
      bin-picking footage (from the original experiments; segmentation and
      classification have since been improved beyond what's shown here).
    </p>
  </section>

  <section class="pp-section" id="demo">
    <h2>Sample Frames</h2>
    <p>
      24 real input frames captured across three physical bins — pick a tab
      below.
    </p>
    <div class="pp-tabs" data-pp-tabs>
      <div class="pp-tab-list" role="tablist" aria-label="Demo scenes by bin">
        <button class="pp-tab" role="tab" id="tab-hole" aria-controls="panel-hole" aria-selected="true">Hole Gray Bin</button>
        <button class="pp-tab" role="tab" id="tab-yellow" aria-controls="panel-yellow" aria-selected="false" tabindex="-1">Large Yellow Bin</button>
        <button class="pp-tab" role="tab" id="tab-white" aria-controls="panel-white" aria-selected="false" tabindex="-1">Small White Bin</button>
      </div>

      <div class="pp-tab-panel pp-media-grid" id="panel-hole" role="tabpanel" aria-labelledby="tab-hole">
        {% assign hole_frames = "11,13,19,25,27,4,7,8" | split: "," %}
        {% for n in hole_frames %}
          {% assign img_path = "assets/img/projects/seg2grasp/demo/hole_gray_bin/img" | append: n | append: ".jpg" %}
          {% assign img_alt = "Hole gray bin, frame " | append: n %}
          <figure>
            {% include figure.liquid loading="lazy" path=img_path class="img-fluid rounded" alt=img_alt %}
            <figcaption>frame {{ n }}</figcaption>
          </figure>
        {% endfor %}
      </div>

      <div class="pp-tab-panel pp-media-grid" id="panel-yellow" role="tabpanel" aria-labelledby="tab-yellow" hidden>
        {% assign yellow_frames = "21,24,3,37,40,50,57,9" | split: "," %}
        {% for n in yellow_frames %}
          {% assign img_path = "assets/img/projects/seg2grasp/demo/large_yellow_bin/img" | append: n | append: ".jpg" %}
          {% assign img_alt = "Large yellow bin, frame " | append: n %}
          <figure>
            {% include figure.liquid loading="lazy" path=img_path class="img-fluid rounded" alt=img_alt %}
            <figcaption>frame {{ n }}</figcaption>
          </figure>
        {% endfor %}
      </div>

      <div class="pp-tab-panel pp-media-grid" id="panel-white" role="tabpanel" aria-labelledby="tab-white" hidden>
        {% assign white_frames = "13,15,21,25,27,3,7,9" | split: "," %}
        {% for n in white_frames %}
          {% assign img_path = "assets/img/projects/seg2grasp/demo/small_white_bin/img" | append: n | append: ".jpg" %}
          {% assign img_alt = "Small white bin, frame " | append: n %}
          <figure>
            {% include figure.liquid loading="lazy" path=img_path class="img-fluid rounded" alt=img_alt %}
            <figcaption>frame {{ n }}</figcaption>
          </figure>
        {% endfor %}
      </div>
    </div>
    <p class="pp-note">
      The scene tabs above show real input frames from the repository's
      bundled <code>demo/samples/</code> set, reflecting the current code
      release's segmentation/classification models.
    </p>

  </section>

  <section class="pp-section" id="results">
    <h2>Results</h2>
    <p>
      Real-robot picking success across difficulty levels (paper Table I).
      <code>pr</code> = pick success, <code>or</code> = object success,
      <code>sr</code> = segmentation success.
    </p>
    <div class="pp-table-scroll">
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Method</th>
            <th>pr</th>
            <th>or</th>
            <th>sr</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="3">Easy<br><span class="pp-note">(single, trained)</span></td>
            <td>DexNet 4.0</td><td>0.85</td><td>0.94</td><td>–</td>
          </tr>
          <tr>
            <td>SuctionNet</td><td>0.72</td><td>0.92</td><td>0.93</td>
          </tr>
          <tr>
            <td><strong>Seg2Grasp (ours)</strong></td>
            <td class="pp-best">0.89</td><td class="pp-best">0.96</td><td class="pp-best">0.91</td>
          </tr>
          <tr>
            <td rowspan="3">Medium<br><span class="pp-note">(double, mixed)</span></td>
            <td>DexNet 4.0</td><td>0.41</td><td>0.61</td><td>–</td>
          </tr>
          <tr>
            <td>SuctionNet</td><td>0.51</td><td>0.53</td><td>0.43</td>
          </tr>
          <tr>
            <td><strong>Seg2Grasp (ours)</strong></td>
            <td class="pp-best">0.87</td><td class="pp-best">0.91</td><td class="pp-best">0.89</td>
          </tr>
          <tr>
            <td rowspan="3">Hard<br><span class="pp-note">(complex, novel)</span></td>
            <td>DexNet 4.0</td><td>0.28</td><td>0.31</td><td>–</td>
          </tr>
          <tr>
            <td>SuctionNet</td><td>0.29</td><td>0.23</td><td>0.26</td>
          </tr>
          <tr>
            <td><strong>Seg2Grasp (ours)</strong></td>
            <td class="pp-best">0.79</td><td class="pp-best">0.86</td><td class="pp-best">0.83</td>
          </tr>
        </tbody>
      </table>
    </div>

    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/seg2grasp/gallery.jpg" class="img-fluid rounded z-depth-1" alt="Qualitative results: 24 bin-picking frames, each showing the segmented target object outlined, its predicted category and confidence, and the selected suction point." caption="Qualitative results across all 24 bundled demo frames — segmentation outline, predicted category (confidence), and selected suction point (yellow) for each." %}
    </figure>

  </section>

  <section class="pp-section" id="bibtex">
    <h2>BibTeX</h2>
    <div class="pp-code-block" data-pp-copy>
      <button type="button" class="pp-copy-btn" data-pp-copy-btn aria-label="Copy BibTeX to clipboard">
        <i class="fa-regular fa-copy" data-pp-copy-icon aria-hidden="true"></i>
      </button>
      <div class="pp-bibtex" data-pp-copy-source>
{% highlight bibtex %}
@inproceedings{yoon2024seg2grasp,
  title={Seg2Grasp: A Robust Modular Suction Grasping in Bin Picking},
  author={Yoon, Hye-Jung and Kim, Juno and Park, Yesol and Lee, Jun-Ki and Zhang, Byoung-Tak},
  booktitle={2024 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)},
  pages={2921--2927},
  year={2024},
  organization={IEEE}
}
{% endhighlight %}
      </div>
    </div>
  </section>

  <section class="pp-section" id="acknowledgements">
    <h2>Acknowledgements &amp; License</h2>
    <p>
      This work builds on
      <a href="https://github.com/facebookresearch/Mask2Former" target="_blank" rel="noopener noreferrer">Mask2Former</a>,
      <a href="https://github.com/facebookresearch/detectron2" target="_blank" rel="noopener noreferrer">detectron2</a>, and
      <a href="https://github.com/QwenLM" target="_blank" rel="noopener noreferrer">Qwen</a>.
      The code release is MIT-licensed (see the
      <a href="https://github.com/teamROBI/Seg2Grasp/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a>
      file); vendored/dependent components (Mask2Former, detectron2, Qwen-VL)
      retain their own licenses. This is a separate license from this
      website's own template/code.
    </p>
  </section>

</div>

<script defer src="{{ '/assets/js/project-page.js' | relative_url }}"></script>
