---
layout: page
title: "Visual Perception-Based Assistive Mobile Robot System for Manipulation Tasks"
description: ICRA 2023 Workshop
permalink: /projects/assistive-manipulation/
_styles: |
  @import url("/assets/css/project-page.css");
  /* Figures are exported directly from the paper with no margin — add it
     back so they don't look edge-to-edge. */
  .pp-figure img {
    padding: 1.5rem;
    box-sizing: border-box;
  }
---

<div class="project-page">

  <header class="pp-header">
    <p class="pp-venue">
      ICRA 2023 Workshop — Emerging Paradigms for Assistive Robotic Manipulation: From
      Research Labs to the Real World
    </p>
    <p class="pp-authors">
      Hye-Jung Yoon ·
      Juno Kim ·
      Yesol Park ·
      Byoung-Tak Zhang<sup>1,2</sup>
    </p>
    <p class="pp-affiliations">
      <sup>1</sup>Interdisciplinary Program in AI, Seoul National University &nbsp;·&nbsp;
      <sup>2</sup>AI Institute, Seoul National University
    </p>
    <div class="pp-buttons">
      <a href="https://drive.google.com/file/d/1tq-axEfVanYB65fi0FpImqKS0GW1BVRZ/view?usp=share_link" target="_blank" rel="noopener noreferrer">Paper</a>
      <a href="https://sites.google.com/unisi.it/workshop-manipulation/home-page" target="_blank" rel="noopener noreferrer">Workshop</a>
      <a href="#bibtex">BibTeX</a>
    </div>
  </header>

  <div class="pp-teaser pp-figure pp-figure--md">
    {% include figure.liquid loading="eager" path="assets/img/projects/assistive-manipulation/teaser.png" class="img-fluid rounded z-depth-1" alt="Illustration of the proposed system: a mobile robot in a house is given the instruction 'Get me some water on the table,' determines the item, action, and place from the command, and navigates to complete the task." %}
  </div>

  <p class="pp-tldr">
    A visual perception-based assistive mobile robot system that performs both
    <strong>user-directive</strong> and <strong>robot-directive</strong> manipulation tasks —
    understanding natural-language instructions or autonomously perceiving user needs to
    help people with limited mobility.
  </p>

  <section class="pp-section" id="abstract">
    <h2>Abstract</h2>
    <p>
      Mobile robots have the potential to assist humans in grasping and manipulating tasks.
      However, making a reliable and efficient mobile robot system is challenging due to the
      complexity of dynamic environments. In this paper, we present a visual
      perception-based mobile robot system assisting individuals lacking manipulation
      skills. Our system designed to perform the user-directive and robot-directive tasks
      and utilizes Toyota's Human-Support-Robot (HSR) along with the unifiedIO model for
      visual interpretation techniques. Furthermore, we conducted experiments to
      demonstrate the potential of the HSR with visual interpretation for real-world
      applications in household settings. Our approach enhances the effectiveness of the
      mobile robot system and extends the range of tasks that can be accomplished.
    </p>
  </section>

  <section class="pp-section" id="method">
    <h2>Method</h2>
    <p>
      The system performs manipulation tasks through two task types, both executed on
      Toyota's Human Support Robot (HSR) using the unifiedIO model for visual grounding,
      image captioning, and VQA:
    </p>
    <ol>
      <li>
        <strong>User-directive tasks</strong> — the system parses a natural-language
        instruction into three components: item, action, and place. It then uses visual
        grounding to detect and locate the target item via the robot's head camera before
        executing the action.
      </li>
      <li>
        <strong>Robot-directive tasks</strong> — the robot autonomously perceives a
        specific user event through image captioning and uses VQA to determine whether the
        user needs assistance. If so, it asks the user whether they'd like help, then
        executes the confirmed task the same way as a user-directive task.
      </li>
    </ol>
    <figure class="pp-figure pp-figure--sm">
      {% include figure.liquid loading="lazy" path="assets/img/projects/assistive-manipulation/grasp-procedure.png" class="img-fluid rounded z-depth-1" alt="Procedure for grasping the target object: (a) the robot captures the angle of the object's surface at various angles, (b) it selects the corresponding pre-defined grasp pose optimized for that angle." caption="Procedure for grasping the target object. The robot first captures the angle of the object's surface (a), then selects the corresponding pre-defined grasp pose optimized for the object (b)." %}
    </figure>
    <p>
      To execute the grasp itself, the robot obtains point cloud data of the target
      object's bounding box, determines the angle of its surface relative to the normal
      vector at the center point, and selects the pre-defined grasp pose optimized for
      that surface angle.
    </p>
  </section>

  <section class="pp-section" id="results">
    <h2>Real-World Experiments</h2>
    <p>
      Tasks were tested across three pre-defined places — table, sofa, and refrigerator —
      in real household settings.
    </p>
    <figure class="pp-figure">
      {% include figure.liquid loading="lazy" path="assets/img/projects/assistive-manipulation/user-directive.png" class="img-fluid rounded z-depth-1" alt="Example of the user-directive task: (a) 'Bring me the remote on the table' — the robot detects and retrieves the remote; (b) 'Please remove all the objects on the sofa' — the robot detects and removes multiple objects one by one." caption="Example of the user-directive task. The robot comprehends the NL instructions from the user and performs the user-given tasks: (a) retrieving the remote from the table, (b) removing all objects from the sofa." %}
    </figure>
    <p>
      In the robot-directive case, the robot inspects whether the user is eating via
      image captioning at breakfast time; if VQA finds no drinks on the table, it asks the
      user whether they need one, then executes the task the user confirms.
    </p>
    <figure class="pp-figure pp-figure--sm">
      {% include figure.liquid loading="lazy" path="assets/img/projects/assistive-manipulation/robot-directive.png" class="img-fluid rounded z-depth-1" alt="Example of the robot-directive task: the robot uses image captioning and VQA to determine the user is eating breakfast with no drinks on the table, asks if the user needs anything, and retrieves a coke from the refrigerator after the user confirms." caption="Example of the robot-directive task. The robot perceives the user status through image captioning and VQA, then receives tasks from the user by interacting." %}
    </figure>
    <p class="pp-note">
      Across both task types, the robot correctly parsed the instruction/perceived event,
      located the target via visual grounding, and completed the manipulation — demonstrating
      the system's potential for assisting people with limited mobility in everyday
      household tasks.
    </p>
  </section>

  <section class="pp-section" id="bibtex">
    <h2>BibTeX</h2>
    <div class="pp-bibtex">
{% highlight bibtex %}
@inproceedings{yoon2023workshop,
  title={Visual Perception-Based Assistive Mobile Robot System for Manipulation Tasks},
  author={Yoon, Hye-Jung and Kim, Juno and Park, Yesol and Zhang, Byoung-Tak},
  booktitle={ICRA 2023 Workshop on Emerging Paradigms for Assistive Robotic Manipulation: From Research Labs to the Real World},
  year={2023}
}
{% endhighlight %}
    </div>
  </section>

</div>

<script defer src="{{ '/assets/js/project-page.js' | relative_url }}"></script>
