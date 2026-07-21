---
layout: page
permalink: /publications/
title: publications
title_ko: 논문
nav: true
nav_order: 1
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

<div style="display: flex; justify-content: flex-end;">
  {% include bib_search.liquid %}
</div>

<style>
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
  .code-display-wrapper:active .copy,
  .code-display-wrapper:focus .copy,
  .code-display-wrapper:hover .copy {
    color: #888 !important;
  }
</style>

<div class="publications">

{% bibliography %}

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
