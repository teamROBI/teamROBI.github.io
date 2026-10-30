---
layout: page
title: "Head2Wrist: Wrist-Camera Robot Policies from Human Head-Camera Demonstrations without a Scene Scan"
description: CoRL 2026 Workshop on UMI Arena (Poster)
permalink: /projects/head2wrist/
_styles: |
  @import url("/assets/css/project-page.css");
  /* Match OV-MAP's spacing around figures exported from the paper. */
  .pp-figure img {
    padding: 1.5rem;
    box-sizing: border-box;
  }
---

<div class="project-page">

  <header class="pp-header">
    <p class="pp-venue">CoRL 2026 Workshop on UMI Arena (Poster)</p>
    <p class="pp-authors">
      <a href="{{ '/people/' | relative_url }}#juno-kim">Juno Kim</a> ·
      <a href="{{ '/people/' | relative_url }}#yesol-park">Yesol Park</a> ·
      <a href="{{ '/people/' | relative_url }}#hyejung-yoon">Hye-Jung Yoon</a> ·
      <a href="https://bi.snu.ac.kr/members/byoung-tak-zhang.html" target="_blank" rel="noopener noreferrer">Byoung-Tak Zhang</a>
    </p>
    <p class="pp-affiliations">Seoul National University</p>
    <div class="pp-buttons">
      <a href="https://github.com/teamROBI/Head2Wrist/blob/main/docs/paper.pdf" target="_blank" rel="noopener noreferrer">Paper</a>
      <a href="https://openreview.net/forum?id=VLfG1ekVkL" target="_blank" rel="noopener noreferrer">OpenReview</a>
      <a href="https://github.com/teamROBI/Head2Wrist" target="_blank" rel="noopener noreferrer">Code</a>
      <a href="https://huggingface.co/jkim50104/Head2Wrist-policy-cube-bowl" target="_blank" rel="noopener noreferrer">Models</a>
      <a href="https://huggingface.co/datasets/jkim50104/Head2Wrist-cube-bowl-252ep" target="_blank" rel="noopener noreferrer">Data</a>
      <a href="https://huggingface.co/datasets/jkim50104/Head2Wrist-quest-demos" target="_blank" rel="noopener noreferrer">Raw demos</a>
      <a href="#bibtex">BibTeX</a>
    </div>
  </header>

  <figure class="pp-teaser pp-figure">
    <video class="pp-demo-video" style="width: 100%; max-width: none;" controls muted autoplay loop playsinline preload="metadata" poster="{{ '/assets/img/projects/head2wrist/posters/teaser.jpg' | relative_url }}" aria-label="Human head demonstration retimed to the plan's grasp and release, with generated and real wrist views at the same planned poses">
      <source src="{{ '/assets/video/projects/head2wrist/teaser.mp4' | relative_url }}" type="video/mp4">
      Your browser does not support embedded video. <a href="{{ '/assets/video/projects/head2wrist/teaser.mp4' | relative_url }}">Download the teaser</a>.
    </video>
    <figcaption>The three streams are synchronized by task phase: the human head video is retimed to the plan's grasp and release. Generated and real wrist views show the same planned poses; the real D405 stream is open-loop plan replay.</figcaption>
  </figure>

  <p class="pp-tldr">
    Head2Wrist turns a posed human head-camera video and hand track into <strong>robot wrist-camera training views without a separate scene scan or teleoperation</strong>:
    reconstruct a scene, plan a hand-aligned robot trajectory, check it in a physics twin, and render layered wrist views for ACT.
    Trained only on generated views from three Quest 3 demonstrations of a cube into a bowl, the real-robot policy succeeds in 18/20 trials near demonstrated starts (open-loop replay: 5/20).
    In simulation, the matched training-image comparison shows no detectable difference on three development scenes, but a gap on held-out scenes and a failure on a thin phone.
  </p>

  <section class="pp-section" id="abstract">
    <h2>Abstract</h2>
    <p>
      Human head-camera demonstrations make up most large open manipulation datasets, but a robot trained on them meets two gaps: a moving human head rarely reproduces the robot&#x27;s head view, and the arm in the images is human; inpainting a robot arm over it keeps the first. We instead train on the robot&#x27;s wrist camera, whose view rides on the gripper, and generate it from a single human head-camera demonstration (posed head video and hand tracking), with no separate scene scan and no teleoperation. We reconstruct the scene from the pre-grasp head frame and nearby posed frames, plan a robot-executable, hand-aligned trajectory checked in a physics twin, and render the wrist views with layers matched to the robot&#x27;s camera (dynamic object, gripper, robot body, cast shadows). In closed loop on the real FFW-SG2, a policy trained only on views generated from three Meta Quest 3 demonstrations (a cube into a bowl) succeeds in 18 of 20 trials from cube starts within 3 cm and 30° of a demonstrated one, where replaying the planned path open loop succeeds in 5. In a matched training-image comparison in Isaac Lab twins of six EgoDex scenes, with the generator given a clean twin head render and the object&#x27;s exact geometry and start pose, ACT policies trained only on generated views show no detectable difference from true-view policies on three development scenes (all 9 paired p ≥ 0.12); on two held-out scenes they succeed less often in range (47/60 vs 58/60) and far less outside it (4/40 vs 27/40), and on a 1.4 cm-thin phone they succeed in 3 of 30 in-range trials (true view: 15).
    </p>
  </section>

  <section class="pp-section" id="method">
    <h2>Method</h2>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/head2wrist/fig2_method.png" class="img-fluid rounded z-depth-1" alt="Figure 2: a Quest 3 head demonstration becomes a metric scene, a hand-aligned robot plan checked in a physics twin, layered wrist views, and augmented training episodes for an ACT policy." caption="Figure 2. Method on one real Quest 3 cube-into-bowl demonstration: scene reconstruction, robot planning and physics checking, layered wrist-view generation, and policy training with re-planned demonstrations. The real-robot photo shows this plan's replay." %}
    </figure>
    <p>The pipeline has four stages:</p>
    <ol>
      <li>
        <strong>Scene from the head video.</strong> Inpaint the hand in the pre-grasp head frame and estimate depth with Depth Anything 3 on nearby posed frames.
        Match the table plane to the metric hand track with one scale factor, fit the table, segment objects with SAM 3, and lift the grasped object to a depth-refined SAM 3D mesh.
        The scene proxy extends the table beyond the head view.
      </li>
      <li>
        <strong>Robot plan and physics check.</strong> Plan an FFW-SG2 tool-center-point path aligned with the human pinch and palm: overview, descent, grasp, lift, transport, set-down and retreat.
        Search base position, heading and lift for a stance from which arm-only inverse kinematics reaches the path.
        An Isaac Lab twin replays the motion with physics and tries grasp variants; demonstrations that cannot pick and place are rejected.
      </li>
      <li>
        <strong>Layered wrist-view generator.</strong> Render the scene proxy along the planned D405 camera path using visible head-frame pixels and an outpainted table map.
        Composite the moving grasped object, the URDF gripper at its planned opening with target-camera textures, the robot arm and body, and cast shadows from randomized lighting.
      </li>
      <li>
        <strong>Policy.</strong> Train ACT on the active arm's 424 × 240 wrist images with an end-effector hybrid representation: absolute TCP pose and jaw width as state, and TCP poses relative to the current pose plus absolute jaw width as actions, executed through inverse kinematics.
        Re-plan for new object starts and robot stances; train with stance randomization and strong affine, colour, blur and noise augmentation.
      </li>
    </ol>
  </section>

  <section class="pp-section" id="real-robot">
    <h2>Real-Robot Results</h2>
    <p>
      Three of four Quest 3 cube-into-bowl demonstrations passed the physics check. Re-planning for object starts within ±8 cm and ±30° and randomized stances produced 252 training episodes.
      On 20 test starts inside that range, within 3 cm and 30° of a demonstrated start, the policy trained only on generated views succeeded in <strong>18/20</strong> trials; open-loop replay of the planned path succeeded in <strong>5/20</strong>.
      Both policy failures released the cube outside the bowl. This comparison tests closed-loop use near demonstrated starts; it does not establish an advantage over other training data.
    </p>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/head2wrist/fig1_qual.png" class="img-fluid rounded z-depth-1" alt="Figure 1: an EgoDex demonstration and its Isaac Lab twin with true-view and generated-view policy rollouts; alongside a real Quest 3 demonstration, generated wrist views and measured real D405 frames at grasp and place during plan replay." caption="Figure 1. Left: an EgoDex demonstration (stack/48) becomes an Isaac Lab twin whose head render feeds the generator; both ACT policies are tested from the same start. Right: Quest 3 demonstration, generated wrist views and real D405 plan-replay frames at grasp and place." %}
    </figure>
    <figure class="pp-figure">
      <video class="pp-demo-video" controls muted autoplay loop playsinline preload="metadata" poster="{{ '/assets/img/projects/head2wrist/posters/real_thirdperson_2x.jpg' | relative_url }}" aria-label="Real FFW-SG2: cube into bowl (2x speed)">
        <source src="{{ '/assets/video/projects/head2wrist/real_thirdperson_2x.mp4' | relative_url }}" type="video/mp4">
        Your browser does not support embedded video. <a href="{{ '/assets/video/projects/head2wrist/real_thirdperson_2x.mp4' | relative_url }}">Download the robot video</a>.
      </video>
      <figcaption>Real FFW-SG2: cube into bowl (2x speed)</figcaption>
    </figure>
    <p>
      Along a replayed path, generated views match real D405 frames with <strong>SSIM 0.64</strong> and <strong>median misalignment 5.6 px</strong> (simulation: 0.84 and 0.3 px).
    </p>
    <figure class="pp-figure">
      <video class="pp-demo-video" controls muted autoplay loop playsinline preload="metadata" poster="{{ '/assets/img/projects/head2wrist/posters/generated_vs_real_d405.jpg' | relative_url }}" aria-label="Generated wrist view, real D405 plan replay, and amplified pixel difference at identical planned poses">
        <source src="{{ '/assets/video/projects/head2wrist/generated_vs_real_d405.mp4' | relative_url }}" type="video/mp4">
        Your browser does not support embedded video. <a href="{{ '/assets/video/projects/head2wrist/generated_vs_real_d405.mp4' | relative_url }}">Download the wrist comparison</a>.
      </video>
      <figcaption>Generated wrist view, real D405 and amplified pixel difference at identical planned poses. This is open-loop plan replay, not a closed-loop policy trial.</figcaption>
    </figure>
  </section>

  <section class="pp-section" id="simulation">
    <h2>Simulation: A Matched Training-Image Comparison</h2>
    <p>
      The two ACT policies use the <strong>same trajectories, states and actions</strong>; only their training wrist images differ.
      A scripted expert in each Isaac Lab twin provides 225–630 demonstrations. The generator replaces every wrist frame using one clean twin head render and the object's exact geometry and start pose.
      Both policies are evaluated closed loop on the true simulated D405 from paired starts. These controlled inputs do not test reconstruction from raw human video.
    </p>
    <p>
      In-range starts use the training range (±8 cm, ±30°). Out-of-range starts extend up to 12 cm with at least one axis outside that range.
      Moved-base tests use in-range object starts with the base moved by up to 5 cm and 10°.
      Success requires lifting the object, an open gripper at the end, and a final object position within 3 cm in XY and 2 cm in height of the expert's placement.
    </p>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/head2wrist/fig3_results.png" class="img-fluid rounded z-depth-1" alt="Figure 3: paired true-view and generated-view simulation success counts with 95 percent Wilson intervals for six scenes, including the thin phone and two shaded held-out scenes; real-robot replay succeeds in 5 of 20 and the policy in 18 of 20." caption="Figure 3. Success with 95% Wilson intervals. Simulation policies differ only in training wrist images and use paired test starts; shaded rows are held out. Asterisks mark paired exact McNemar p &lt; 0.05. The right panel reports real-robot replay and policy results on the same 20 cube starts." %}
    </figure>
    <div class="pp-table-scroll" role="region" aria-label="Simulation success counts, horizontally scrollable" tabindex="0">
      <table>
        <caption>Figure 3 simulation results: successes / trials. Each pair is true view / generated view.</caption>
        <thead>
          <tr><th scope="col">Scene</th><th scope="col">In range<br>True / Generated</th><th scope="col">Out of range<br>True / Generated</th><th scope="col">Moved base<br>True / Generated</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">stack/18</th><td>42/50 / 47/50</td><td>30/40 / 29/40</td><td>17/24 / 18/24</td></tr>
          <tr><th scope="row">stack/48</th><td>29/30 / 29/30</td><td>5/20 / 6/20</td><td>19/24 / 17/24</td></tr>
          <tr><th scope="row">pick-place/25</th><td>30/30 / 30/30</td><td>16/20 / 14/20</td><td>18/24 / 21/24</td></tr>
          <tr><th scope="row">pick-place/1 (phone)</th><td>15/30 / 3/30 *</td><td>8/20 / 1/20 *</td><td>15/24 / 1/24 *</td></tr>
          <tr><th scope="row">pick-place/73 (held out)</th><td>28/30 / 22/30</td><td>17/20 / 0/20 *</td><td>20/24 / 13/24</td></tr>
          <tr><th scope="row">pick-place/67 (held out)</th><td>30/30 / 25/30</td><td>10/20 / 4/20 *</td><td>15/24 / 12/24</td></tr>
        </tbody>
      </table>
    </div>
    <p class="pp-note">
      Counts transcribe Figure 3; its intervals are 95% Wilson intervals. * Paired exact McNemar <i>p</i> &lt; 0.05; stack/18 out of range pools 16 + 24 starts.
      On stack/18, stack/48 and pick-place/25, none of the nine paired comparisons differs significantly (all <i>p</i> ≥ 0.12). No-difference results are not equivalence tests.
      A second training seed on stack/48 and pick-place/25 also gives no significant paired difference (all six <i>p</i> ≥ 0.25; between seeds all <i>p</i> ≥ 0.12).
    </p>
    <p>
      <strong>A gap remains on the held-out scenes.</strong> With generator and recipe frozen, generated-view success is lower in all six held-out test sets:
      pooled generated versus true counts are <strong>47/60 versus 58/60</strong> in range, <strong>4/40 versus 27/40</strong> out of range, and <strong>25/48 versus 35/48</strong> with a moved base (exact <i>p</i> = 0.003, &lt; 10<sup>−4</sup>, 0.02).
      On stack/48 out of range, both policies are far below the expert (5/20 and 6/20 versus 16/20).
    </p>
    <p>
      <strong>The 1.4 cm-thin phone is a failure case.</strong> On pick-place/1, generated versus true views produce 3/30 versus 15/30 in-range successes and 18 versus 10 rollouts with no lift.
    </p>
  </section>

  <section class="pp-section" id="ablations">
    <h2>Ablations</h2>
    <p>
      Representation, stance randomization and strong augmentation affect success. Object-pose and size errors reduce transfer, and bundled generator revisions do not isolate single-change effects.
      Table 1 reports closed-loop tests on the true camera.
    </p>
    <div class="pp-table-scroll" role="region" aria-label="Table 1 representation and robustness ablations, horizontally scrollable" tabindex="0">
      <table>
        <caption>Table 1, left. Generated views, stack/18 unless noted.</caption>
        <thead><tr><th scope="col">Setting</th><th scope="col">In range</th><th scope="col">Out of range</th><th scope="col">Moved base</th></tr></thead>
        <tbody>
          <tr><th scope="row">Joint-space ACT, fixed stance</th><td>22/50</td><td>4/40</td><td>0/24</td></tr>
          <tr><th scope="row">EEF absolute, fixed stance</th><td>45/50</td><td>22/40</td><td>2/24</td></tr>
          <tr><th scope="row">EEF hybrid, fixed stance</th><td>45/50</td><td>27/40</td><td>7/24</td></tr>
          <tr><th scope="row">+ stance randomization</th><td>21/50</td><td>20/40</td><td>7/24</td></tr>
          <tr><th scope="row">+ strong aug. (base generator)</th><td>46/50</td><td>33/40</td><td>17/24</td></tr>
          <tr><th scope="row">+ full generator</th><td>47/50</td><td>29/40</td><td>18/24</td></tr>
          <tr><th scope="row">True views (same recipe)</th><td>42/50</td><td>30/40</td><td>17/24</td></tr>
          <tr><th scope="row">Generated, exact object (stack/48)</th><td>29/30</td><td>6/20</td><td>17/24</td></tr>
          <tr><th scope="row">Object error ‡, median 1.2 cm / 3°</th><td>25/30</td><td>5/20</td><td>15/24</td></tr>
          <tr><th scope="row">Object error ‡, median 3.0 cm / 6.5°</th><td>18/30</td><td>2/20</td><td>12/24</td></tr>
          <tr><th scope="row">Constant image †</th><td>0/35</td><td>0/33</td><td>1/34</td></tr>
        </tbody>
      </table>
    </div>
    <p class="pp-note">
      EEF absolute uses absolute TCP-pose actions. ‡ Per-episode error in the generator's object start pose and size; median scale errors are 2.5% / 4.9%.
      † Constant grey wrist image in training and test on stack/48 + pick-place/25; stopped early.
    </p>
    <div class="pp-table-scroll" role="region" aria-label="Table 1 bundled generator revisions, horizontally scrollable" tabindex="0">
      <table>
        <caption>Table 1, right. Bundled generator versions (successes).</caption>
        <thead>
          <tr><th scope="col" rowspan="2">Generator</th><th scope="colgroup" colspan="3">stack/48</th><th scope="colgroup" colspan="3">pick-place/25</th></tr>
          <tr><th scope="col">In range</th><th scope="col">Out of range</th><th scope="col">Moved base</th><th scope="col">In range</th><th scope="col">Out of range</th><th scope="col">Moved base</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">Base</th><td>3</td><td>0</td><td>3</td><td>6</td><td>3</td><td>2</td></tr>
          <tr><th scope="row">+ colour</th><td>25</td><td>5</td><td>14</td><td>4</td><td>2</td><td>3</td></tr>
          <tr><th scope="row">+ seamless</th><td>—</td><td>—</td><td>—</td><td>27</td><td>12</td><td>12</td></tr>
          <tr><th scope="row">+ body (full)</th><td>29</td><td>6</td><td>17</td><td>30</td><td>14</td><td>21</td></tr>
          <tr><th scope="row">Trials</th><td>30</td><td>20</td><td>24</td><td>30</td><td>20</td><td>24</td></tr>
        </tbody>
      </table>
    </div>
    <p class="pp-note">
      Base: scene, object and gripper. Colour: colour-matched table extension and target-camera gripper texture. Seamless: seamless extension. Body: robot body and shadows.
      Revisions were chosen on development scenes by inspection and teacher-forced image-region swaps; on stack/18 out of range, success went from 33/40 (base generator) to 29/40 (full).
    </p>
  </section>

  <section class="pp-section" id="what-did-not-work">
    <h2>What Did Not Work</h2>
    <p>
      The generator must follow a close-range camera and keep the scene. In pilots, Lyra 2.0, from the hand-removed head frame, drifted from the commanded camera near the table and
      GEN3C dropped objects once the wrist camera magnified the head frame; over the scene proxy, Cosmos 3 repainted the scene and VACE inserted reference objects.
      Cosmos-Transfer2.5 keeps the scene, but refining the generated views (27 GPU-min per episode) gave no gain on stack/48 at 20 demonstrations
      (refined versus ours: 21/30 versus 20/30 in range, 12/24 versus 13/24 moved base).
    </p>
  </section>

  <section class="pp-section" id="limitations">
    <h2>Limitations</h2>
    <p>
      In simulation the generator receives the object's geometry and start pose from the twin; in the real pipeline these come from the head frame and SAM 3D.
      Synthetic object errors lower success. Four scenes served development and generator revisions were chosen on them, which may partly explain the held-out gap; the thin phone remains a failure case.
      No-difference results are not equivalence tests. Two main comparisons have a second seed, and bundled generator revisions hide single-change effects.
      Real trials cover one task near its demonstrated start and, against open-loop replay, show closed-loop use, not an edge over other training data.
    </p>
  </section>

  <section class="pp-section" id="bibtex">
    <h2>BibTeX</h2>
    <div class="pp-bibtex">
{% highlight bibtex %}
@inproceedings{kim2026head2wrist,
  title={Head2Wrist: Wrist-Camera Robot Policies from Human Head-Camera Demonstrations without a Scene Scan},
  author={Kim, Juno and Park, Yesol and Yoon, Hye-Jung and Zhang, Byoung-Tak},
  booktitle={CoRL 2026 Workshop on UMI Arena},
  year={2026}
}
{% endhighlight %}
    </div>
  </section>

  <section class="pp-section" id="acknowledgements">
    <h2>Acknowledgements</h2>
    <p>
      This work was partly supported by grants from the IITP (RS-2021-II211343-GSAI/10%, RS-2022-II220951-LBA/10%, RS-2022-II220953-PICA/10%, RS-2026-25553157-MIACC/10%), the NRF (RS-2024-00353991-SPARC/15%, RS-2023-00274280-HEI/15%), the KEIT (RS-2025-25453780/15%), and the KIAT (RS-2025-25460896/15%), funded by the Korean government.
    </p>
  </section>

  <section class="pp-section" id="license">
    <h2>License</h2>
    <p>
      The <a href="https://github.com/teamROBI/Head2Wrist/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">code</a>,
      <a href="https://huggingface.co/jkim50104/Head2Wrist-policy-cube-bowl" target="_blank" rel="noopener noreferrer">model</a>,
      <a href="https://huggingface.co/datasets/jkim50104/Head2Wrist-cube-bowl-252ep" target="_blank" rel="noopener noreferrer">dataset</a>, and
      <a href="https://huggingface.co/datasets/jkim50104/Head2Wrist-quest-demos" target="_blank" rel="noopener noreferrer">raw demonstrations</a>
      are released under the MIT License.
    </p>
  </section>

</div>

<script defer src="{{ '/assets/js/project-page.js' | relative_url }}"></script>
