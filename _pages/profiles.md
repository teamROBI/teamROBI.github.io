---
layout: profiles
permalink: /people/
title: people
title_ko: 구성원
description: Team ROBI - Biointelligence Lab, Seoul National University
description_ko: Team ROBI - 서울대학교 바이오지능연구실
nav: true
nav_order: 4
_styles: |
  .post article hr {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
  /* When a profile's image floats left (align: left), the list's line boxes
     share space with the float, which breaks outside-marker indentation
     (bullet renders flush with the float) AND, if "inside" is used instead,
     breaks the hanging indent on wrapped lines (they'd go flush to the
     margin instead of aligning under the text). Establishing a new block
     formatting context on the ul makes it lay out in its own column next
     to the float instead of interacting with it line-by-line — normal
     outside-marker + hanging-indent behavior "just works" inside that
     column, same as the float-right profiles. */
  .profile.float-left + .clearfix ul {
    display: flow-root;
  }
  /* Center the name + buttons under each profile photo, stacked, so they
     don't have to compete for width on one line (name wrapping past the
     buttons on narrower photos/names). */
  .more-info {
    text-align: center;
  }
  .more-info p {
    margin: 0.3rem 0;
  }
  /* .btn's border/padding only activates inside the publications page's
     .links wrapper (see main.css) — define our own rounded-rectangle
     button style instead of relying on that. */
  .profile-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border: 1px solid var(--global-divider-color, #ccc);
    border-radius: 6px;
    padding: 0.1rem 0.45rem;
    margin: 0.25rem 0.08rem;
    font-size: 0.72rem;
    color: var(--global-text-color);
    text-decoration: none;
  }
  .profile-btn:hover {
    color: var(--global-theme-color);
    border-color: var(--global-theme-color);
  }
  /* Offset anchor-jump targets so the fixed navbar doesn't cover the top
     of the section when linked to directly (e.g. from about.md). */
  .profile-anchor {
    scroll-margin-top: 90px;
  }

profiles:
  - id: hyejung-yoon
    align: right
    image: prof_pic.jpg
    content: about_hyejung_yoon.md
    image_circular: false # crops the image to make it circular
    more_info: >
      <p><span class="lang-en">HyeJung Yoon</span><span class="lang-ko" style="display: none">윤혜정</span></p>
      <p><a href="https://www.linkedin.com/in/hyejung-yoon-19a271239" target="_blank" class="profile-btn"><i class="fa-brands fa-linkedin"></i> LinkedIn</a></p>
  - id: yesol-park
    align: left
    image: prof_pic.jpg
    content: about_yesol_park.md
    image_circular: false # crops the image to make it circular
    more_info: >
      <p><span class="lang-en">Yesol Park</span><span class="lang-ko" style="display: none">박예솔</span></p>
      <p><a href="https://www.linkedin.com/in/yesolpark125" target="_blank" class="profile-btn"><i class="fa-brands fa-linkedin"></i> LinkedIn</a></p>
  - id: juno-kim
    align: right
    image: prof_pic.jpg
    content: about_juno_kim.md
    image_circular: false # crops the image to make it circular
    more_info: >
      <p><span class="lang-en">Juno Kim</span><span class="lang-ko" style="display: none">김준오</span></p>
      <p>
        <a href="https://www.linkedin.com/in/juno-kim-738579361" target="_blank" class="profile-btn"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
        <a href="/assets/pdf/juno_kim_cv.pdf" target="_blank" class="profile-btn"><i class="fa-solid fa-file-pdf"></i> CV</a>
      </p>
---
