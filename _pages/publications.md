---
layout: page
permalink: /publications/
title: publications
title_ko: 연구실적
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->

<div class="pubs-nav">
  <a href="javascript:void(0)" class="pubs-nav-link" data-scroll-target="papers">
    <span class="lang-en">International Papers</span><span class="lang-ko" style="display: none">국제 학술논문</span>
  </a>
  <a href="javascript:void(0)" class="pubs-nav-link" data-scroll-target="patents">
    <span class="lang-en">Patents</span><span class="lang-ko" style="display: none">특허</span>
  </a>
</div>

<script>
  (function () {
    // Plain "#id" anchors would change location.hash, which the theme's
    // bibsearch.js treats globally as a live search query on hashchange —
    // hiding every non-matching entry. Scroll manually instead so the
    // hash (and therefore the search box) is never touched.
    document.querySelectorAll(".pubs-nav-link[data-scroll-target]").forEach(function (link) {
      link.addEventListener("click", function () {
        var target = document.getElementById(link.dataset.scrollTarget);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });
  })();
</script>

<!-- Bibsearch Feature -->

<div style="display: flex; justify-content: flex-end;">
  {% include bib_search.liquid %}
</div>

<style>
  .pubs-nav {
    display: flex;
    gap: 0.6rem;
    margin-bottom: 1.2rem;
  }
  .pubs-nav-link {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 1rem;
    border-radius: 999px;
    border: 1px solid var(--global-divider-color, #dcdcdc);
    font-size: 0.88rem;
    font-weight: 600;
    text-decoration: none;
    color: var(--global-text-color);
  }
  .pubs-nav-link:hover,
  .pubs-nav-link:focus-visible {
    border-color: var(--global-theme-color);
    color: var(--global-theme-color);
  }
  /* Offset anchor-jump targets so the fixed navbar doesn't cover the
     top of the section when linked to directly from .pubs-nav. */
  #papers,
  #patents {
    scroll-margin-top: 90px;
  }
  #patents {
    margin-top: 2.5rem;
  }
  .badge-iros {
    background-color: #f9a8d4 !important;
    color: #831843 !important;
    font-weight: 800 !important;
  }
  .badge-icra {
    background-color: #a5b4fc !important;
    color: #1e1b4b !important;
    font-weight: 800 !important;
  }
  .publications h2.bibliography {
    font-weight: 800;
  }
  .bibsearch-form-input {
    max-width: 140px !important;
    min-width: 0 !important;
    background: transparent !important;
    border: none !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25) !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 2px 1.4rem 2px 0 !important;
    font-size: 0.85rem !important;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' width='14' height='14'%3E%3Ccircle cx='11' cy='11' r='7'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E") !important;
    background-repeat: no-repeat !important;
    background-position: right center !important;
  }
  .bibsearch-form-input:focus {
    border-bottom: 1px solid var(--global-theme-color) !important;
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
     always-pink like a normal link — too much pink alongside the badges
     and buttons already on this page. Keep default text color, only hint
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
  .patents-summary {
    font-size: 0.92rem;
    opacity: 0.8;
    margin-bottom: 1rem;
  }
  .patent-item {
    border: 1px solid var(--global-divider-color, #dcdcdc);
    border-radius: 8px;
    margin-bottom: 0.6rem;
    padding: 0.15rem 0.9rem;
  }
  .patent-item summary {
    cursor: pointer;
    padding: 0.6rem 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
  }
  .patent-item summary::-webkit-details-marker {
    display: none;
  }
  .patent-item summary::before {
    content: "▸";
    display: inline-block;
    opacity: 0.6;
    transition: transform 0.15s ease;
  }
  .patent-item[open] summary::before {
    transform: rotate(90deg);
  }
  .patent-tag {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
    color: #fff;
  }
  .patent-tag-kr {
    background-color: #1e3a8a;
  }
  .patent-tag-us {
    background-color: #7f1d1d;
  }
  .patent-title {
    font-size: 0.95rem;
  }
  .patent-details {
    padding: 0 0 0.8rem 1.4rem;
  }
  .patent-details-scroll {
    overflow-x: auto;
  }
  .patent-details table {
    border-collapse: collapse;
    width: 100%;
  }
  .patent-details th,
  .patent-details td {
    border: 1px solid var(--global-divider-color, #dcdcdc);
    padding: 0.4rem 0.7rem;
    text-align: left;
    font-size: 0.88rem;
  }
  .patent-details thead th {
    font-weight: 700;
  }
  .patent-details th:nth-child(1),
  .patent-details td:nth-child(1),
  .patent-details th:nth-child(2),
  .patent-details td:nth-child(2),
  .patent-details th:nth-child(3),
  .patent-details td:nth-child(3),
  .patent-details th:nth-child(5),
  .patent-details td:nth-child(5),
  .patent-details th:nth-child(6),
  .patent-details td:nth-child(6) {
    white-space: nowrap;
  }
  .patent-details td.patent-check {
    text-align: center;
  }
  .patent-check-yes {
    color: var(--global-theme-color);
    font-weight: 700;
  }
  .patent-check-no {
    opacity: 0.35;
  }
</style>

<h2 id="papers">
  <span class="lang-en">International Papers</span><span class="lang-ko" style="display: none">국제 학술논문</span>
</h2>

<div class="publications">

{% bibliography %}

</div>

<h2 id="patents">
  <span class="lang-en">Patents</span><span class="lang-ko" style="display: none">특허</span>
</h2>

<p class="patents-summary">
  <span class="lang-en">4 Korean and 3 U.S. patent applications — click a title for filing details.</span>
  <span class="lang-ko" style="display: none">국내 특허출원 4건, 미국 특허출원 3건 — 제목을 누르면 출원 정보가 펼쳐집니다.</span>
</p>

<div class="patents-list">

  <details class="patent-item">
    <summary>
      <span class="patent-tag patent-tag-kr">KR</span>
      <span class="patent-title">
        <span class="lang-en">Method and Device for Segmenting Instances of a Three-Dimensional Object</span>
        <span class="lang-ko" style="display: none">3차원 객체 인스턴스 분할 방법 및 장치</span>
      </span>
    </summary>
    <div class="patent-details">
      <div class="patent-details-scroll">
        <table>
          <thead>
            <tr>
              <th></th>
              <th><span class="lang-en">Application No.</span><span class="lang-ko" style="display: none">출원번호</span></th>
              <th><span class="lang-en">Filing Date</span><span class="lang-ko" style="display: none">출원일</span></th>
              <th><span class="lang-en">Title</span><span class="lang-ko" style="display: none">발명의 명칭</span></th>
              <th><span class="lang-en">Filed</span><span class="lang-ko" style="display: none">출원</span></th>
              <th><span class="lang-en">Granted</span><span class="lang-ko" style="display: none">등록</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>KR</td>
              <td>10-2025-0196205</td>
              <td>2025-12-11</td>
              <td>3차원 객체 인스턴스 분할 방법 및 장치</td>
              <td class="patent-check"><span class="patent-check-yes">&#10003;</span></td>
              <td class="patent-check"><span class="patent-check-no">&mdash;</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>

  <details class="patent-item">
    <summary>
      <span class="patent-tag patent-tag-kr">KR</span><span class="patent-tag patent-tag-us">US</span>
      <span class="patent-title">
        <span class="lang-en">Method and Apparatus for Constructing Zero-Shot Object Map</span>
        <span class="lang-ko" style="display: none">제로샷 객체 지도 구축 방법 및 장치</span>
      </span>
    </summary>
    <div class="patent-details">
      <div class="patent-details-scroll">
        <table>
          <thead>
            <tr>
              <th></th>
              <th><span class="lang-en">Application No.</span><span class="lang-ko" style="display: none">출원번호</span></th>
              <th><span class="lang-en">Filing Date</span><span class="lang-ko" style="display: none">출원일</span></th>
              <th><span class="lang-en">Title</span><span class="lang-ko" style="display: none">발명의 명칭</span></th>
              <th><span class="lang-en">Filed</span><span class="lang-ko" style="display: none">출원</span></th>
              <th><span class="lang-en">Granted</span><span class="lang-ko" style="display: none">등록</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>KR</td>
              <td>10-2025-0094302</td>
              <td>2025-07-14</td>
              <td>제로샷 객체 지도 구축 방법 및 장치</td>
              <td class="patent-check"><span class="patent-check-yes">&#10003;</span></td>
              <td class="patent-check"><span class="patent-check-no">&mdash;</span></td>
            </tr>
            <tr>
              <td>US</td>
              <td>19/397,081</td>
              <td>2025-11-21</td>
              <td>Method and Apparatus for Constructing Zero-Shot Object Map</td>
              <td class="patent-check"><span class="patent-check-yes">&#10003;</span></td>
              <td class="patent-check"><span class="patent-check-no">&mdash;</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>

  <details class="patent-item">
    <summary>
      <span class="patent-tag patent-tag-kr">KR</span><span class="patent-tag patent-tag-us">US</span>
      <span class="patent-title">
        <span class="lang-en">Method and Device for Controlling Action for Picking Object</span>
        <span class="lang-ko" style="display: none">객체 피킹 동작 제어 방법 및 장치</span>
      </span>
    </summary>
    <div class="patent-details">
      <div class="patent-details-scroll">
        <table>
          <thead>
            <tr>
              <th></th>
              <th><span class="lang-en">Application No.</span><span class="lang-ko" style="display: none">출원번호</span></th>
              <th><span class="lang-en">Filing Date</span><span class="lang-ko" style="display: none">출원일</span></th>
              <th><span class="lang-en">Title</span><span class="lang-ko" style="display: none">발명의 명칭</span></th>
              <th><span class="lang-en">Filed</span><span class="lang-ko" style="display: none">출원</span></th>
              <th><span class="lang-en">Granted</span><span class="lang-ko" style="display: none">등록</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>KR</td>
              <td>10-2025-0093542</td>
              <td>2025-07-11</td>
              <td>객체 피킹 동작 제어 방법 및 장치</td>
              <td class="patent-check"><span class="patent-check-yes">&#10003;</span></td>
              <td class="patent-check"><span class="patent-check-no">&mdash;</span></td>
            </tr>
            <tr>
              <td>US</td>
              <td>19/391,029</td>
              <td>2025-11-17</td>
              <td>Method and Device for Controlling Action for Picking Object</td>
              <td class="patent-check"><span class="patent-check-yes">&#10003;</span></td>
              <td class="patent-check"><span class="patent-check-no">&mdash;</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>

  <details class="patent-item">
    <summary>
      <span class="patent-tag patent-tag-kr">KR</span><span class="patent-tag patent-tag-us">US</span>
      <span class="patent-title">
        <span class="lang-en">Method and Apparatus for Segmenting an Instance of an Object</span>
        <span class="lang-ko" style="display: none">객체 인스턴스 분할 방법 및 장치</span>
      </span>
    </summary>
    <div class="patent-details">
      <div class="patent-details-scroll">
        <table>
          <thead>
            <tr>
              <th></th>
              <th><span class="lang-en">Application No.</span><span class="lang-ko" style="display: none">출원번호</span></th>
              <th><span class="lang-en">Filing Date</span><span class="lang-ko" style="display: none">출원일</span></th>
              <th><span class="lang-en">Title</span><span class="lang-ko" style="display: none">발명의 명칭</span></th>
              <th><span class="lang-en">Filed</span><span class="lang-ko" style="display: none">출원</span></th>
              <th><span class="lang-en">Granted</span><span class="lang-ko" style="display: none">등록</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>KR</td>
              <td>10-2025-0091395</td>
              <td>2025-07-08</td>
              <td>객체 인스턴스 분할 방법 및 장치</td>
              <td class="patent-check"><span class="patent-check-yes">&#10003;</span></td>
              <td class="patent-check"><span class="patent-check-no">&mdash;</span></td>
            </tr>
            <tr>
              <td>US</td>
              <td>19/403,543</td>
              <td>2025-11-28</td>
              <td>Method and Apparatus for Segmenting an Instance of an Object</td>
              <td class="patent-check"><span class="patent-check-yes">&#10003;</span></td>
              <td class="patent-check"><span class="patent-check-no">&mdash;</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>

</div>

<script>
  (function () {
    var colorMap = [
      ["ICRAW", "badge-icra"],
      ["ICRA", "badge-icra"],
      ["IROS", "badge-iros"],
    ];
    document.querySelectorAll(".publications abbr.badge").forEach(function (el) {
      var text = el.textContent.trim();
      for (var i = 0; i < colorMap.length; i++) {
        if (text === colorMap[i][0]) {
          el.classList.add(colorMap[i][1]);
          break;
        }
      }
    });
  })();
</script>
