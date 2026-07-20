---
layout: profiles
permalink: /people/
title: people
description: Team ROBI - Biointelligence Lab, Seoul National University
nav: true
nav_order: 4
_styles: |
  .post article hr {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
  /* When a profile's image floats left (align: left), list markers with the
     default outside position get swallowed by the float instead of getting
     their own indent — the bullet ends up flush with the wrapped text.
     Switch to inside positioning just for lists next to a left float. */
  .profile.float-left + .clearfix ul {
    list-style-position: inside;
  }

profiles:
  - align: right
    image: prof_pic.jpg
    content: about_hyejung_yoon.md
    image_circular: false # crops the image to make it circular
    more_info: >
      <p>HyeJung Yoon</p>
      <p><a href="https://www.linkedin.com/in/hyejung-yoon-19a271239" target="_blank">LinkedIn</a></p>
  - align: left
    image: prof_pic.jpg
    content: about_juno_kim.md
    image_circular: false # crops the image to make it circular
    more_info: >
      <p>Juno Kim</p>
  - align: right
    image: prof_pic.jpg
    content: about_yesol_park.md
    image_circular: false # crops the image to make it circular
    more_info: >
      <p>Yesol Park</p>
---
