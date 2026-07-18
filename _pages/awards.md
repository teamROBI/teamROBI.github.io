---
layout: page
permalink: /awards/
title: awards
description: Competition awards won by Team ROBI (Biointelligence Lab, Seoul National University).
nav: true
nav_order: 2
---

<!-- TODO: The list below is a draft based on a CV — verify per item whether each award was won by the whole team or an individual. -->
<!-- TODO: Photos are temporary placeholders (1.jpg-4.jpg). Replace with real award/ceremony photos. -->

<style>
  .award-highlight-card {
    position: relative;
    display: block;
    height: 260px;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .award-highlight-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18), 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .award-highlight-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  .award-highlight-card:hover img {
    transform: scale(1.06);
  }
  .award-highlight-card .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.35) 45%, rgba(0, 0, 0, 0) 75%);
  }
  .award-highlight-card .caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1rem 1.1rem;
    color: #fff;
  }
  .award-highlight-card .eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.85;
    margin-bottom: 0.15rem;
  }
  .award-highlight-card .headline {
    font-size: 1.08rem;
    font-weight: 600;
    line-height: 1.3;
  }

  .press-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: 0.75rem;
    text-decoration: none !important;
    color: inherit;
    transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .press-card:hover {
    background-color: rgba(0, 0, 0, 0.035);
    transform: translateX(2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  .press-card img {
    width: 110px;
    height: 78px;
    object-fit: cover;
    border-radius: 0.5rem;
    flex-shrink: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  }
  .press-card .outlet-date {
    font-size: 0.78rem;
    opacity: 0.65;
    margin-bottom: 0.15rem;
  }
  .press-card .headline {
    font-weight: 600;
    line-height: 1.35;
  }

  .award-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
    margin: 0;
  }
  .press-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>

## Highlights

<div class="award-grid">
  <div>
    <div class="award-highlight-card">
      <img src="{{ 'assets/img/1.jpg' | relative_url }}" alt="RoboCup@Home 2023">
      <div class="overlay"></div>
      <div class="caption">
        <div class="eyebrow">2023 · RoboCup@Home International AI Robot Competition</div>
        <div class="headline">🏆 1st Place (Champion), DSPL League</div>
      </div>
    </div>
  </div>
  <div>
    <div class="award-highlight-card">
      <img src="{{ 'assets/img/2.jpg' | relative_url }}" alt="Humanoid AI Challenge 2026">
      <div class="overlay"></div>
      <div class="caption">
        <div class="eyebrow">2026 · Humanoid AI Challenge</div>
        <div class="headline">🏆 1st Place (Minister of Trade, Industry &amp; Energy Award)</div>
      </div>
    </div>
  </div>
  <div>
    <div class="award-highlight-card">
      <img src="{{ 'assets/img/3.jpg' | relative_url }}" alt="ZEUS Arm-Robot Competition 2022">
      <div class="overlay"></div>
      <div class="caption">
        <div class="eyebrow">2022 · ZEUS Arm-Robot Competition, R-Biz Challenge</div>
        <div class="headline">🏆 1st Place (Presidential Award)</div>
      </div>
    </div>
  </div>
</div>

## All Awards

| Year       | Award                                                  | Competition / Event                                                             |
| ---------- | ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| 2026       | 1st Place (Minister of Trade, Industry & Energy Award) | Humanoid AI Challenge                                                           |
| 2024       | Director's Award                                       | Disaster Safety Data Hackathon, National Disaster Management Research Institute |
| 2023       | 1st Place (Champion), DSPL League                      | RoboCup@Home International AI Robot Competition                                 |
| 2023       | 1st Place (Minister of Science & ICT Award)            | AI Competition for Space Radio Disaster Prediction                              |
| 2023       | Outstanding Paper Award                                | Korea Computer Congress (KCC)                                                   |
| 2022, 2023 | 1st Place (Grand Prize)                                | Creative Autonomous Research Competition, Interdisciplinary Program in AI, SNU  |
| 2022       | 1st Place (Presidential Award)                         | ZEUS Arm-Robot Competition, International Robot Contest (R-Biz Challenge)       |
| 2022       | Honorable Mention                                      | Logistics Paper Competition                                                     |

## Press & Media

<!-- TODO: Rows below are example placeholders. Replace/add with real article URL, thumbnail image, outlet/date/title. -->

<div class="press-list">
  <a class="press-card" href="#" target="_blank" rel="noopener">
    <img src="{{ 'assets/img/5.jpg' | relative_url }}" alt="Press thumbnail">
    <div>
      <div class="outlet-date">Outlet name · 2026.03</div>
      <div class="headline">Article title goes here</div>
    </div>
  </a>
  <a class="press-card" href="#" target="_blank" rel="noopener">
    <img src="{{ 'assets/img/6.jpg' | relative_url }}" alt="Press thumbnail">
    <div>
      <div class="outlet-date">Outlet name · 2023.11</div>
      <div class="headline">Article title goes here</div>
    </div>
  </a>
</div>
