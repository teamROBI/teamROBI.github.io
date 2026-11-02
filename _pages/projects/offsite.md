---
layout: anonymous_project
title: OffSite
description: "Mobile Manipulation from a Single Scene Capture, without On-Site Teleoperation"
permalink: /projects/offsite/
og_image: /assets/img/projects/offsite/posters/bimanual.jpg
---

<div class="project-page offsite-page" id="top" data-pp-single-playback>
  <nav class="os-nav" aria-label="Project navigation">
    <a class="os-wordmark" href="#top">OffSite<span aria-hidden="true">↗</span></a>
    <div class="os-nav-links">
      <a href="#workflow">Workflow</a>
      <a href="#method">Method</a>
      <a href="#results">Results</a>
    </div>
    <span class="os-project-label">Research project · 2026</span>
  </nav>

  <main id="main">
    <header class="os-hero">
      <p class="os-eyebrow">From a captured space to a capable robot</p>
      <h1>OffSite<span class="os-title-dot" aria-hidden="true">.</span></h1>
      <p class="os-subtitle">Mobile Manipulation from a Single Scene Capture,<br class="os-desktop-break"> without On-Site Teleoperation</p>
      <p class="os-lede">Capture the scene once. Generate robot demonstrations off site. Deploy a policy that navigates, grasps, and carries in the real space.</p>
      <div class="os-hero-actions">
        <a class="os-primary-link" href="#workflow">Full workflow · 2:41 <span aria-hidden="true">↓</span></a>
        <a class="os-text-link" href="#demos">Robot demos <span aria-hidden="true">↗</span></a>
      </div>
    </header>

    <section class="os-workflow" id="workflow" aria-labelledby="workflow-heading" data-pp-video-chapters>
      <div class="os-section-heading">
        <p class="os-eyebrow">The complete workflow / 2:41</p>
        <h2 id="workflow-heading">From scene capture<br>to real-world deployment.</h2>
        <p>See the full process: handheld capture, scene and task setup, verified simulation, generated training views, and the deployed robot. Use the chapters to jump to a stage.</p>
      </div>
      <figure class="os-comparison-video">
        <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/offsite/posters/demo.jpg' | relative_url }}" aria-label="Complete OffSite workflow: scene capture, task layout, verified generation, training views, and real-robot deployment">
          <source src="{{ '/assets/video/projects/offsite/demo.mp4' | relative_url }}" type="video/mp4">
        </video>
      </figure>
      <div class="os-video-chapters" aria-label="Workflow video chapters">
        <button type="button" data-pp-seek="17"><span>0:17</span>Workflow overview</button>
        <button type="button" data-pp-seek="37"><span>0:37</span>Scene capture</button>
        <button type="button" data-pp-seek="45"><span>0:45</span>Task layout</button>
        <button type="button" data-pp-seek="60"><span>1:00</span>Generate &amp; verify</button>
        <button type="button" data-pp-seek="108"><span>1:48</span>Training views</button>
        <button type="button" data-pp-seek="118"><span>1:58</span>Real deployment</button>
      </div>
    </section>

    <section class="os-demonstrations" id="demos" aria-labelledby="demos-heading">
      <div class="os-section-topline">
        <h2 id="demos-heading">On the real robot</h2>
        <span class="os-platform">AI-Worker FFW-SG2</span>
      </div>
      <div class="pp-tabs os-demo-tabs" data-pp-tabs>
        <div class="pp-tab-list os-task-tabs" role="tablist" aria-label="Choose a real-robot task">
          {% for task in site.data.offsite.tasks %}
            <button class="pp-tab" type="button" role="tab" id="offsite-tab-{{ task.id }}" aria-controls="offsite-panel-{{ task.id }}" aria-selected="{% if task.id == 'delivery' %}true{% else %}false{% endif %}">
              <span class="os-tab-number">{{ task.number }}</span>{{ task.short_title }}
            </button>
          {% endfor %}
        </div>
        {% for task in site.data.offsite.tasks %}
          <div class="pp-tab-panel os-demo-panel" id="offsite-panel-{{ task.id }}" role="tabpanel" aria-labelledby="offsite-tab-{{ task.id }}" {% unless task.id == 'delivery' %}hidden{% endunless %}>
            <div class="os-demo-story">
              <p class="os-task-label">Task {{ task.number }} <span aria-hidden="true">/</span> Real deployment</p>
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
              <span class="os-capability">{{ task.capability }}</span>
              <p class="os-task-result"><strong>{{ task.successes }}<span>/30</span></strong> real-robot successes</p>
              <p class="os-task-budget">Trained on 300 generated demonstrations.</p>
            </div>
            <figure class="os-demo-media">
              <video controls muted autoplay loop playsinline preload="none" poster="{{ task.poster | relative_url }}" data-src="{{ task.video | relative_url }}" aria-label="{{ task.title }} on the real FFW-SG2 at {{ task.speed }} playback">
                <source data-src="{{ task.video | relative_url }}" type="video/mp4">
              </video>
              <figcaption><span class="os-live-dot" aria-hidden="true"></span> Deployed policy · Real head-camera view <span>{{ task.speed }} playback</span></figcaption>
            </figure>
          </div>
        {% endfor %}
      </div>
      <p class="os-demo-note">Four tasks, each in a different captured environment. These clips show the deployed policy; the <a href="#workflow">full workflow video</a> also pairs generated training views with real execution.</p>
    </section>

    <dl class="os-metrics" aria-label="Project at a glance">
      <div><dt>13 <span>min</span></dt><dd>Average human effort per scene<br><span>7 min capture + 6 min layout</span></dd></div>
      <div><dt>300</dt><dd>Generated demonstrations per task<br><span>No on-site teleoperation</span></dd></div>
      <div><dt>60<span>%</span></dt><dd>Pooled real-robot success<br><span>72 successes / 120 trials</span></dd></div>
    </dl>

    <section class="os-section os-scene-section" aria-labelledby="scene-heading">
      <div class="os-section-copy">
        <p class="os-eyebrow">01 / The scene becomes the training ground</p>
        <h2 id="scene-heading">One walkthrough.<br>Many places to act.</h2>
        <p>A captured room carries more than its appearance. It supplies the geometry a mobile robot must navigate and the surfaces its arms must interact with.</p>
        <p>OffSite turns that capture into a reusable environment for generating demonstrations, with different task sites, object placements, and robot starting configurations.</p>
      </div>
      <figure class="os-figure os-scene-figure">
        {% include figure.liquid path="assets/img/projects/offsite/scene-overview.png" loading="lazy" alt="A single reconstructed room supports task sites in the kitchen, dining area, bookshelf, and living room, with real and generated robot-camera views shown alongside." sizes="(min-width: 1000px) 1100px, 95vw" %}
        <figcaption>One capture can support multiple task sites. The four-task evaluation uses four different captured scenes.</figcaption>
      </figure>
    </section>

    <section class="os-section" id="method" aria-labelledby="method-heading">
      <div class="os-section-heading">
        <p class="os-eyebrow">02 / How it works</p>
        <h2 id="method-heading">Capture. Verify. Learn.</h2>
        <p>Appearance and contact geometry come from the same reconstruction, so camera views and physical interactions share one coordinate frame.</p>
      </div>
      <ol class="os-method-steps">
        <li><span class="os-step-index">01</span><h3>Reconstruct the scene</h3><p>A 3D Gaussian Splatting model supplies scene appearance. A mesh from the same reconstruction supplies contact and collision geometry.</p></li>
        <li><span class="os-step-index">02</span><h3>Generate verified rollouts</h3><p>Sample task layouts, execute grasp and base motions in simulation, and keep only collision-free, reachable, successful episodes. Vision feedback refines grasp parameters after failures.</p></li>
        <li><span class="os-step-index">03</span><h3>Train, then deploy</h3><p>Depth compositing creates head- and wrist-camera training views. A vision-language-action policy learns from those views, robot state, and instructions, then runs closed loop on the real robot.</p></li>
      </ol>
      <figure class="os-figure os-pipeline-figure">
        {% include figure.liquid path="assets/img/projects/offsite/pipeline.png" loading="lazy" alt="OffSite pipeline: scene capture yields an appearance model and physics mesh, verified simulation rollouts become synchronized camera observations, and the trained policy is deployed on the real robot." sizes="(min-width: 1000px) 1100px, 95vw" %}
        <figcaption>One scene representation connects capture, verified demonstration generation, policy training, and real-world deployment.</figcaption>
      </figure>
    </section>

    <section class="os-section" id="results" aria-labelledby="results-heading">
      <div class="os-section-heading">
        <p class="os-eyebrow">03 / Real-robot evidence</p>
        <h2 id="results-heading">Scale the data.<br>Keep the on-site effort fixed.</h2>
        <p>At 90 demonstrations per task, generated data and on-site teleoperation both reach 43.3% pooled success. Scaling generated data to 300 demonstrations per task raises success to 60.0%, with the same one-time capture and layout effort.</p>
      </div>
      <div class="os-results-overview">
        <div class="os-results-chart" role="img" aria-label="Pooled real-robot success: on-site teleoperation with 90 demonstrations, 43.3 percent; OffSite with 90 demonstrations, 43.3 percent; OffSite with 300 demonstrations, 60.0 percent.">
          <div class="os-bar-row"><div><span>On-site teleoperation</span><small>90 demos / task · 52/120</small></div><div class="os-bar-track"><span class="os-bar os-bar-baseline" style="width: 43.3%"></span></div><strong>43.3%</strong></div>
          <div class="os-bar-row"><div><span>OffSite</span><small>90 demos / task · 52/120</small></div><div class="os-bar-track"><span class="os-bar os-bar-matched" style="width: 43.3%"></span></div><strong>43.3%</strong></div>
          <div class="os-bar-row"><div><span>OffSite</span><small>300 demos / task · 72/120</small></div><div class="os-bar-track"><span class="os-bar os-bar-scaled" style="width: 60%"></span></div><strong>60.0%</strong></div>
        </div>
        <aside class="os-results-aside"><strong>30 real trials<br>per task</strong><p>Four tasks, one robot platform, and the same policy backbone and evaluation protocol across conditions.</p><p>Additional generated data requires compute; the 13-minute figure covers human capture and layout effort only.</p></aside>
      </div>
      <p class="os-table-hint">Scroll to compare all results <span aria-hidden="true">→</span></p>
      <div class="os-table-wrap" role="region" aria-label="Task-level real-robot results, horizontally scrollable" tabindex="0">
        <table class="os-results-table">
          <caption>Real-robot success (%), 30 trials per task. Column labels give the training demonstrations per task.</caption>
          <thead><tr><th scope="col">Task</th><th scope="col">Teleoperation<br><span>90 demos</span></th><th scope="col">OffSite<br><span>90 demos</span></th><th scope="col">OffSite<br><span>300 demos</span></th></tr></thead>
          <tbody>
            {% for task in site.data.offsite.tasks %}
              <tr><th scope="row">{{ task.title }}</th><td>{{ task.teleop_rate }}</td><td>{{ task.matched_rate }}</td><td><strong>{{ task.rate }}</strong></td></tr>
            {% endfor %}
            <tr class="os-pooled-row"><th scope="row">Pooled</th><td>43.3</td><td>43.3</td><td><strong>60.0</strong></td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="os-section os-scope" aria-labelledby="scope-heading">
      <div><p class="os-eyebrow">What the result depends on</p><h2 id="scope-heading">Capture the place<br>the robot will work in.</h2></div>
      <div><p>The walkthrough must cover the viewpoints the robot will occupy. Missing views or geometry can reduce the yield of usable demonstrations, and substantial changes to the scene require a fresh capture.</p><p>The evaluation covers one robot platform and four rigid-object tasks. Deformable manipulation, tactile dexterity, and transfer across robot embodiments are outside this evaluation.</p></div>
    </section>

  </main>

  <footer class="os-footer"><span>OffSite <span aria-hidden="true">/</span> Research project</span><a href="#top">Back to top ↑</a></footer>
</div>
