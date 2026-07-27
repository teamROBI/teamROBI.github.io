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
      <em>TODO: confirm the code release license once available.</em>
    </p>
  </section>

</div>

<script defer src="{{ '/assets/js/project-page.js' | relative_url }}"></script>
