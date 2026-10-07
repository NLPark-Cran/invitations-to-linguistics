/* ============================================================
   main.js — 站点胶水层
   业务背景：三部分（演示 / 图谱 / 前沿）共存的单页应用，
   这里负责顶部导航的滚动定位高亮与平滑滚动。
   各部分的业务逻辑分别在 deck.js / graph.js / research.js。
   ============================================================ */
(function () {
  "use strict";

  var links = document.querySelectorAll(".site-nav a");
  var sections = {
    deck: document.getElementById("part-deck"),
    graph: document.getElementById("part-graph"),
    research: document.getElementById("part-research")
  };

  // 滚动时高亮当前所在部分的导航项
  function onScroll() {
    var y = window.scrollY + window.innerHeight * 0.4;
    var active = "deck";
    if (sections.graph.offsetTop <= y) active = "graph";
    if (sections.research.offsetTop <= y) active = "research";
    links.forEach(function (a) {
      a.classList.toggle("is-active", a.dataset.nav === active);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 平滑滚动到锚点（配合 CSS scroll-behavior，双保险）
  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();
