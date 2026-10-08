/* ============================================================
   graph.js — Part 2 可探索概念图谱（v2 视觉升级版）
   业务背景：课程作业核心交付物——「语言学总论」章节的完整概念网络。
   v2 迭代要点（字号与可视化反馈）：
   - 节点分型：core 双环大节点+光晕 / distinctions 品红虚线环（呼应对立）/
     people 菱形 / 其余模块色细环；选中双层描边 + 呼吸光晕
   - 边五种关系分型：对立 = 品红双线流动虚线 + 中点 VS 徽章（一眼可辨）；
     指向章节 = 紫色虚线 + 箭头 + 背板注记；理论解释 = 青色点线
   - 标签 LOD：随缩放三级显隐 + 字号自适应 + 深色圆角背板，避免与边线互挡
   - 布局：手工分区坐标 + 轻力导向（回家弹簧 + 近距斥力），拖拽后回弹归位
   - 交互：拖拽 / 滚轮缩放（光标锚点）/ 缩放 HUD / hover 邻里高亮 /
     点击弹概念卡片 / 搜索聚焦涟漪 / 按模块筛选 / 入场级联弹入 + 边生长
   渲染：Canvas 2D，devicePixelRatio 适配高清屏，rAF 主循环。
   ============================================================ */
(function () {
  "use strict";

  var DATA = window.LING_DATA.graph;
  var canvas = document.getElementById("graph-canvas");
  var ctx = canvas.getContext("2d");

  /* ---------- 设计令牌（与 css/style.css :root 保持一致） ---------- */
  var COLORS = {
    ink: "#F2EDE3",
    inkDim: "rgba(242,237,227,.58)",
    inkFaint: "rgba(242,237,227,.32)",
    bg: "#0B0B10",
    bgSoft: "#12121A",
    bgRaise: "#1A1A24",
    accent: "#F0C96B",
    cyan: "#7FD8E8",
    opp: "#FF5C7A",
    violet: "#B79CFF",
    green: "#8FD9A8"
  };
  // 模块 → 节点主色（筛选 chips 与节点着色共用）
  var MODULE_COLORS = {
    core: COLORS.accent,
    features: COLORS.green,
    functions: "#E8A15C",
    branches: COLORS.cyan,
    distinctions: COLORS.opp,
    people: COLORS.violet
  };
  // 模块入场顺序（级联弹入的节奏依据）
  var MODULE_ORDER = ["core", "features", "functions", "distinctions", "branches", "people"];
  // 关系类型 → 线样式
  var EDGE_STYLES = {
    composition:    { color: COLORS.green,  width: 1.4, dash: [],      label: "Composition 组成" },
    classification: { color: "rgba(242,237,227,.30)", width: 1, dash: [], label: "Classification 分类" },
    opposition:     { color: COLORS.opp,    width: 1.6, dash: [6, 5],  label: "Opposition 对立", double: true, vs: true },
    explanation:    { color: COLORS.cyan,   width: 1.2, dash: [2, 4],  label: "Explanation 理论解释" },
    chapter:        { color: COLORS.violet, width: 1.3, dash: [8, 5],  label: "Next Chapters 指向章节", arrow: true },
    association:    { color: "rgba(242,237,227,.38)", width: 1, dash: [1.5, 5], label: "Association 关联" }
  };

  /* ---------- 工具 ---------- */
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  // easeOutBack：入场弹簧过冲（与 CSS --spring 同一语言）
  function easeOutBack(t) {
    var c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }
  // 圆角矩形路径（兼容无 ctx.roundRect 的环境）
  function pillPath(x, y, w, h, r) {
    r = Math.min(r, h / 2, w / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  // 模块色 → 指定透明度的 rgba（用于节点浅底填充与光晕）
  function withAlpha(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  /* ---------- 节点初始化：归一化坐标 → 世界坐标 + 力导向状态 ---------- */
  var WORLD_W = 1600, WORLD_H = 1000; // 世界坐标系尺寸（画布内可视区按需缩放）
  var moduleIdx = {}; // 每个模块内的序号（入场级联用）
  var nodes = DATA.nodes.map(function (n) {
    var mi = MODULE_ORDER.indexOf(n.module);
    var order = moduleIdx[n.module] = (moduleIdx[n.module] || 0) + 1;
    return {
      data: n,
      x: n.x * WORLD_W,
      y: n.y * WORLD_H,
      hx: n.x * WORLD_W,   // 回家弹簧的锚点（手工分区坐标）
      hy: n.y * WORLD_H,
      vx: 0, vy: 0,
      r: n.module === "core" ? 30 : (n.module === "people" ? 20 : 16),
      phase: Math.random() * Math.PI * 2, // 待机浮动相位
      enterDelay: (mi < 0 ? 6 : mi) * 130 + (order - 1) * 60, // 入场级联延迟 ms
      dimmed: false,
      match: false
    };
  });
  var nodeById = {};
  nodes.forEach(function (n) { nodeById[n.data.id] = n; });

  var edges = DATA.edges.map(function (e, i) {
    return {
      source: nodeById[e.source], target: nodeById[e.target],
      type: e.type, note: e.note || "",
      enterDelay: 500 + i * 22 // 边生长延迟：节点大体落位后依次连线
    };
  });

  // 邻接表：概念卡片「相关概念」与 hover 邻里高亮共用
  var adjacency = {};
  var neighborOf = {};
  edges.forEach(function (e) {
    (adjacency[e.source.data.id] = adjacency[e.source.data.id] || []).push({ node: e.target, type: e.type });
    (adjacency[e.target.data.id] = adjacency[e.target.data.id] || []).push({ node: e.source, type: e.type });
    (neighborOf[e.source.data.id] = neighborOf[e.source.data.id] || []).push(e.target);
    (neighborOf[e.target.data.id] = neighborOf[e.target.data.id] || []).push(e.source);
  });

  /* ---------- 相机：缩放 + 平移 ---------- */
  var cam = { x: 0, y: 0, scale: 1 };
  function fitCamera() {
    // 初始/复位视图：世界坐标整体适配画布，留边距
    var w = canvas.clientWidth, h = canvas.clientHeight;
    cam.scale = Math.min(w / WORLD_W, h / WORLD_H) * 0.94;
    cam.x = (w - WORLD_W * cam.scale) / 2;
    cam.y = (h - WORLD_H * cam.scale) / 2;
    updateZoomHud();
  }
  function worldToScreen(wx, wy) { return [wx * cam.scale + cam.x, wy * cam.scale + cam.y]; }
  function screenToWorld(sx, sy) { return [(sx - cam.x) / cam.scale, (sy - cam.y) / cam.scale]; }
  // 以某个屏幕点为锚点缩放（滚轮与 HUD 按钮共用）
  function zoomAt(sx, sy, factor) {
    var before = screenToWorld(sx, sy);
    cam.scale = Math.max(0.35, Math.min(3, cam.scale * factor));
    var after = screenToWorld(sx, sy);
    cam.x += (after[0] - before[0]) * cam.scale;
    cam.y += (after[1] - before[1]) * cam.scale;
    updateZoomHud();
  }

  /* ---------- 画布尺寸（DPR 适配，投影到 1080p 也清晰） ---------- */
  function resize() {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", function () { resize(); });
  resize();
  fitCamera();

  /* ---------- 交互状态 ---------- */
  var state = {
    hover: null,        // 悬停节点
    selected: null,     // 选中节点（概念卡片）
    dragNode: null,     // 正在拖拽的节点
    panning: false,
    lastX: 0, lastY: 0,
    filter: "all",      // 模块筛选
    query: "",          // 搜索词
    ripples: []         // 搜索/跳转聚焦涟漪（世界坐标 + 起始时刻）
  };

  function canvasPos(e) {
    var rect = canvas.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top];
  }

  function nodeAt(sx, sy) {
    // 从后往前找（后画的在上层），命中半径适当放大便于点击
    for (var i = nodes.length - 1; i >= 0; i--) {
      var n = nodes[i];
      var p = worldToScreen(n.x, n.y);
      var dx = sx - p[0], dy = sy - p[1];
      var hit = n.r * cam.scale + 8;
      if (dx * dx + dy * dy <= hit * hit) return n;
    }
    return null;
  }

  canvas.addEventListener("mousedown", function (e) {
    var pos = canvasPos(e);
    var n = nodeAt(pos[0], pos[1]);
    canvas.classList.add("dragging");
    if (n) {
      state.dragNode = n;
      n.vx = 0; n.vy = 0; // 拖拽时钉住，不受力
    } else {
      state.panning = true;
    }
    state.lastX = pos[0]; state.lastY = pos[1];
  });
  window.addEventListener("mousemove", function (e) {
    var pos = canvasPos(e);
    if (state.dragNode) {
      var w = screenToWorld(pos[0], pos[1]);
      state.dragNode.x = w[0]; state.dragNode.y = w[1];
      state.dragNode.vx = 0; state.dragNode.vy = 0;
    } else if (state.panning) {
      cam.x += pos[0] - state.lastX;
      cam.y += pos[1] - state.lastY;
      state.lastX = pos[0]; state.lastY = pos[1];
    } else {
      state.hover = nodeAt(pos[0], pos[1]);
      canvas.style.cursor = state.hover ? "pointer" : "";
    }
  });
  window.addEventListener("mouseup", function (e) {
    canvas.classList.remove("dragging");
    // 位移小于 4px 视为点击：节点 → 打开概念卡片；空白 → 关闭卡片
    var moved = Math.abs(e.clientX - downX) + Math.abs(e.clientY - downY);
    if (moved < 4) {
      var pos = canvasPos(e);
      var n = nodeAt(pos[0], pos[1]);
      if (n) selectNode(n); else closeCard();
    }
    state.dragNode = null;
    state.panning = false;
  });
  var downX = 0, downY = 0;
  canvas.addEventListener("mousedown", function (e) { downX = e.clientX; downY = e.clientY; });

  // 滚轮缩放：以光标位置为锚点
  canvas.addEventListener("wheel", function (e) {
    e.preventDefault();
    var pos = canvasPos(e);
    zoomAt(pos[0], pos[1], e.deltaY > 0 ? 0.9 : 1.1);
  }, { passive: false });

  /* ---------- 缩放 HUD（右下角 −/＋/复位） ---------- */
  var zoomLevel = document.getElementById("gz-level");
  function updateZoomHud() {
    if (zoomLevel) zoomLevel.textContent = Math.round(cam.scale * 100) + "%";
  }
  function bindZoom(id, fn) {
    var b = document.getElementById(id);
    if (b) b.addEventListener("click", fn);
  }
  bindZoom("gz-out", function () { zoomAt(canvas.clientWidth / 2, canvas.clientHeight / 2, 0.8); });
  bindZoom("gz-in", function () { zoomAt(canvas.clientWidth / 2, canvas.clientHeight / 2, 1.25); });
  bindZoom("gz-reset", function () { fitCamera(); });
  updateZoomHud();

  /* ---------- 搜索与筛选 ---------- */
  var searchInput = document.getElementById("graph-search-input");
  searchInput.addEventListener("input", function () {
    state.query = searchInput.value.trim().toLowerCase();
    applyFilters();
  });
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      var hit = nodes.find(function (n) { return n.match; });
      if (hit) focusNode(hit, true);
    }
  });

  // 模块筛选 chips（带模块色小圆点，图谱配色与图例一一对应）
  var filtersBox = document.getElementById("graph-filters");
  var chips = [{ id: "all", en: "All", zh: "全部" }];
  Object.keys(DATA.modules).forEach(function (m) {
    chips.push({ id: m, en: DATA.modules[m].en, zh: DATA.modules[m].zh });
  });
  chips.forEach(function (c) {
    var btn = document.createElement("button");
    btn.className = "filter-chip" + (c.id === "all" ? " is-active" : "");
    var dotColor = c.id === "all" ? "var(--ink-dim)" : MODULE_COLORS[c.id];
    btn.innerHTML = '<i class="chip-dot" style="background:' + dotColor + '"></i>' +
      c.en + "<em>" + c.zh + "</em>";
    btn.addEventListener("click", function () {
      state.filter = c.id;
      filtersBox.querySelectorAll(".filter-chip").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      applyFilters();
    });
    filtersBox.appendChild(btn);
  });

  // 关系图例
  var legendBox = document.getElementById("graph-legend");
  Object.keys(EDGE_STYLES).forEach(function (t) {
    var st = EDGE_STYLES[t];
    var item = document.createElement("span");
    item.className = "legend-item";
    var lineCls = st.double ? "double" : (st.dash.length ? "dashed" : "");
    item.innerHTML = '<span class="legend-line ' + lineCls + '" style="border-color:' + st.color + '"></span>' + st.label;
    legendBox.appendChild(item);
  });

  function applyFilters() {
    nodes.forEach(function (n) {
      var inModule = state.filter === "all" || n.data.module === state.filter;
      var q = state.query;
      var hit = !q || n.data.en.toLowerCase().indexOf(q) >= 0 || n.data.zh.indexOf(q) >= 0;
      n.match = !!q && hit;
      n.dimmed = !inModule || (q && !hit);
    });
  }

  /* ---------- 概念卡片 ---------- */
  var card = document.getElementById("concept-card");
  function selectNode(n) {
    state.selected = n;
    card.hidden = false;
    document.getElementById("card-module").textContent =
      DATA.modules[n.data.module].en.toUpperCase() + " · " + DATA.modules[n.data.module].zh;
    document.getElementById("card-title").textContent = n.data.en;
    document.getElementById("card-zh").textContent = n.data.zh;
    document.getElementById("card-def-en").textContent = n.data.def_en;
    document.getElementById("card-def-zh").textContent = n.data.def_zh;
    document.getElementById("card-example").textContent = n.data.example || "—";
    // 上位概念（sup_en · sup_zh）与审核状态徽章
    document.getElementById("card-sup").textContent =
      n.data.sup_en ? n.data.sup_en + " · " + (n.data.sup_zh || "") : "";
    var statusEl = document.getElementById("card-status");
    statusEl.textContent = n.data.status || "";
    statusEl.hidden = !n.data.status;
    // 争议与限制：有才显示（老师规格要求定义/理论/实例/争议分区存储）
    var debateBlock = document.getElementById("card-block-debate");
    if (n.data.debate_zh) {
      debateBlock.hidden = false;
      document.getElementById("card-debate").textContent = n.data.debate_zh;
    } else {
      debateBlock.hidden = true;
    }
    document.getElementById("card-source").textContent = n.data.source || "—";
    // 相关概念：点击 chips 跳转（对立关系用品红强调）
    var rel = document.getElementById("card-related");
    rel.innerHTML = "";
    (adjacency[n.data.id] || []).forEach(function (a) {
      var chip = document.createElement("button");
      chip.className = "related-chip" + (a.type === "opposition" ? " opp" : "");
      chip.innerHTML = a.node.data.en + "<em>" + a.node.data.zh + "</em>";
      chip.title = EDGE_STYLES[a.type] ? EDGE_STYLES[a.type].label : a.type;
      chip.addEventListener("click", function () { focusNode(a.node, true); });
      rel.appendChild(chip);
    });
  }
  function closeCard() { state.selected = null; card.hidden = true; }
  document.getElementById("card-close").addEventListener("click", closeCard);

  // 跳转聚焦：相机平滑对准节点、选中并激起一圈涟漪
  var focusAnim = null;
  function focusNode(n, open) {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    var targetScale = Math.max(cam.scale, 1.1);
    var from = { x: cam.x, y: cam.y, scale: cam.scale };
    var to = {
      scale: targetScale,
      x: w / 2 - n.x * targetScale,
      y: h / 2 - n.y * targetScale
    };
    var t0 = performance.now();
    if (focusAnim) cancelAnimationFrame(focusAnim);
    (function step(t) {
      var k = Math.min(1, (t - t0) / 450);
      var e = 1 - Math.pow(1 - k, 3); // easeOutCubic
      cam.x = from.x + (to.x - from.x) * e;
      cam.y = from.y + (to.y - from.y) * e;
      cam.scale = from.scale + (to.scale - from.scale) * e;
      if (k < 1) focusAnim = requestAnimationFrame(step);
      else {
        updateZoomHud();
        state.ripples.push({ x: n.x, y: n.y, t0: performance.now() }); // 聚焦涟漪
      }
    })(t0);
    if (open) selectNode(n);
  }

  /* ---------- 入场动画：滚入视口后只播一次 ---------- */
  var enterT0 = -1; // 入场起始时刻；-1 = 尚未入场（先画静态全景，避免空白）
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && enterT0 < 0) {
          enterT0 = performance.now();
          io.disconnect();
        }
      });
    }, { threshold: 0.25 });
    io.observe(canvas);
  } else {
    enterT0 = performance.now();
  }

  /* ---------- 轻力导向：回家弹簧 + 近距斥力 ----------
     手工分区保证首屏结构清晰；力学只做微调——
     节点不重叠、拖拽后缓缓回弹归位，图谱「活而不乱」。 */
  function physics() {
    var i, j, n, m;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      if (n === state.dragNode) continue;
      n.vx += (n.hx - n.x) * 0.012; // 回家弹簧
      n.vy += (n.hy - n.y) * 0.012;
    }
    for (i = 0; i < nodes.length; i++) {
      for (j = i + 1; j < nodes.length; j++) {
        n = nodes[i]; m = nodes[j];
        var dx = m.x - n.x, dy = m.y - n.y;
        var dist = Math.hypot(dx, dy) || 1;
        var minD = n.r + m.r + 54; // 半径之外留出标签呼吸位
        if (dist < minD) {
          var f = (minD - dist) / minD * 0.28;
          var ux = dx / dist, uy = dy / dist;
          if (n !== state.dragNode) { n.vx -= ux * f; n.vy -= uy * f; }
          if (m !== state.dragNode) { m.vx += ux * f; m.vy += uy * f; }
        }
      }
    }
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      if (n === state.dragNode) continue;
      n.vx *= 0.82; n.vy *= 0.82;             // 阻尼
      n.vx = Math.max(-3, Math.min(3, n.vx)); // 限速，防抖
      n.vy = Math.max(-3, Math.min(3, n.vy));
      n.x += n.vx; n.y += n.vy;
    }
  }

  /* ---------- 标签 LOD ----------
     三级显隐：缩得远只留核心与焦点标签；中景显示全部英文；
     拉近后补中文宋体小字。字号随缩放自适应，全部带深色背板。 */
  function labelLevel(n) {
    var focused = state.hover === n || state.selected === n || n.match;
    if (cam.scale < 0.5) return (n.data.module === "core" || focused) ? 1 : 0;
    if (cam.scale < 0.85) return focused ? 2 : 1; // 全景只留英文，焦点补中文
    return 2; // EN + ZH
  }
  function drawLabel(n, p, r, level, emphasized, dx, dy) {
    dx = dx || 0; dy = dy || 0;
    var zoomK = Math.min(cam.scale / 0.8, 1.35); // 字号自适应系数
    var enPx = Math.max(11.5, Math.min(16, 13.5 * zoomK));
    var zhPx = Math.max(9.5, Math.min(12.5, 11 * zoomK));
    ctx.textAlign = "center";
    ctx.font = (n.data.module === "core" ? "600 " : "") + enPx + "px Georgia, serif";
    var enW = ctx.measureText(n.data.en).width;
    var zhW = 0;
    if (level === 2) {
      ctx.font = zhPx + 'px "STSong","SimSun",serif';
      zhW = ctx.measureText(n.data.zh).width;
    }
    var boxW = Math.max(enW, zhW) + 16;
    var lineH = enPx + 5;
    var boxH = lineH + (level === 2 ? zhPx + 7 : 0) + 8;
    var bx = p[0] - boxW / 2 + dx, by = p[1] + r + 7 + dy;
    // 避让位移较大时画细引导线，保持标签与节点的归属关系
    if (Math.abs(dx) + Math.abs(dy) > 14) {
      ctx.beginPath();
      ctx.moveTo(p[0], p[1] + r + 2);
      ctx.lineTo(bx + boxW / 2, by);
      ctx.strokeStyle = "rgba(242,237,227,.18)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    // 背板：深底圆角块，压住穿过的边线；强调态描模块色细边
    pillPath(bx, by, boxW, boxH, 7);
    ctx.fillStyle = emphasized ? "rgba(26,26,36,.92)" : "rgba(11,11,16,.78)";
    ctx.fill();
    if (emphasized) {
      ctx.strokeStyle = withAlpha(MODULE_COLORS[n.data.module] || COLORS.ink, 0.55);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.font = (n.data.module === "core" ? "600 " : "") + enPx + "px Georgia, serif";
    ctx.fillStyle = COLORS.ink;
    ctx.fillText(n.data.en, p[0] + dx, by + 6 + enPx * 0.78);
    if (level === 2) {
      ctx.font = zhPx + 'px "STSong","SimSun",serif';
      ctx.fillStyle = COLORS.inkFaint;
      ctx.fillText(n.data.zh, p[0] + dx, by + 6 + lineH + zhPx * 0.78);
    }
  }

  // 只测量不绘制：返回标签基础矩形（屏幕坐标），供碰撞避让使用
  function measureLabelBox(n, p, r, level) {
    var zoomK = Math.min(cam.scale / 0.8, 1.35);
    var enPx = Math.max(11.5, Math.min(16, 13.5 * zoomK));
    var zhPx = Math.max(9.5, Math.min(12.5, 11 * zoomK));
    ctx.textAlign = "center";
    ctx.font = (n.data.module === "core" ? "600 " : "") + enPx + "px Georgia, serif";
    var enW = ctx.measureText(n.data.en).width;
    var zhW = 0;
    if (level === 2) {
      ctx.font = zhPx + 'px "STSong","SimSun",serif';
      zhW = ctx.measureText(n.data.zh).width;
    }
    var boxW = Math.max(enW, zhW) + 16;
    var lineH = enPx + 5;
    var boxH = lineH + (level === 2 ? zhPx + 7 : 0) + 8;
    return { x: p[0] - boxW / 2, y: p[1] + r + 7, w: boxW, h: boxH };
  }

  /* ---------- 标签碰撞避让 ----------
     每帧先测量全部可见标签的矩形，做几轮松弛把重叠者推开
     （章节/关联边注为固定障碍），偏移量逐帧平滑收敛，不抖动。 */
  var labelOffsets = {}; // nodeId -> {x, y} 平滑后的屏幕偏移
  function rectsOverlap(a, b) {
    var ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    var oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    return (ox > 0 && oy > 0) ? [ox, oy] : null;
  }
  function relaxLabels(lbls, obstacles) {
    var iter, i, j, ov;
    for (iter = 0; iter < 7; iter++) {
      for (i = 0; i < lbls.length; i++) {
        for (j = i + 1; j < lbls.length; j++) {
          var A = lbls[i], B = lbls[j];
          ov = rectsOverlap(A.box, B.box);
          if (!ov) continue;
          // 核心/焦点标签少动，普通标签多动
          var wA = (A.n.data.module === "core" || A.emph) ? 0.3 : 1;
          var wB = (B.n.data.module === "core" || B.emph) ? 0.3 : 1;
          var tot = wA + wB;
          if (ov[0] < ov[1]) {
            var dirX = (A.box.x + A.box.w / 2) < (B.box.x + B.box.w / 2) ? -1 : 1;
            A.box.x += dirX * ov[0] / tot * wA; B.box.x -= dirX * ov[0] / tot * wB;
          } else {
            var dirY = (A.box.y + A.box.h / 2) < (B.box.y + B.box.h / 2) ? -1 : 1;
            A.box.y += dirY * ov[1] / tot * wA; B.box.y -= dirY * ov[1] / tot * wB;
          }
        }
        for (j = 0; j < obstacles.length; j++) {
          var L = lbls[i], O = obstacles[j];
          ov = rectsOverlap(L.box, O);
          if (!ov) continue;
          if (ov[0] < ov[1]) {
            var dX = (L.box.x + L.box.w / 2) < (O.x + O.w / 2) ? -1 : 1;
            L.box.x += dX * ov[0];
          } else {
            var dY = (L.box.y + L.box.h / 2) < (O.y + O.h / 2) ? -1 : 1;
            L.box.y += dY * ov[1];
          }
        }
      }
    }
  }

  /* ---------- 渲染主循环 ---------- */
  var time = 0;
  function draw() {
    time += 1 / 60;
    var now = performance.now();
    physics();
    var w = canvas.clientWidth, h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    var i, e, st, p1, p2;
    // 入场进度（未触发时按已完成处理，直接画全景）
    var entered = enterT0 >= 0 ? now - enterT0 : 1e9;

    // hover/selected 焦点集合：用于邻里高亮、其余压暗
    var focusNodeRef = state.hover || state.selected;
    var focusNeighbors = null;
    if (focusNodeRef) {
      focusNeighbors = {};
      (neighborOf[focusNodeRef.data.id] || []).forEach(function (nb) { focusNeighbors[nb.data.id] = true; });
      focusNeighbors[focusNodeRef.data.id] = true;
    }
    var noteBoxes = []; // 本帧边注占据的屏幕矩形，作为标签避让的固定障碍
    var noteJobs = [];  // 待绘制的边注（节点画完后统一画，避免被节点盖住）

    // ---- 边 ----
    for (i = 0; i < edges.length; i++) {
      e = edges[i];
      st = EDGE_STYLES[e.type];
      // 边生长：从 source 向 target 渐次画出
      var g = clamp01((entered - e.enterDelay) / 420);
      if (g <= 0) continue;
      var dim = e.source.dimmed || e.target.dimmed;
      var active = focusNodeRef && (e.source === focusNodeRef || e.target === focusNodeRef);
      ctx.save();
      ctx.globalAlpha = dim ? 0.06 : (focusNodeRef ? (active ? 1 : 0.16) : 0.8);
      ctx.strokeStyle = st.color;
      ctx.lineWidth = st.width * (active ? 1.7 : 1);
      ctx.lineCap = "round";
      ctx.setLineDash(st.dash);
      if (e.type === "opposition") {
        // 对立关系：品红双线 + 流动虚线偏移，保证「一眼可辨」
        ctx.lineDashOffset = -time * 18;
      }
      p1 = worldToScreen(e.source.x, e.source.y);
      p2 = worldToScreen(e.target.x, e.target.y);
      var gx = p1[0] + (p2[0] - p1[0]) * g, gy = p1[1] + (p2[1] - p1[1]) * g;
      if (st.double) {
        // 双线：沿法向量偏移两条平行线
        var dx = gx - p1[0], dy = gy - p1[1];
        var len = Math.hypot(dx, dy) || 1;
        var nx = -dy / len * 3.2, ny = dx / len * 3.2;
        ctx.beginPath(); ctx.moveTo(p1[0] + nx, p1[1] + ny); ctx.lineTo(gx + nx, gy + ny); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(p1[0] - nx, p1[1] - ny); ctx.lineTo(gx - nx, gy - ny); ctx.stroke();
      } else {
        ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(gx, gy); ctx.stroke();
      }
      if (g < 1) { ctx.restore(); continue; } // 未生长完的边不画徽章/箭头/注记

      // 指向章节：箭头 + 背板注记
      if (st.arrow) {
        var ang = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
        var ax = p2[0] - Math.cos(ang) * (e.target.r * cam.scale + 9);
        var ay = p2[1] - Math.sin(ang) * (e.target.r * cam.scale + 9);
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - 9 * Math.cos(ang - .45), ay - 9 * Math.sin(ang - .45));
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - 9 * Math.cos(ang + .45), ay - 9 * Math.sin(ang + .45));
        ctx.stroke();
      }
      if (e.note && !dim && cam.scale > 0.4) {
        // 延迟到节点之后绘制，避免注记被节点圆圈盖住；矩形稍后登记给标签避让
        noteJobs.push({
          text: e.note, type: e.type,
          x: (p1[0] + p2[0]) / 2, y: (p1[1] + p2[1]) / 2 - 8,
          alpha: focusNodeRef ? (active ? 1 : 0.16) : 0.8
        });
      }
      ctx.restore();
    }

    // ---- 对立边中点 VS 徽章（对立语义的最高优先级记号） ----
    if (cam.scale > 0.4) {
      for (i = 0; i < edges.length; i++) {
        e = edges[i];
        if (e.type !== "opposition") continue;
        if (clamp01((entered - e.enterDelay) / 420) < 1) continue;
        var dimVs = e.source.dimmed || e.target.dimmed;
        p1 = worldToScreen(e.source.x, e.source.y);
        p2 = worldToScreen(e.target.x, e.target.y);
        var mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2;
        ctx.save();
        ctx.globalAlpha = dimVs ? 0.08 : (focusNodeRef && e.source !== focusNodeRef && e.target !== focusNodeRef ? 0.3 : 1);
        pillPath(mx - 14, my - 9, 28, 18, 9);
        ctx.fillStyle = "rgba(11,11,16,.9)";
        ctx.fill();
        ctx.strokeStyle = COLORS.opp;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = COLORS.opp;
        ctx.font = "600 9.5px 'Cascadia Code', Consolas, monospace";
        ctx.textAlign = "center";
        ctx.fillText("VS", mx, my + 3.5);
        ctx.restore();
      }
    }

    // ---- 节点 ----
    for (i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      // 待机浮动：极小幅正弦漂移，让图谱「活着」但不影响阅读
      var floatY = (state.dragNode === n) ? 0 : Math.sin(time * 0.8 + n.phase) * 2.2;
      var p = worldToScreen(n.x, n.y + floatY);
      var r = n.r * cam.scale;
      var color = MODULE_COLORS[n.data.module] || COLORS.ink;
      var isHover = state.hover === n, isSel = state.selected === n;
      // 入场级联：spring 过冲放大 → 归位
      var ep = clamp01((entered - n.enterDelay) / 520);
      if (ep <= 0) continue;
      var pop = ep < 1 ? easeOutBack(ep) : 1;

      ctx.save();
      var inFocus = !focusNodeRef || focusNeighbors[n.data.id];
      ctx.globalAlpha = (n.dimmed ? 0.12 : (inFocus ? 1 : 0.32)) * Math.min(1, ep * 1.6);

      // 搜索命中：暖金脉冲光环
      if (n.match) {
        var pulse = 6 + Math.sin(time * 4) * 3;
        ctx.beginPath();
        ctx.arc(p[0], p[1], r + 9 + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(240,201,107,.55)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      // core 常驻光晕：深空里的「恒星」
      if (n.data.module === "core") {
        var glow = ctx.createRadialGradient(p[0], p[1], r * 0.4, p[0], p[1], r * 2.4);
        glow.addColorStop(0, withAlpha(color, 0.16));
        glow.addColorStop(1, withAlpha(color, 0));
        ctx.beginPath();
        ctx.arc(p[0], p[1], r * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
      // 悬停/选中：呼吸光晕（shadow）+ 双层描边
      if (isHover || isSel) {
        ctx.shadowColor = isSel ? COLORS.accent : "rgba(242,237,227,.6)";
        ctx.shadowBlur = 16 + (isSel ? Math.sin(time * 3) * 5 : 0);
      }

      var rr = r * pop;
      // 节点本体：深底 + 模块色浅 tint + 模块色描边
      ctx.beginPath();
      if (n.data.module === "people") {
        // 人物：菱形（理论家不是概念，形态上先区分出来）
        ctx.moveTo(p[0], p[1] - rr);
        ctx.lineTo(p[0] + rr, p[1]);
        ctx.lineTo(p[0], p[1] + rr);
        ctx.lineTo(p[0] - rr, p[1]);
        ctx.closePath();
      } else {
        ctx.arc(p[0], p[1], rr, 0, Math.PI * 2);
      }
      ctx.fillStyle = COLORS.bgSoft;
      ctx.fill();
      ctx.shadowBlur = 0; // 光晕只给轮廓一次，内层不再叠
      ctx.fillStyle = withAlpha(color, isSel ? 0.22 : (isHover ? 0.16 : 0.09));
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = n.data.module === "core" ? 2.4 : (isSel || isHover ? 2 : 1.4);
      ctx.stroke();
      // distinctions：品红虚线外环——模块语义就是「对立」，先给形态暗示
      if (n.data.module === "distinctions") {
        ctx.beginPath();
        ctx.arc(p[0], p[1], rr + 5, 0, Math.PI * 2);
        ctx.setLineDash([3, 4]);
        ctx.lineDashOffset = -time * 8;
        ctx.strokeStyle = withAlpha(COLORS.opp, 0.6);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }
      // core：第二道内环，撑起层级
      if (n.data.module === "core") {
        ctx.beginPath();
        ctx.arc(p[0], p[1], Math.max(2, rr - 5), 0, Math.PI * 2);
        ctx.strokeStyle = withAlpha(color, 0.45);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // 选中态：暖金外环（与 hover 的提亮区分开）
      if (isSel) {
        ctx.beginPath();
        ctx.arc(p[0], p[1], rr + 8, 0, Math.PI * 2);
        ctx.strokeStyle = COLORS.accent;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else if (isHover) {
        ctx.beginPath();
        ctx.arc(p[0], p[1], rr + 6, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(242,237,227,.45)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      // 中心点
      ctx.beginPath();
      ctx.arc(p[0], p[1], Math.max(2.5, rr * 0.16), 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    // ---- 边注（延迟到节点之后绘制：不再被节点圆圈盖住，仍排在标签之前） ----
    for (i = 0; i < noteJobs.length; i++) {
      var nj = noteJobs[i];
      // 注记配色随关系类型：章节=紫、关联=灰、前沿之桥=青
      var noteColor = nj.type === "chapter" ? COLORS.violet : (nj.type === "association" ? COLORS.inkFaint : COLORS.cyan);
      var noteStroke = nj.type === "chapter" ? withAlpha(COLORS.violet, 0.4)
        : (nj.type === "association" ? "rgba(242,237,227,.22)" : withAlpha(COLORS.cyan, 0.4));
      ctx.save();
      ctx.globalAlpha = nj.alpha;
      ctx.setLineDash([]);
      ctx.font = "10.5px Consolas, monospace";
      var nw2 = ctx.measureText(nj.text).width;
      pillPath(nj.x - nw2 / 2 - 8, nj.y - 10, nw2 + 16, 18, 9);
      ctx.fillStyle = "rgba(11,11,16,.88)";
      ctx.fill();
      ctx.strokeStyle = noteStroke;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = noteColor;
      ctx.textAlign = "center";
      ctx.fillText(nj.text, nj.x, nj.y + 3.5);
      ctx.restore();
      noteBoxes.push({ x: nj.x - nw2 / 2 - 8, y: nj.y - 10, w: nw2 + 16, h: 18 });
    }

    // ---- 聚焦涟漪（搜索回车 / 相关概念跳转的落点提示） ----
    for (i = state.ripples.length - 1; i >= 0; i--) {
      var rp = state.ripples[i];
      var k = (now - rp.t0) / 900;
      if (k >= 1) { state.ripples.splice(i, 1); continue; }
      var rpP = worldToScreen(rp.x, rp.y);
      ctx.save();
      ctx.globalAlpha = (1 - k) * 0.8;
      ctx.beginPath();
      ctx.arc(rpP[0], rpP[1], (20 + k * 70) * cam.scale, 0, Math.PI * 2);
      ctx.strokeStyle = COLORS.accent;
      ctx.lineWidth = 2 * (1 - k) + 0.5;
      ctx.stroke();
      ctx.restore();
    }

    // ---- 标签（最后画，压在边之上；背板防遮挡 + 碰撞避让） ----
    // 第一遍：收集所有可见标签并测量基础矩形
    var lbls = [];
    for (i = 0; i < nodes.length; i++) {
      var nn = nodes[i];
      var lvl = labelLevel(nn);
      if (!lvl || nn.dimmed) continue;
      var epr = clamp01((entered - nn.enterDelay) / 520);
      if (epr <= 0) continue;
      var flY = (state.dragNode === nn) ? 0 : Math.sin(time * 0.8 + nn.phase) * 2.2;
      var pp = worldToScreen(nn.x, nn.y + flY);
      lbls.push({
        n: nn, lvl: lvl, p: pp, r: nn.r * cam.scale, epr: epr,
        emph: state.hover === nn || state.selected === nn || nn.match
      });
    }
    for (i = 0; i < lbls.length; i++) {
      lbls[i].base = measureLabelBox(lbls[i].n, lbls[i].p, lbls[i].r, lbls[i].lvl);
      lbls[i].box = { x: lbls[i].base.x, y: lbls[i].base.y, w: lbls[i].base.w, h: lbls[i].base.h };
    }
    relaxLabels(lbls, noteBoxes);
    // 第二遍：平滑收敛偏移后绘制
    for (i = 0; i < lbls.length; i++) {
      var L = lbls[i];
      var off = labelOffsets[L.n.data.id] || (labelOffsets[L.n.data.id] = { x: 0, y: 0 });
      var tx = Math.max(-70, Math.min(70, L.box.x - L.base.x));
      var ty = Math.max(-70, Math.min(70, L.box.y - L.base.y));
      off.x += (tx - off.x) * 0.3;
      off.y += (ty - off.y) * 0.3;
      var inFocusL = !focusNodeRef || focusNeighbors[L.n.data.id];
      ctx.save();
      ctx.globalAlpha = (inFocusL ? 1 : 0.35) * Math.min(1, L.epr * 1.6);
      drawLabel(L.n, L.p, L.r, L.lvl, L.emph, off.x, off.y);
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
