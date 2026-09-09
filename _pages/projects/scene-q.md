---
layout: page
title: "Scene-Q: Confidence-Aware Coarse-to-Fine Querying of 3D Scenes with Selective VLM Reasoning"
description: IEEE/RSJ IROS 2026
permalink: /projects/scene-q/
_styles: |
  @import url("/assets/css/project-page.css");
---

<div class="project-page">

  <header class="pp-header">
    <p class="pp-venue">IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) 2026</p>
    <p class="pp-authors">
      <a href="{{ '/people/' | relative_url }}#juno-kim">Juno Kim</a><sup>1,*</sup> ·
      <a href="{{ '/people/' | relative_url }}#yesol-park">Yesol Park</a><sup>1,*</sup> ·
      <a href="{{ '/people/' | relative_url }}#hyejung-yoon">Hye-Jung Yoon</a><sup>1,*</sup> ·
      <a href="https://bi.snu.ac.kr/members/byoung-tak-zhang.html" target="_blank" rel="noopener noreferrer">Byoung-Tak Zhang</a><sup>1,2,3</sup>
    </p>
    <p class="pp-affiliations">
      <sup>1</sup>Interdisciplinary Program in AI, Seoul National University &nbsp;·&nbsp;
      <sup>2</sup>AI Institute, Seoul National University &nbsp;·&nbsp;
      <sup>3</sup>Dept. of Computer Science, Seoul National University
      <br>
      <sup>*</sup>Equal contribution
    </p>
    <div class="pp-buttons">
      <span class="pp-btn-disabled">arXiv <em>(coming soon)</em></span>
      <span class="pp-btn-disabled">Paper <em>(coming soon)</em></span>
      <a href="https://github.com/teamROBI/Scene-Q" target="_blank" rel="noopener noreferrer">Code</a>
      <a href="#bibtex">BibTeX</a>
    </div>
  </header>

  <div class="pp-teaser pp-figure pp-figure--md">
    {% include figure.liquid loading="eager" path="assets/img/projects/scene-q/teaser.png" class="img-fluid rounded z-depth-1" alt="A 3D point-cloud scene with two instances routed through Scene-Q's confidence-aware reasoning: a chair with tightly clustered, near-synonym confidence scores (stool/seat/chair) that is escalated to a reasoning VLM and resolved to the correct label 'chair', versus a TV with a single sharply peaked confidence score that is resolved directly by the fast encoder path without VLM reasoning." %}
  </div>

  <p class="pp-tldr">
    Scene-Q is a <strong>confidence-aware, coarse-to-fine 3D scene querying framework</strong> that
    answers high-confidence open-vocabulary queries with fast image&ndash;text retrieval, and
    selectively escalates only the ambiguous ones to a reasoning VLM with full multi-view image
    context &mdash; improving both 3D instance segmentation and natural-language instance retrieval
    without paying the cost of VLM reasoning on every query.
  </p>

  <section class="pp-section" id="demo">
    <h2>Interactive Demo</h2>
    <p>
      This demo replays an actual Scene-Q run on ScanNet200 scene <code>scene0011_00</code>:
      class-agnostic 3D instances from OneFormer3D, scored with the SigLIP2 encoder used for
      routing. Selecting an instance below displays its temperature-scaled confidence
      distribution over all 198 candidate labels and indicates whether it was resolved on the
      fast path or escalated to Qwen2.5-VL, following the routing procedure in Fig.&nbsp;1.
    </p>
    <div
      class="pp-viewer"
      data-ovmap-viewer
      data-bin="{{ '/assets/data/projects/scene-q/scene0011_00.bin' | relative_url }}"
      data-manifest="{{ '/assets/data/projects/scene-q/scene0011_00.json' | relative_url }}"
      data-img-base="{{ '/assets/img/projects/scene-q/vlm-demo/' | relative_url }}"
    >
      <div class="pp-viewer-stage">
        <canvas class="pp-viewer-canvas" aria-label="Interactive 3D point cloud of Scene-Q scene0011_00"></canvas>
        <span class="pp-viewer-hint">drag to rotate · scroll to zoom</span>
        <div class="pp-viewer-labels" aria-hidden="true"></div>
      </div>
      <div class="pp-viewer-controls">
        <span class="pp-control-label">View</span>
        <button type="button" class="pp-mode-btn is-active" data-ovmap-mode="0" aria-pressed="true">3D Scene</button>
        <button type="button" class="pp-mode-btn" data-ovmap-mode="1" aria-pressed="false">Class-Agnostic Instances</button>
        <button type="button" class="pp-mode-btn" data-ovmap-mode="4" aria-pressed="false">Semantic Instance Segmentation</button>
      </div>
      <div class="pp-semantic-legend"></div>
      <div class="pp-viewer-controls">
        <span class="pp-control-label">Instance</span>
        <div class="pp-viewer-queries"></div>
      </div>
      <div class="pp-viewer-controls">
        <span class="pp-control-label">Query</span>
        <div class="pp-viewer-nlqueries"></div>
      </div>
      <div class="pp-instance-panel"></div>
    </div>
    <p class="pp-note">
      <strong>Semantic Instance Segmentation</strong> colors each of this scene's 95 instances
      by Scene-Q's predicted category (identical colors indicate identical labels); this is the
      segmentation against which Table&nbsp;I's mAP, AP50, and AP25 are computed, as distinct
      from the class-agnostic geometry shown above. The result is Scene-Q's own saved
      end-to-end output for this scene (<code>sem_mask_array_CC_BB</code>, SigLIP2 with
      selective Qwen2.5-VL routing), which we verified by independently re-deriving six of
      its instances (below) and obtaining identical labels. Of the 95 instances, 56 (59%) were
      escalated to the VLM, consistent with the paper's reported range of 39&ndash;62%.
    </p>
    <p class="pp-note">
      The confidence bars use the per-instance SigLIP2 embeddings saved during evaluation,
      re-scored with the paper's fitted temperature (T&nbsp;=&nbsp;0.01113&hellip;) and routing
      thresholds (p<sub>max</sub>&nbsp;&ge;&nbsp;0.50, margin&nbsp;&ge;&nbsp;0.15, normalized
      entropy&nbsp;&le;&nbsp;0.35 unless margin&nbsp;&ge;&nbsp;0.20), following Eq.&nbsp;8.
      Escalated instances were reprocessed through Scene-Q's SAM&nbsp;+&nbsp;Qwen2.5-VL-7B
      reasoning step (identical multi-view crops, bounding boxes, and prompt template),
      computed once offline and replayed here; selecting an instance above shows the outcome
      for that case.
    </p>
    <p class="pp-note">
      The <strong>Query</strong> row replays the paper's four natural-language retrieval types
      (Table&nbsp;III, Fig.&nbsp;5: Category, Attribute, Spatial, Affordance) on this scene,
      since the paper's real-world retrieval set (11 novel maps, 1968 human-authored queries)
      was not available on the machine used to build this site. Selecting a query above shows
      how its target was identified.
    </p>
  </section>

  <section class="pp-section" id="abstract">
    <h2>Abstract</h2>
    <p>
      Indoor mobile robots require open-vocabulary scene understanding that grounds
      natural-language queries in a consistent 3D map. Many existing systems ultimately rely on
      cosine-similarity retrieval with contrastive image&ndash;text encoders, which is efficient but
      brittle when labels are near-synonymous or multiple similar instances appear. We present
      Scene-Q, a confidence-aware coarse-to-fine querying framework that normalizes encoder scores
      with temperature scaling and selectively invokes a reasoning VLM only for low-confidence
      cases. High-confidence queries are answered by fast retrieval, while ambiguous ones are
      reranked over a small top-K candidate set using the original multi-view images and instance
      bounding boxes, enabling context-aware disambiguation at low cost. Scene-Q improves
      open-vocabulary 3D instance segmentation on ScanNet200 and natural-language 3D instance
      retrieval on real-world reconstructions, with the largest gains on spatial and relational
      queries while keeping a substantial fraction of queries on the fast path.
    </p>
  </section>

  <section class="pp-section" id="method">
    <h2>Method</h2>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/scene-q/method.png" class="img-fluid rounded z-depth-1" alt="Scene-Q pipeline diagram: a point cloud and multi-view RGB-D feed a superpoint segmenter, 3D mask network, and 2D mask network; 2D-guided refinement fuses these into refined 3D masks; each instance's multi-view crops are encoded and compared against text-label embeddings via cosine similarity; a temperature-scaled confidence score routes low-confidence cases to a reasoning VLM that uses the full image and a bounding box to pick the final label." caption="Overview of Scene-Q. (1) 2D-guided refinement fuses class-agnostic 3D masks with per-view 2D masks into a refined instance set. (2) Multi-view crops of each instance are encoded and compared against text-label embeddings via cosine similarity. (3) A temperature-scaled confidence score routes low-confidence instances to a reasoning VLM, which uses the full image and a bounding box to pick the final label." %}
    </figure>
    <p>Scene-Q builds a queryable 3D instance map in three stages:</p>
    <ol>
      <li>
        <strong>3D instance segmentation via 2D-guided refinement</strong> &mdash; starting from
        class-agnostic 3D masks (Mask3D / OneFormer3D) and per-view 2D masks (SAM / CropFormer), a
        superpoint-based refinement step consolidates point assignments, detaches geometrically
        separated components with low multi-view 2D agreement, and iteratively merges adjacent
        instances that are consistent across views.
      </li>
      <li>
        <strong>Multi-view instance descriptors</strong> &mdash; for each refined instance, the
        top-<em>k</em> most-visible views are cropped at multiple expansion levels, encoded with an
        image&ndash;text encoder (CLIP or SigLIP&nbsp;2), and averaged into a single
        &#x2113;2-normalized instance embedding.
      </li>
      <li>
        <strong>Confidence-aware selective VLM reasoning</strong> &mdash; cosine similarities
        against the label set are passed through a temperature-scaled softmax to obtain a routing
        confidence. High-confidence queries take the encoder's top-1 prediction directly (fast
        path, ~50&nbsp;ms), while low-confidence queries send the top-<em>K</em> candidate labels
        together with the original multi-view images and instance bounding boxes to a reasoning VLM
        (Qwen2.5-VL), which picks the final label from full-image context (~2&nbsp;s).
      </li>
    </ol>
  </section>

  <section class="pp-section" id="presentation">
    <h2>Presentation Video</h2>
    <video
      class="pp-demo-video"
      controls
      muted
      playsinline
      preload="none"
      poster="{{ '/assets/img/projects/scene-q/posters/demo.jpg' | relative_url }}"
    >
      <source src="{{ '/assets/video/projects/scene-q/demo.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p class="pp-note">
      IROS 2026 conference presentation — method overview and real-world novel-map query results.
    </p>
  </section>

  <section class="pp-section" id="results">
    <h2>Results</h2>
    <p>Open-vocabulary 3D instance segmentation on the ScanNet200 validation split (paper Table I).</p>
    <div class="pp-table-scroll">
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>mAP</th>
            <th>AP50</th>
            <th>AP25</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mask3D <em>(closed-vocab)</em></td><td>26.9</td><td>36.2</td><td>41.4</td>
          </tr>
          <tr>
            <td>OV-MAP</td><td>11.9</td><td>17.4</td><td>23.2</td>
          </tr>
          <tr>
            <td>Open3DIS</td><td>23.7</td><td>29.4</td><td>32.8</td>
          </tr>
          <tr>
            <td>OpenYOLO3D</td><td>24.5</td><td>31.7</td><td>36.2</td>
          </tr>
          <tr>
            <td><strong>Scene-Q (ours)</strong></td>
            <td class="pp-best">25.2</td><td class="pp-best">33.7</td><td class="pp-best">41.6</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="pp-note">
      Scene-Q's largest gain is under the relaxed AP25 metric (+5.4 over OpenYOLO3D), and it keeps a
      balanced head/common/tail profile (25.9 / 24.2 / 25.7 AP) where prior closed-vocabulary
      methods show a strong bias toward head categories.
    </p>

    <p>Ablation &mdash; selective vs. always/never invoking the reasoning VLM, evaluated on ScanNet200 with oracle (GT) instance masks to isolate semantic accuracy from geometric mask quality (paper Table II).</p>
    <div class="pp-table-scroll">
      <table>
        <thead>
          <tr>
            <th>Encoder</th>
            <th>VLM Routing</th>
            <th>mAP</th>
            <th>&Delta; vs. None</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="3">CLIP</td><td>None</td><td>32.9</td><td>&ndash;</td>
          </tr>
          <tr>
            <td class="pp-best">Selective</td><td class="pp-best">43.6</td><td class="pp-best">+32.5%</td>
          </tr>
          <tr>
            <td>Always</td><td>42.8</td><td>+30.1%</td>
          </tr>
          <tr>
            <td rowspan="3">SigLIP&nbsp;2</td><td>None</td><td>48.4</td><td>&ndash;</td>
          </tr>
          <tr>
            <td class="pp-best">Selective</td><td class="pp-best">51.9</td><td class="pp-best">+7.2%</td>
          </tr>
          <tr>
            <td>Always</td><td>50.8</td><td>+5.0%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="pp-note">
      Selective routing outperforms <em>both</em> never- and always-calling the VLM for both
      encoders &mdash; invoking the VLM on every instance can occasionally distract the model on
      cases the encoder already had right, so reasoning is most valuable precisely on the
      ambiguous subset (39&ndash;62% of instances per scene).
    </p>

    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/scene-q/qualitative.png" class="img-fluid rounded z-depth-1" alt="Qualitative 3D instance segmentation comparison across four ScanNet200 scenes: point cloud input, ground truth, OneFormer3D prediction, and Scene-Q's prediction, with circled regions highlighting where Scene-Q correctly separates instances that ground truth or OneFormer3D merge together." caption="Qualitative segmentation results across four ScanNet200 scenes &mdash; input point cloud, ground truth, OneFormer3D, and Scene-Q (ours). Circled regions show cases where Scene-Q correctly separates instances that ground truth or prior methods merge together." %}
    </figure>

  </section>

  <section class="pp-section" id="real-world">
    <h2>Real-World Validation</h2>
    <p>
      Beyond ScanNet200, Scene-Q was evaluated on previously unseen 3D maps captured in our lab
      with an Azure Kinect and reconstructed with RTAB-Map &mdash; using the exact same temperature
      scaling and routing thresholds fit on ScanNet200, with <strong>no retuning</strong> on the
      novel maps.
    </p>
    <figure class="pp-figure pp-figure--lg">
      {% include figure.liquid loading="lazy" path="assets/img/projects/scene-q/generalization.png" class="img-fluid rounded z-depth-1" alt="Comparison of ScanNet200-trained 3D instance proposals (Mask3D) and Scene-Q's refinement on a previously unseen real-world map captured in the lab, across four object regions; Mask3D merges or misses small objects under domain shift, while Scene-Q preserves separate, well-bounded instances." caption="Generalization to a previously unseen real-world map, with no parameter retuning. Under domain shift, ScanNet200-trained Mask3D proposals often merge instances or miss small objects, whereas Scene-Q preserves separate, well-bounded instance geometry." %}
    </figure>

    <p>Natural-language 3D instance retrieval (Hit@1) on these real-world maps, using each method's own predicted instance masks &mdash; i.e. no ground-truth masks at inference time (paper Table III).</p>
    <div class="pp-table-scroll">
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Category</th>
            <th>Attribute</th>
            <th>Spatial</th>
            <th>Affordance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OpenMask3D</td><td>19.2</td><td>16.6</td><td>3.7</td><td>1.1</td>
          </tr>
          <tr>
            <td>Open3DIS</td><td>40.8</td><td>29.3</td><td>10.2</td><td>3.4</td>
          </tr>
          <tr>
            <td>OpenYOLO3D</td><td>53.2</td><td>21.5</td><td>1.6</td><td>1.1</td>
          </tr>
          <tr>
            <td><strong>Scene-Q (ours)</strong></td>
            <td class="pp-best">67.6</td><td class="pp-best">61.6</td><td class="pp-best">54.6</td><td class="pp-best">36.7</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="pp-note">
      Gains are largest on the compositional query types &mdash; Spatial and Affordance &mdash;
      where crop-based encoder matching fails to leverage room context and inter-object relations.
      With ground-truth instance masks the same ordering holds and margins widen further (Scene-Q:
      75.9 / 69.2 / 61.4 / 41.2 across the four query types).
    </p>

    <figure class="pp-figure pp-figure--lg">
      {% include figure.liquid loading="lazy" path="assets/img/projects/scene-q/real-world-query.png" class="img-fluid rounded z-depth-1" alt="Four examples of natural-language 3D instance retrieval on a real-world reconstructed map, one per query type: Category ('a desk'), Attribute ('a metal cabinet full of items'), Spatial ('the coffee machine at the kitchen'), and Affordance ('a good place to sleep'). Each example shows the retrieved instance's 3D segmentation and a corresponding RGB view with the target boxed in yellow." caption="Natural-language 3D instance retrieval on a real-world map, one example per query type &mdash; Category, Attribute, Spatial, and Affordance. For each query, the top row shows the retrieved instance's 3D segmentation and the bottom row shows the corresponding RGB view with the target boxed in yellow." %}
    </figure>

  </section>

  <section class="pp-section" id="bibtex">
    <h2>BibTeX</h2>
    <div class="pp-bibtex">
{% highlight bibtex %}
@inproceedings{kim2026sceneq,
  title={Scene-Q: Confidence-Aware Coarse-to-Fine Querying of 3D Scenes with Selective VLM Reasoning},
  author={Kim, Juno and Park, Yesol and Yoon, Hye-Jung and Zhang, Byoung-Tak},
  booktitle={2026 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)},
  year={2026}
}
{% endhighlight %}
    </div>
  </section>

  <section class="pp-section" id="acknowledgements">
    <h2>Acknowledgements &amp; License</h2>
    <p>
      This work builds on
      <a href="https://github.com/facebookresearch/segment-anything" target="_blank" rel="noopener noreferrer">Segment Anything</a>,
      <a href="https://github.com/qqlu/Entity" target="_blank" rel="noopener noreferrer">CropFormer / EntitySeg</a>,
      <a href="https://github.com/QwenLM/Qwen2.5-VL" target="_blank" rel="noopener noreferrer">Qwen2.5-VL</a>,
      <a href="https://github.com/OpenMask3D/openmask3d" target="_blank" rel="noopener noreferrer">OpenMask3D</a>, and
      <a href="https://github.com/VinAIResearch/Open3DIS" target="_blank" rel="noopener noreferrer">Open3DIS</a>.
      The code release is MIT-licensed (see the
      <a href="https://github.com/teamROBI/Scene-Q/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a>
      file); vendored/dependent components retain their own licenses. This is a separate license
      from this website's own template/code.
    </p>
  </section>

</div>

<script defer src="{{ '/assets/js/project-page.js' | relative_url }}"></script>
<script defer src="{{ '/assets/js/ovmap-viewer.js' | relative_url }}"></script>
