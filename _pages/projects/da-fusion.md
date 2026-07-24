---
layout: page
title: "DA-Fusion: Deformable Attention-Based RGB-D Fusion Transformer for Unseen Object Instance Segmentation"
description: IEEE ICRA 2025
permalink: /projects/da-fusion/
_styles: |
  @import url("/assets/css/project-page.css");
---

<div class="project-page">

  <header class="pp-header">
    <p class="pp-venue">IEEE International Conference on Robotics and Automation (ICRA) 2025</p>
    <p class="pp-authors">
      Yesol Park<sup>1,*</sup> ·
      Hye-Jung Yoon<sup>1,*</sup> ·
      Juno Kim<sup>1,*</sup> ·
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
      <a href="https://arxiv.org/abs/2607.17754" target="_blank" rel="noopener noreferrer">arXiv</a>
      <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=11128151" target="_blank" rel="noopener noreferrer">Paper</a>
      <a href="https://github.com/teamROBI/DA-Fusion" target="_blank" rel="noopener noreferrer">Code</a>
      <a href="#bibtex">BibTeX</a>
    </div>
  </header>

  <div class="pp-teaser pp-figure pp-figure--md">
    {% include figure.liquid loading="eager" path="assets/img/projects/da-fusion/teaser.png" class="img-fluid rounded z-depth-1" alt="Unseen object segmentation comparison: RGB-only segmentation over-segments a textured object, depth-only segmentation under-segments two touching objects, while DA-Fusion's RGB+depth fusion matches the ground truth." %}
  </div>

  <p class="pp-tldr">
    DA-Fusion is a <strong>deformable attention-based RGB-D fusion Transformer</strong> for
    unseen object instance segmentation — it dynamically fuses RGB and depth features at
    multiple layers to fix the over-segmentation of RGB-only and under-segmentation of
    depth-only methods in cluttered logistics scenes.
  </p>

  <section class="pp-section" id="abstract">
    <h2>Abstract</h2>
    <p>
      In logistics automation, precise segmentation of unseen objects is crucial for
      efficient robotic manipulation in cluttered environments. Tasks such as bin-picking
      and shelf-picking require robust perception to handle occlusions, varying object
      shapes, and complex spatial arrangements. Traditional RGB-based methods tend to
      over-segment objects due to their reliance on texture, while depth-based methods
      often under-segment by focusing primarily on geometric features. To address these
      limitations, we propose DA-Fusion, a deformable attention-based RGB-D fusion
      Transformer designed for unseen object instance segmentation. DA-Fusion effectively
      combines the strengths of both RGB and depth data, enhancing segmentation accuracy in
      cluttered and multi-layered object environments. We also introduce the Object Clutter
      Bin Dataset (OCBD), a benchmark dataset specifically tailored for evaluating
      bin-picking scenarios in top-down views. Extensive evaluations demonstrate that
      DA-Fusion outperforms state-of-the-art methods across diverse environments, making it
      particularly suited for real-world logistics tasks.
    </p>
  </section>

  <section class="pp-section" id="method">
    <h2>Method</h2>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/da-fusion/method.png" class="img-fluid rounded z-depth-1" alt="DA-Fusion architecture: parallel RGB and depth branches pass through four Swin Transformer layers, each fusing features via Deformable Self-Attention (DS) and Deformable Cross-Attention (DC), concatenated into f1-f4, and decoded by a Mask Transformer decoder into the final prediction." caption="Overview of the DA-Fusion architecture. Two parallel branches extract features from RGB and depth inputs, fused at multiple layers via deformable attention, then decoded by a Mask Transformer decoder into the final segmentation masks." %}
    </figure>
    <p>
      DA-Fusion processes RGB and depth through parallel 4-layer Swin Transformer branches,
      fusing them at every layer with two deformable-attention modules:
    </p>
    <ol>
      <li>
        <strong>Deformable Self-Attention (DS)</strong> — refines the RGB and depth feature
        maps independently. Reference points are sampled over each feature map, and a
        learned offset network predicts where to dynamically sample the most informative
        key/value positions, rather than attending uniformly.
      </li>
      <li>
        <strong>Deformable Cross-Attention (DC)</strong> — fuses the two modalities. The RGB
        query attends to depth-sampled keys/values (and vice versa), so each modality's
        query can pull in the complementary information it's missing — texture for depth,
        geometry for RGB.
      </li>
      <li>
        <strong>Multi-layer fusion</strong> — the DS+DC outputs at each of the 4 layers are
        concatenated into fused features f&#8321;&ndash;f&#8324;, capturing complementary
        RGB-D information at multiple scales.
      </li>
      <li>
        <strong>Mask Transformer decoding</strong> — the fused multi-scale features are
        passed to a pixel decoder and Transformer decoder (following Mask2Former's
        class-agnostic mask prediction), producing the final per-instance segmentation
        masks.
      </li>
    </ol>
  </section>

  <section class="pp-section" id="ocbd">
    <h2>Object Clutter Bin Dataset (OCBD)</h2>
    <p>
      Existing bin-picking benchmarks are mostly simulated or feature simple, uniformly
      colored, single-layer objects. OCBD is a new real-world dataset the paper introduces
      to close that gap: 1,000 top-down RGB-D images (640&times;480, captured with an Azure
      Kinect DK) of 30 YCB objects and 25 HOPE household items, human-annotated with
      instance masks even in heavily cluttered, multi-layered piles &mdash; 13,147 object
      instances total, averaging 13.2 objects per image.
    </p>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/da-fusion/ocbd-examples.png" class="img-fluid rounded z-depth-1" alt="Six example OCBD images: top row shows real cluttered bin photographs, bottom row shows the corresponding human-annotated instance segmentation ground truth." caption="OCBD example images with their segmentation ground truth, illustrating the dataset's diversity and complexity." %}
    </figure>
  </section>

  <section class="pp-section" id="presentation">
    <h2>Presentation Video</h2>
    <video
      class="pp-demo-video"
      controls
      muted
      playsinline
      preload="none"
      poster="{{ '/assets/img/projects/da-fusion/posters/demo.jpg' | relative_url }}"
    >
      <source src="{{ '/assets/video/projects/da-fusion/demo.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p class="pp-note">
      ICRA 2025 conference presentation — method overview, quantitative/qualitative results,
      and real-robot shelf-picking and bin-picking demonstrations.
    </p>
  </section>

  <section class="pp-section" id="demo">
    <h2>Live Demo</h2>
    <p class="pp-note">
      <em>
        TODO: an interactive demo (in the style of the OV-MAP viewer) is planned here, using
        real samples pulled from the server DA-Fusion was run on — not yet available.
      </em>
    </p>
  </section>

  <section class="pp-section" id="results">
    <h2>Results</h2>
    <p>
      DA-Fusion achieves the highest overall scores on both OCID and OSD (Table below),
      and consistently outperforms prior RGB-D fusion methods on the new OCBD bin-picking
      benchmark, with the largest gains on the Overlap F-measure and %75 (fraction of
      objects segmented with Overlap F-measure &ge; 75%) metrics that matter most in
      cluttered scenes.
    </p>
    <div class="pp-table-scroll">
      <table>
        <thead>
          <tr>
            <th>Dataset</th>
            <th>Input</th>
            <th>Overlap F</th>
            <th>Boundary F</th>
            <th>%75</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">OCID<br><span class="pp-note">(2390 images)</span></td>
            <td>RGB-D (best prior, UCN+)</td>
            <td>91.6</td><td>86.1</td><td>89.3</td>
          </tr>
          <tr>
            <td><strong>Ours (DS+DC)</strong></td>
            <td class="pp-best">92.1</td><td class="pp-best">90.0</td><td class="pp-best">92.9</td>
          </tr>
          <tr>
            <td rowspan="2">OSD<br><span class="pp-note">(111 images)</span></td>
            <td>RGB-D (best prior, UCN+)</td>
            <td>87.4</td><td>69.4</td><td>83.2</td>
          </tr>
          <tr>
            <td><strong>Ours (DS+DC)</strong></td>
            <td class="pp-best">92.9</td><td class="pp-best">88.0</td><td class="pp-best">92.9</td>
          </tr>
          <tr>
            <td rowspan="2">OCBD<br><span class="pp-note">(1000 images)</span></td>
            <td>RGB-D (best prior, UCN+)</td>
            <td>70.7</td><td>46.7</td><td>61.3</td>
          </tr>
          <tr>
            <td><strong>Ours (DS+DC)</strong></td>
            <td class="pp-best">91.3</td><td class="pp-best">88.7</td><td class="pp-best">87.1</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="pp-note">
      F-measures are the RGB-D-input row for each method (paper Tables I &amp; II);
      %75 = fraction of objects segmented with Overlap F-measure &ge; 75%.
    </p>

    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/da-fusion/qualitative.png" class="img-fluid rounded z-depth-1" alt="Qualitative comparison across OSD, OCID, and OCBD datasets: UCN+, UOAIS, and MSMFormer+ all show visible over- or under-segmentation errors, while DA-Fusion's predictions closely match the ground truth in every row." caption="Qualitative comparison across OSD (top), OCID (middle), and OCBD (bottom). DA-Fusion segments accumulated objects in OSD, delineates objects against feature-rich backgrounds in OCID, and detects occluded objects in lower bin layers in OCBD more accurately than prior methods." %}
    </figure>

    <figure class="pp-figure pp-figure--md">
      {% include figure.liquid loading="lazy" path="assets/img/projects/da-fusion/real-robot.png" class="img-fluid rounded z-depth-1" alt="Real-robot experiments: a UR5e arm with a RealSense D435 camera performing shelf-picking, and a UR5e with an overhead Azure Kinect camera performing bin-picking, each shown with DA-Fusion's segmentation result." caption="Real-robot experiments. Shelf-picking (left, front-view UR5e + RealSense D435) and bin-picking (right, top-down UR5e + Azure Kinect DK), with DA-Fusion's segmentation results." %}
    </figure>

  </section>

  <section class="pp-section" id="bibtex">
    <h2>BibTeX</h2>
    <div class="pp-bibtex">
{% highlight bibtex %}
@inproceedings{park2025dafusion,
  title={DA-Fusion: Deformable Attention-Based RGB-D Fusion Transformer for Unseen Object Instance Segmentation},
  author={Park, Yesol and Yoon, Hye-Jung and Kim, Juno and Zhang, Byoung-Tak},
  booktitle={2025 IEEE International Conference on Robotics and Automation (ICRA)},
  pages={7490--7496},
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
      Korean government. The code release is MIT-licensed (see the
      <a href="https://github.com/teamROBI/DA-Fusion/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a>
      file). This is a separate license from this website's own template/code.
    </p>
  </section>

</div>

<script defer src="{{ '/assets/js/project-page.js' | relative_url }}"></script>
