---
layout: about
title: about
permalink: /
subtitle: Biointelligence Lab, Seoul National University · advisor Prof. Byoung-Tak Zhang

profile:
  align: right
  image: prof_pic.jpg # TODO: replace with a team logo/photo
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>Seoul National University</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: false # includes social icons at the bottom of the page (single-person feature, disabled for a team site)

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false # no blog on this site
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<div class="lang-en">
  <p><strong>Team ROBI</strong> is a research team of three graduate students — <a href="/people/">HyeJung Yoon</a>, Juno Kim, and Yesol Park — at the <a href="https://bi.snu.ac.kr">Biointelligence Lab</a>, Seoul National University, advised by <a href="https://bi.snu.ac.kr/members/byoung-tak-zhang.html">Prof. Byoung-Tak Zhang</a>.</p>
  <p>We work on Embodied AI, Robot Perception, Vision-Language-Action (VLA) models, 3D Scene Understanding, Robot Learning, and Sim2Real Transfer, with a focus on integrating explicit 3D perception with policy learning for robust manipulation and mobile robotics.</p>
  <p>See our <a href="/people/">people</a>, <a href="/publications/">publications</a>, and <a href="/awards/">awards</a> pages to learn more.</p>
</div>

<div class="lang-ko" style="display: none">
  <p><strong>Team ROBI</strong>는 서울대학교 <a href="https://bi.snu.ac.kr">바이오지능연구실</a> 소속 대학원생 3명 — <a href="/people/">윤혜정</a>, 김주노, 박예솔 — 로 구성된 연구팀으로, <a href="https://bi.snu.ac.kr/members/byoung-tak-zhang.html">장병탁 교수님</a>의 지도를 받고 있습니다.</p>
  <p>Embodied AI, 로봇 인지, Vision-Language-Action(VLA) 모델, 3D 씬 이해, 로봇 학습, Sim2Real 전이를 연구하며, 강건한 매니퓰레이션과 모바일 로보틱스를 위해 명시적인 3D 인지와 정책 학습을 결합하는 데 집중하고 있습니다.</p>
  <p>자세한 내용은 <a href="/people/">팀원</a>, <a href="/publications/">논문</a>, <a href="/awards/">수상</a> 페이지를 참고해주세요.</p>
</div>

<style>
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
  .code-display-wrapper:active .copy,
  .code-display-wrapper:focus .copy,
  .code-display-wrapper:hover .copy {
    color: #888 !important;
  }
</style>
