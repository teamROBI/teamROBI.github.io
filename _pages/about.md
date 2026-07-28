---
layout: about
title: about
title_ko: 소개
permalink: /
subtitle: Biointelligence Lab, Seoul National University · advisor Prof. Byoung-Tak Zhang
subtitle_ko: 서울대학교 바이오지능연구실 · 지도교수 장병탁

profile:
  align: right
  image: profile/robi_ex.jpeg
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>Team ROBI</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: false # includes social icons at the bottom of the page (single-person feature, disabled for a team site)

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false # no blog on this site
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<div class="lang-en">
  <p><strong>Team ROBI</strong> is a research team of three graduate students — <a href="/people/#hyejung-yoon">Hye-Jung Yoon</a>, <a href="/people/#yesol-park">Yesol Park</a>, and <a href="/people/#juno-kim">Juno Kim</a> — at the <a href="https://bi.snu.ac.kr">Biointelligence Lab</a>, Seoul National University, advised by <a href="https://bi.snu.ac.kr/members/byoung-tak-zhang.html">Prof. Byoung-Tak Zhang</a>.</p>
  <p>We work on Embodied AI, Robot Perception, Vision-Language-Action (VLA) models, 3D Scene Understanding, Robot Learning, and Sim2Real Transfer, with a focus on integrating explicit 3D perception with policy learning for robust manipulation and mobile robotics.</p>
  <p>See our <a href="/people/">people</a>, <a href="/publications/">publications</a>, and <a href="/awards/">awards</a> pages to learn more.</p>
</div>

<div class="lang-ko" style="display: none">
  <p><strong>Team ROBI</strong>는 서울대학교 <a href="https://bi.snu.ac.kr">바이오지능연구실</a> 소속 대학원생 — <a href="/people/#hyejung-yoon">윤혜정</a>, <a href="/people/#yesol-park">박예솔</a>, <a href="/people/#juno-kim">김준오</a> — 로 구성된 연구팀으로, <a href="https://bi.snu.ac.kr/members/byoung-tak-zhang.html">장병탁 교수님</a>의 지도를 받고 있습니다.</p>
  <p>저희는 체화 인공지능(Embodied AI), 로봇 인지, 비전-언어-행동(Vision-Language-Action, VLA) 모델, 3차원 장면 이해, 로봇 학습, Sim2Real 전이를 연구합니다. 특히 명시적인 3차원 인지 기술과 정책 학습을 결합하여, 강건한 로봇 조작 및 이동 로봇 시스템을 구현하는 데 중점을 두고 있습니다.</p>
  <p>자세한 내용은 <a href="/people/">구성원</a>, <a href="/publications/">연구실적</a>, <a href="/awards/">수상 실적</a> 페이지에서 확인하실 수 있습니다.</p>
</div>

<style>
  .more-info {
    text-align: center;
  }
  /* The "selected publications" heading sits right after the News table
     (which only has a tight 1rem margin-bottom from the base .table rule),
     but the actual paper list below it has a 2rem margin-top (from
     al_folio_core's .publications rule) — so the heading visually reads as
     part of News instead of Publications. Match the gap above it to the
     gap already below it. */
  .news + h2 {
    margin-top: 2rem;
  }
  /* Light zebra striping for the News table so rows are easier to scan in
     the scrollable box. --global-divider-color is tuned for hairline
     borders, not fills, so it reads as too dark used as a row background —
     use a low-opacity overlay instead (same subtlety as the .press-card
     hover state on the awards page), with a separate dark-mode value. */
  .news table tr:nth-child(even) {
    background: rgba(0, 0, 0, 0.035);
  }
  @media (prefers-color-scheme: dark) {
    .news table tr:nth-child(even) {
      background: rgba(255, 255, 255, 0.05);
    }
  }
  :root[data-theme="dark"] .news table tr:nth-child(even) {
    background: rgba(255, 255, 255, 0.05);
  }
  /* al_folio_core's base .profile rule is width: 100% below the 576px
     breakpoint (it only steps down to 30% at >= 576px) — cap it at 80%
     on narrow screens instead so the photo doesn't dominate the page. */
  @media (max-width: 575.98px) {
    .profile {
      width: 80%;
      /* al_folio_core's own CSS sets a fixed margin-left (float-right) or
         margin-right (float-left) of 1rem via a more specific
         ".profile.float-right"/".profile.float-left" rule, which beats a
         plain ".profile" margin declaration — leaving one side fixed and
         the other auto, so the block hugs one edge instead of centering.
         !important forces both to auto regardless of that specificity. */
      margin-left: auto !important;
      margin-right: auto !important;
    }
  }
  /* Tailwind's compiled output wraps its utilities in "@layer utilities",
     and per the CSS Cascade Layers spec any layered !important declaration
     beats an unlayered !important one regardless of specificity — so this
     override has to join the same layer to reliably win. */
  @layer utilities {
    @media (max-width: 575.98px) {
      .profile.float-left,
      .profile.float-right {
        float: none !important;
      }
    }
  }
  /* al_folio_core's base .profile rule is width: 30% at >= 576px — bump it
     up to 35% so the team photo reads a bit larger on desktop. */
  @media (min-width: 576px) {
    .profile {
      width: 35%;
    }
  }
  /* NOTE: .bibtex itself carries the theme's collapse animation
     (max-height: 0 + overflow: hidden — see _sass/_publications.scss) —
     padding must NOT go on .bibtex directly, or it renders as a visible
     sliver even while "collapsed" (padding isn't clipped by max-height
     the way content is). Style the inner figure/pre instead. */
  .publications .bibtex .highlight,
  .publications .bibtex figure.highlight {
    border-radius: 8px;
    background: #f2f2f2;
    padding: 0.8rem;
    display: block;
  }
  .publications .bibtex .highlight pre,
  .publications .bibtex figure.highlight pre,
  .publications .bibtex .highlight code,
  .publications .bibtex figure.highlight code {
    background: transparent;
    margin: 0;
    padding: 0;
    font-size: 0.8rem;
  }
  .publications .bibtex pre {
    overflow-x: auto;
  }
  @media (prefers-color-scheme: dark) {
    .publications .bibtex .highlight,
    .publications .bibtex figure.highlight {
      background: #2a2a2a;
    }
  }
  :root[data-theme="dark"] .publications .bibtex .highlight,
  :root[data-theme="dark"] .publications .bibtex figure.highlight {
    background: #2a2a2a;
  }
  .publications .author,
  .publications .periodical {
    font-size: 0.88rem;
  }
  /* Title/author links (to the project page / people page) shouldn't be
     always-pink like a normal link — keep default text color, only hint
     "clickable" on hover/focus. */
  .publications .title a,
  .publications .author a {
    color: inherit;
    text-decoration: none;
  }
  .publications .title a:hover,
  .publications .title a:focus-visible,
  .publications .author a:hover,
  .publications .author a:focus-visible {
    color: var(--global-theme-color);
    text-decoration: underline;
  }
  .code-display-wrapper:active .copy,
  .code-display-wrapper:focus .copy,
  .code-display-wrapper:hover .copy {
    color: #888 !important;
  }
</style>
