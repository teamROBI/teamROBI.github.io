---
layout: page
title: "Escape Is Not Success: Diagnosing Spatial-OOD Failures of Robot Action Interfaces"
description: CoRL 2026 Workshop on Everything Beneath the Policy (Austin, USA, November 12, 2026), poster
permalink: /projects/escape-is-not-success/
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
    <p class="pp-venue">CoRL 2026 Workshop on Everything Beneath the Policy (Austin, USA, November 12, 2026), poster</p>
    <p class="pp-authors">
      <a href="{{ '/people/' | relative_url }}#juno-kim">Juno Kim</a> ·
      <a href="{{ '/people/' | relative_url }}#yesol-park">Yesol Park</a> ·
      <a href="{{ '/people/' | relative_url }}#hyejung-yoon">Hye-Jung Yoon</a> ·
      <a href="https://bi.snu.ac.kr/members/byoung-tak-zhang.html" target="_blank" rel="noopener noreferrer">Byoung-Tak Zhang</a>
    </p>
    <p class="pp-affiliations">Seoul National University</p>
    <div class="pp-buttons">
      <a href="https://openreview.net/pdf?id=nRU0GzU0Hc" target="_blank" rel="noopener noreferrer">Paper</a>
      <a href="https://openreview.net/forum?id=nRU0GzU0Hc" target="_blank" rel="noopener noreferrer">OpenReview</a>
      <a href="https://github.com/teamROBI/escape-is-not-success" target="_blank" rel="noopener noreferrer">Code</a>
      <a href="#bibtex">BibTeX</a>
    </div>
  </header>

  <figure class="pp-teaser pp-figure">
    <video class="pp-demo-video" style="width: 100%; max-width: none;" controls muted autoplay loop playsinline preload="metadata" poster="{{ '/assets/img/projects/escape-is-not-success/posters/teaser.jpg' | relative_url }}" aria-label="Joint absolute, EEF absolute and joint residual ACT rollouts at the same target, 20 cm beyond the envelope at 20 degrees, seed 0">
      <source src="{{ '/assets/video/projects/escape-is-not-success/teaser.mp4' | relative_url }}" type="video/mp4">
      Your browser does not support embedded video. <a href="{{ '/assets/video/projects/escape-is-not-success/teaser.mp4' | relative_url }}">Download the teaser</a>.
    </video>
    <figcaption>One rollout per policy in Figure 1, re-run for a side camera no policy uses: cube 20 cm out at 20°, seed 0. Joint absolute uses the head camera; EEF absolute uses the wrist camera; joint residual uses the head camera and a query-time state anchor. Shorter streams hold their last frame.</figcaption>
  </figure>

  <p class="pp-tldr">
    Zero success can hide different failures: <strong>score escape, approach and strict completion separately</strong> to distinguish staying put, departing without approaching, and approaching without lifting.
    ACT policies with near-identical success stop at different stages.
  </p>

  <section class="pp-section" id="abstract">
    <h2>Abstract</h2>
    <p>
      Success conflates policies that stay put with those that approach but fail to lift. We score escape, distance-normalised approach and strict completion in simulated cube lifting (targets 5–25 cm radially and 10–30° angularly beyond demonstrations; three training seeds per cell). Three ACT policies complete 0, 0 and 1 of 70 radial episodes per seed yet differ: one stays within 1 cm of the demonstrated region, one escapes but rarely approaches, and one often approaches but rarely completes. Absolute arms approach in at most 4 of 70 radial episodes per seed in either frame and, for EEF commands, with every camera tested; residual arms in 27–60. Under residual EEF commands, a wrist camera adds 19–32 strict radial completions per seed; absolute policies rarely approach, so their zero completions cannot isolate camera effects. Per-seed stages and matched contrasts expose interface failure modes.
    </p>
  </section>

  <section class="pp-section" id="setup">
    <h2>Setup</h2>
    <p>
      A Franka Panda lifts a 5 cm cube in Isaac Lab. A scripted expert gives 15 demonstrations at each of 28 base-frame positions:
      r ∈ {0.35, 0.40, 0.45, 0.50} m and θ ∈ {−30°, −20°, …, 30°}.
      The demonstrated envelope is the sector <strong>r ∈ [0.325, 0.525] m, |θ| ≤ 35°</strong>, half a lattice step past the outer demonstrations so grasps there are not escapes.
      Test objects sit 5–25 cm beyond the envelope radially and 10–30° beyond it angularly.
      Each position has two rollouts of up to 600 steps at 30 Hz, with shared position and episode seeds.
    </p>
    <figure class="pp-figure pp-figure--md">
      {% include figure.liquid loading="lazy" path="assets/img/projects/escape-is-not-success/scene.png" class="img-fluid rounded z-depth-1" alt="Poster scene schematic: robot base, demonstration envelope, training positions, interior midpoints, radial tests and angular tests." caption="Demonstration envelope, training positions, withheld interior midpoints and spatial-OOD test positions. Radial targets sit 5–25 cm beyond the envelope; angular targets are at |θ| = 45°, 55° and 65°." %}
    </figure>
    <p>The evaluation scores three stages independently:</p>
    <ol>
      <li>
        <strong>Escape.</strong> The grasp point's maximum excursion beyond the demonstrated envelope is strictly greater than 1 cm.
      </li>
      <li>
        <strong>Approach.</strong> Distance-normalised progress toward the object's nominal spawn position is ≥0.25.
        Approach is 1 minus the closest planar grasp-point distance to the spawn position divided by the object's distance from the envelope, clipped to [0, 1]:
        0 if the grasp point never got nearer the object than the envelope edge, and 1 if it passed directly over it.
      </li>
      <li>
        <strong>Strict completion.</strong> The cube's centre stays at least 1 cm above its rest height and within 6 cm of the grasp point in the plane at three consecutive checks, 15 control steps apart.
      </li>
    </ol>
  </section>

  <section class="pp-section" id="results">
    <h2>Results</h2>
    <p>
      <strong>Similar success, different stages.</strong> Three ACT policies complete 0, 0 and 1 of 70 radial episodes per seed:
      joint absolute never leaves the envelope by more than 1 cm; wrist-only absolute EEF leaves it in 40–44 episodes but approaches in only 2–4;
      per-query residual joint leaves in 49–52 and approaches in 29–31.
    </p>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/escape-is-not-success/fig1_hero.png" class="img-fluid rounded z-depth-1" alt="Figure 1: cube-lifting task and three ACT policies with similar strict completion counts but different escape and approach stages." caption="Figure 1. Escape is not success. Left: the task from the head camera, with envelope and positions drawn on; inset: collection-B training wrist view. Right: three ACT policies, with joint residual anchored per query. Top: seed 0's 70 radial grasp-point paths, coloured by furthest outcome. Bottom: radial episodes meeting each stage threshold; bars show the three-seed mean and whiskers the minimum and maximum. The policies differ in several interface choices." %}
    </figure>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/escape-is-not-success/fig3_overlay.png" class="img-fluid rounded z-depth-1" alt="Figure 3: one side-camera rollout per policy at the same target, with earlier arm poses in grey and escape and approach measurements." caption="Figure 3. One rollout per policy in Figure 1: seed 0, cube 20 cm out at θ = 20°, where both evaluation episodes show its stage. Re-run for a side camera no policy uses; grey shows earlier poses." %}
    </figure>
    <p>
      <strong>The arm's command interface changes approach.</strong> In the main 2×2 comparison, no absolute-arm radial episode closes a tenth of the gap;
      residual cells average 0.31–0.69 approach and complete 3–10 of 70 episodes.
      All four cells use a head camera and absolute gripper commands.
    </p>
    <div class="pp-table-scroll" role="region" aria-label="Main 2 by 2 radial stage counts, horizontally scrollable" tabindex="0">
      <table>
        <caption>Main 2×2 comparison: radial episodes meeting each stage threshold, of 70 per seed. Entries list training seeds 0/1/2, paired across rows.</caption>
        <thead>
          <tr><th scope="col">Frame</th><th scope="col">Arm commands</th><th scope="col">Escaped &gt;1 cm</th><th scope="col">Approach ≥0.25</th><th scope="col">Strict completion</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">Joint</th><td>Absolute</td><td>0/0/0</td><td>0/0/0</td><td>0/0/0</td></tr>
          <tr><th scope="row">Joint</th><td>Per-step residual</td><td>62/48/68</td><td>53/35/60</td><td>10/5/4</td></tr>
          <tr><th scope="row">EEF</th><td>Absolute</td><td>0/12/0</td><td>0/0/0</td><td>0/0/0</td></tr>
          <tr><th scope="row">EEF</th><td>Per-step residual</td><td>60/67/66</td><td>44/56/57</td><td>3/7/9</td></tr>
        </tbody>
      </table>
    </div>
    <p class="pp-note">
      Counts transcribe the camera-ready Table 1. Absolute EEF uses quaternion orientation; residual EEF uses a rotation vector.
      A separate absolute rotation-vector control completes 55–56 of 56 training-cell episodes per seed, but no test episode reaches 0.25 approach.
      Closed-loop re-evaluation is not bitwise reproducible, so per-seed stage and completion counts can differ slightly from the paper.
    </p>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/escape-is-not-success/fig2_approach.png" class="img-fluid rounded z-depth-1" alt="Figure 2: approach and strict completion across radial distance bands for the main 2 by 2 and across EEF camera configurations." caption="Figure 2. The arm's command interface changes approach; the cameras change completion. Left: the 2×2 with head camera and absolute gripper, per 5 cm band (14 radial episodes per seed); its absolute arms approach and complete in none. EEF rotation formats differ. Right: the EEF camera rows over all 70 radial episodes per seed. Markers show the three-seed mean; whiskers show the minimum and maximum." %}
    </figure>
    <p>
      Under residual EEF commands, strict radial completions rise from 6/5/1 with head views to 25/37/31 with head+wrist views and 27/24/32 with wrist views;
      absolute EEF approaches in only 0–4 of 70 radial episodes per seed, so its zero completions cannot isolate camera effects.
    </p>
  </section>

  <section class="pp-section" id="recommendation">
    <h2>Recommendation</h2>
    <p>
      The study tests one simulated task, object, robot, top-down expert and ACT recipe; completion checks height and proximity, not contact; approach varies by seed.
      For spatial-OOD reaching, report:
    </p>
    <ol>
      <li>Demonstrated region, envelope construction, target distances, and all stage thresholds.</li>
      <li>Command frame, absolute or residual action, anchor, gripper, rates, and cameras.</li>
      <li>Per-seed continuous escape/approach and thresholded stage and completion counts.</li>
      <li>Count stage-order violations separately with values and completion flags (the moved-cube completion: a = 0.23 &lt; 0.25).</li>
    </ol>
  </section>

  <section class="pp-section" id="bibtex">
    <h2>BibTeX</h2>
    <div class="pp-bibtex">
{% highlight bibtex %}
@inproceedings{kim2026escape,
  title = {Escape Is Not Success: Diagnosing Spatial-{OOD} Failures of Robot Action Interfaces},
  author = {Kim, Juno and Park, Yesol and Yoon, Hye-Jung and Zhang, Byoung-Tak},
  booktitle = {CoRL 2026 Workshop on Everything Beneath the Policy},
  year = {2026},
  url = {https://openreview.net/forum?id=nRU0GzU0Hc}
}
{% endhighlight %}
    </div>
  </section>

</div>

<script defer src="{{ '/assets/js/project-page.js' | relative_url }}"></script>
