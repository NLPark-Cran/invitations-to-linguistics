/* ============================================================
   deck.js — Part 1 演示分页
   业务背景：课堂投影用的「视频感」分页演示。
   - 数据来自 window.LING_DATA.script.slides（content/script.yaml 编译产物）
   - 交互：←/→、空格、点击屏幕左右半区、进度圆点均可翻页
   - 动效：翻页后页内元素按 --i 级联延迟做弹簧入场（CSS spring-in）
   ============================================================ */
(function () {
  "use strict";

  var DATA = window.LING_DATA;
  var slides = DATA.script.slides;
  var stage = document.getElementById("deck-stage");
  var progress = document.getElementById("deck-progress");
  var curEl = document.getElementById("deck-cur");
  var totalEl = document.getElementById("deck-total");

  var current = 0;
  var wheelLock = false; // 滚轮翻页节流锁，避免一次滚动连翻多页

  /* ---------- 工具：创建带类名与入场序号的元素 ---------- */
  function el(tag, cls, text, i) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    if (i != null) {
      node.classList.add("anim");
      node.style.setProperty("--i", i);
    }
    return node;
  }

  /* 双语小字容器：英文正文句 + 中文小字幕 */
  function pair(parent, enText, zhText, enCls, zhTag) {
    var en = el("span", enCls, enText);
    parent.appendChild(en);
    if (zhText) {
      var zh = document.createElement(zhTag || "em");
      zh.textContent = zhText;
      parent.appendChild(zh);
    }
  }

  /* ---------- 各版式的渲染器（与 script.yaml 的 layout 字段一一对应） ---------- */
  var renderers = {
    // 开场钩子：超大字 + 引句
    hook: function (slide, s) {
      s.appendChild(el("h1", "slide-title anim", slide.title_en, 1));
      s.appendChild(el("p", "slide-subtitle anim", slide.title_zh, 2));
      var quote = slide.body_en.split("—")[0].trim();
      s.appendChild(el("p", "hook-quote anim", quote, 3));
      var body = el("div", "slide-body anim", null, 4);
      pair(body, slide.body_en, slide.body_zh);
      s.appendChild(body);
    },

    // 语言定义：一句定义（四关键词高亮）+ 四张关键词卡
    definition: function (slide, s) {
      var title = el("h1", "slide-title def-sentence anim", null, 1);
      // 把四个关键词替换为高亮 span，课堂上一眼抓住定义骨架
      var html = slide.title_en.replace(
        /\b(system|arbitrary|vocal|human)\b/g,
        '<span class="kw">$1</span>'
      );
      title.innerHTML = html;
      s.appendChild(title);
      s.appendChild(el("p", "slide-subtitle anim", slide.title_zh, 2));
      var cards = el("div", "kw-cards");
      slide.items.forEach(function (it, i) {
        var card = el("div", "kw-card anim", null, 3 + i);
        card.appendChild(el("p", "kw-word", it.word_en));
        card.appendChild(el("p", "kw-zh", it.word_zh));
        var text = el("p", "kw-text");
        pair(text, it.text_en, it.text_zh);
        card.appendChild(text);
        cards.appendChild(card);
      });
      s.appendChild(cards);
    },

    // 逐条列表：识别特征 / 七种功能
    list: function (slide, s) {
      s.appendChild(el("h1", "slide-title anim", slide.title_en, 1));
      s.appendChild(el("p", "slide-subtitle anim", slide.title_zh, 2));
      var list = el("div", "term-list");
      // 长列表（≥6 条，如七种语言功能）自动启用紧凑模式，防止一屏放不下溢出裁切
      if (slide.items.length >= 6) list.classList.add("term-list--compact");
      slide.items.forEach(function (it, i) {
        var row = el("div", "term-row anim", null, 3 + i);
        var name = el("p", "term-name", it.term_en);
        var zh = document.createElement("em");
        zh.textContent = it.term_zh;
        name.appendChild(zh);
        row.appendChild(name);
        var desc = el("p", "term-desc");
        pair(desc, it.text_en, it.text_zh);
        row.appendChild(desc);
        list.appendChild(row);
      });
      s.appendChild(list);
    },

    // 三准则卡片 + 研究循环
    triad: function (slide, s) {
      s.appendChild(el("h1", "slide-title anim", slide.title_en, 1));
      s.appendChild(el("p", "slide-subtitle anim", slide.title_zh, 2));
      var body = el("div", "slide-body anim", null, 3);
      pair(body, slide.body_en, slide.body_zh);
      s.appendChild(body);
      var triad = el("div", "triad");
      slide.items.forEach(function (it, i) {
        var card = el("div", "triad-card anim", null, 4 + i);
        card.appendChild(el("p", "triad-num", "PRINCIPLE 0" + (i + 1)));
        var name = el("p", "triad-name", it.term_en);
        var zh = document.createElement("em");
        zh.textContent = it.term_zh;
        name.appendChild(zh);
        card.appendChild(name);
        var text = el("p", "triad-text");
        pair(text, it.text_en, it.text_zh);
        card.appendChild(text);
        triad.appendChild(card);
      });
      s.appendChild(triad);
      var loop = el("p", "triad-loop anim", null, 7);
      pair(loop, "observe → hypothesize → test & revise →", "观察语料 → 概括假设 → 验证修正");
      s.appendChild(loop);
    },

    // 分支地图：核心分支 + 宏观分支双栏
    map: function (slide, s) {
      s.appendChild(el("h1", "slide-title anim", slide.title_en, 1));
      s.appendChild(el("p", "slide-subtitle anim", slide.title_zh, 2));
      var body = el("div", "slide-body anim", null, 3);
      pair(body, slide.body_en, slide.body_zh);
      s.appendChild(body);
      var cols = el("div", "branch-cols");
      [["core", "CORE BRANCHES", "核心分支"], ["macro", "MACRO / INTERDISCIPLINARY", "宏观与交叉"]].forEach(function (cfg, c) {
        var col = el("div", "branch-col");
        var label = el("p", "branch-col-label", cfg[1]);
        var zl = document.createElement("em");
        zl.textContent = cfg[2];
        label.appendChild(zl);
        col.appendChild(label);
        slide.items[cfg[0]].forEach(function (it, i) {
          var item = el("div", "branch-item anim" + (it.bridge ? " bridge" : ""), null, 4 + c * 3 + i);
          item.appendChild(el("span", "branch-name", it.term_en));
          item.appendChild(el("span", "branch-zh", it.term_zh));
          if (it.group) item.appendChild(el("span", "branch-group", it.group));
          item.appendChild(el("span", "branch-note", it.text_zh));
          col.appendChild(item);
        });
        cols.appendChild(col);
      });
      s.appendChild(cols);
    },

    // 四对区分：左右对垒卡片，中间 VS 用对立色
    pairs: function (slide, s) {
      s.appendChild(el("h1", "slide-title anim", slide.title_en, 1));
      s.appendChild(el("p", "slide-subtitle anim", slide.title_zh, 2));
      var grid = el("div", "pair-grid");
      slide.items.forEach(function (it, i) {
        var card = el("div", "pair-card anim", null, 3 + i);
        var left = el("div", "pair-side");
        left.appendChild(el("span", "pair-term", it.left_en));
        left.appendChild(el("span", "pair-zh", it.left_zh));
        card.appendChild(left);
        card.appendChild(el("span", "pair-vs", "VS"));
        var right = el("div", "pair-side");
        right.appendChild(el("span", "pair-term", it.right_en));
        right.appendChild(el("span", "pair-zh", it.right_zh));
        card.appendChild(right);
        var note = el("p", "pair-note");
        pair(note, it.note_en, it.note_zh);
        card.appendChild(note);
        grid.appendChild(card);
      });
      s.appendChild(grid);
    },

    // 收束页：过渡到图谱
    closing: function (slide, s) {
      s.appendChild(el("h1", "slide-title anim", slide.title_en, 1));
      s.appendChild(el("p", "slide-subtitle anim", slide.title_zh, 2));
      var body = el("div", "slide-body anim", null, 3);
      pair(body, slide.body_en, slide.body_zh);
      s.appendChild(body);
      var cta = el("a", "closing-cta anim", null, 4);
      cta.href = "#part-graph";
      pair(cta, "Enter the Graph ↓", "进入完整图谱");
      s.appendChild(cta);
    }
  };

  /* ---------- 构建所有页 ---------- */
  slides.forEach(function (slide, idx) {
    var s = el("section", "slide");
    s.dataset.layout = slide.layout;
    s.dataset.index = idx;
    s.setAttribute("aria-label", slide.kicker_en);

    var kicker = el("div", "slide-kicker anim", null, 0);
    kicker.appendChild(el("span", "k-en", slide.kicker_en));
    kicker.appendChild(el("span", "k-zh", slide.kicker_zh));
    s.appendChild(kicker);

    (renderers[slide.layout] || renderers.hook)(slide, s);
    stage.appendChild(s);

    // 进度圆点
    var dot = el("button", "deck-dot");
    dot.setAttribute("aria-label", "Go to slide " + (idx + 1));
    dot.addEventListener("click", function (e) { e.stopPropagation(); go(idx); });
    progress.appendChild(dot);
  });

  totalEl.textContent = String(slides.length).padStart(2, "0");

  /* ---------- 翻页逻辑 ---------- */
  function go(n) {
    var next = Math.max(0, Math.min(slides.length - 1, n));
    if (next === current) return;
    current = next;
    render();
  }

  function render() {
    var all = stage.querySelectorAll(".slide");
    all.forEach(function (s, i) {
      // 重触发入场动画：先移除 is-active 强制回流再加回
      s.classList.remove("is-active");
      if (i === current) {
        void s.offsetWidth; // reflow，保证弹簧动画每次翻页都重播
        s.classList.add("is-active");
      }
    });
    progress.querySelectorAll(".deck-dot").forEach(function (d, i) {
      d.classList.toggle("is-active", i === current);
    });
    curEl.textContent = String(current + 1).padStart(2, "0");
  }

  // 键盘：←/→、空格、PageUp/Down、Home/End
  document.addEventListener("keydown", function (e) {
    // 仅在演示区可见时响应翻页键，避免滚动到图谱后误触
    var deckBox = document.getElementById("part-deck").getBoundingClientRect();
    if (deckBox.bottom < 0 || deckBox.top > window.innerHeight) return;
    if (e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); go(current + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(current - 1); }
    else if (e.key === "Home") { go(0); }
    else if (e.key === "End") { go(slides.length - 1); }
  });

  // 点击屏幕左右半区翻页（避开按钮/链接/圆点）
  document.getElementById("part-deck").addEventListener("click", function (e) {
    if (e.target.closest("button, a, input")) return;
    var x = e.clientX / window.innerWidth;
    if (x > 0.5) go(current + 1); else go(current - 1);
  });

  // 滚轮翻页（节流，视频感连续浏览）
  document.getElementById("part-deck").addEventListener("wheel", function (e) {
    if (wheelLock) { e.preventDefault(); return; }
    var atFirst = current === 0 && e.deltaY < 0;
    var atLast = current === slides.length - 1 && e.deltaY > 0;
    if (atFirst || atLast) return; // 到边界后放行，继续页面滚动
    e.preventDefault();
    wheelLock = true;
    go(current + (e.deltaY > 0 ? 1 : -1));
    setTimeout(function () { wheelLock = false; }, 900);
  }, { passive: false });

  document.getElementById("deck-prev").addEventListener("click", function () { go(current - 1); });
  document.getElementById("deck-next").addEventListener("click", function () { go(current + 1); });

  // 深链支持：#slide=N 直达第 N 页（课堂投影定位/视频截图调试用）
  var m = /slide-(\d+)/.exec(location.hash || "");
  if (m) current = Math.max(0, Math.min(slides.length - 1, parseInt(m[1], 10) - 1));

  render();
})();
