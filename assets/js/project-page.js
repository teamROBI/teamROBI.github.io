/*
 * Shared demo-tabs component for teamROBI academic project pages.
 * Markup contract (see docs/PROJECT_PAGES.md):
 *
 *   <div class="pp-tabs" data-pp-tabs>
 *     <div class="pp-tab-list" role="tablist" aria-label="...">
 *       <button class="pp-tab" role="tab" id="tab-x" aria-controls="panel-x" aria-selected="true">...</button>
 *       ...
 *     </div>
 *     <div class="pp-tab-panel" id="panel-x" role="tabpanel" aria-labelledby="tab-x">...</div>
 *     <div class="pp-tab-panel" id="panel-y" role="tabpanel" aria-labelledby="tab-y" hidden>...</div>
 *   </div>
 *
 * Images use native lazy-loading (loading="lazy"). Video panels may use
 * <video data-src="..."> to defer loading until the tab is activated —
 * this component assigns src/calls load() on activation and pauses/clears
 * on deactivation, so inactive-tab videos are never fetched.
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function activateVideosIn(panel) {
    var videos = panel.querySelectorAll("video[data-src]");
    for (var i = 0; i < videos.length; i++) {
      var video = videos[i];
      var source = video.querySelector("source[data-src]") || video;
      var target = source.tagName === "SOURCE" ? source : video;
      target.setAttribute("src", target.getAttribute("data-src"));
      video.load();
      if (!prefersReducedMotion && video.hasAttribute("autoplay")) {
        var playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(function () {
            /* Autoplay was blocked — the poster image / controls remain usable. */
          });
        }
      }
    }
  }

  function deactivateVideosIn(panel) {
    var videos = panel.querySelectorAll("video");
    for (var i = 0; i < videos.length; i++) {
      var video = videos[i];
      video.pause();
    }
  }

  function initTabs(root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    function panelFor(tab) {
      return document.getElementById(tab.getAttribute("aria-controls"));
    }

    function select(tab, moveFocus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.tabIndex = selected ? 0 : -1;
        var panel = panelFor(t);
        if (!panel) return;
        if (selected) {
          panel.hidden = false;
          activateVideosIn(panel);
        } else {
          deactivateVideosIn(panel);
          panel.hidden = true;
        }
      });
      if (moveFocus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        select(tab, false);
      });

      tab.addEventListener("keydown", function (event) {
        var newIndex = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          newIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          newIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          newIndex = 0;
        } else if (event.key === "End") {
          newIndex = tabs.length - 1;
        }
        if (newIndex !== null) {
          event.preventDefault();
          select(tabs[newIndex], true);
        }
      });
    });

    // Ensure initial state matches whichever tab is marked aria-selected="true"
    // in the markup (falls back to the first tab).
    var initial =
      tabs.filter(function (t) {
        return t.getAttribute("aria-selected") === "true";
      })[0] || tabs[0];
    select(initial, false);
  }

  function init() {
    var tabRoots = document.querySelectorAll("[data-pp-tabs]");
    for (var i = 0; i < tabRoots.length; i++) {
      initTabs(tabRoots[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
