/* ============================================================
   research.js — Part 3 从总论到前沿（研究板块）
   业务背景：署名 Cran May（杭州电子科技大学 JWorld NLPark）的研究展示。
   - 语义流形假说：文案 + SVG 流形示意图（高维流形 → 低维投影）
   - SFGS 架构图解：SVG 流程图（流规划器 → 能量引导生成器 → 能量判别器
     → 朗之万动力学推理回路），公式用 HTML 手写排版，不用外部渲染库
   - 维度投影小互动：Canvas 实时 3D 点云流形 → 2D 投影，可拖动旋转、
     切换投影模式，展示低维投影的信息损失与正交无投影
   ============================================================ */
(function () {
  "use strict";

  var R = window.LING_DATA.script.research;
  var COLORS = {
    ink: "#F2EDE3", inkDim: "rgba(242,237,227,.58)", inkFaint: "rgba(242,237,227,.32)",
    accent: "#F0C96B", cyan: "#7FD8E8", opp: "#FF5C7A", violet: "#B79CFF", line: "rgba(242,237,227,.14)"
  };

  /* ---------- 文案注入（单一数据源：content/script.yaml） ---------- */
  document.getElementById("hypo-text-en").textContent = R.hypothesis.text_en;
  document.getElementById("hypo-text-zh").textContent = R.hypothesis.text_zh;
  document.getElementById("proj-text-en").textContent = R.projection.text_en;
  document.getElementById("proj-text-zh").textContent = R.projection.text_zh;
  document.getElementById("closing-en").textContent = R.closing_en;
  document.getElementById("closing-zh").textContent = R.closing_zh;
  document.getElementById("sig-en").textContent = R.author_en;
  document.getElementById("sig-zh").textContent = R.author_zh;

  /* ============================================================
     1. 语义流形示意图（SVG）：一张弯曲流形 + 其上语义点 + 向下投影
     ============================================================ */
  (function drawManifoldFig() {
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 1000 300");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "A curved semantic manifold projected onto a flat plane");

    function el(tag, attrs) {
      var n = document.createElementNS(NS, tag);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    }

    // 流形曲面：几条正弦曲线叠出网格感
    for (var row = 0; row < 6; row++) {
      var d = "M 60 " + (70 + row * 26) + " ";
      for (var x = 60; x <= 640; x += 16) {
        var y = 70 + row * 26 + Math.sin(x / 90 + row * 0.7) * 22 * Math.sin(x / 300);
        d += "L " + x + " " + y.toFixed(1) + " ";
      }
      svg.appendChild(el("path", {
        d: d, fill: "none", stroke: row === 2 ? COLORS.accent : COLORS.line,
        "stroke-width": row === 2 ? 1.6 : 1
      }));
    }
    // 流形上的语义点（labels: 词义栖居在流形上）
    var words = [["dog", 150, 96], ["cat", 210, 82], ["wolf", 268, 100], ["king", 430, 118], ["queen", 492, 100], ["apple", 560, 150]];
    words.forEach(function (w, i) {
      var yy = w[2] + Math.sin(w[1] / 90 + 1.4) * 22 * Math.sin(w[1] / 300);
      svg.appendChild(el("circle", { cx: w[1], cy: yy, r: 3.5, fill: i < 3 ? COLORS.cyan : COLORS.accent }));
      var t = el("text", { x: w[1], y: yy - 10, "text-anchor": "middle", fill: COLORS.inkDim, "font-size": 13, "font-family": "Georgia, serif", "font-style": "italic" });
      t.textContent = w[0];
      svg.appendChild(t);
    });
    // 投影箭头 + 下方平面（低维接收面）
    svg.appendChild(el("path", { d: "M 350 175 L 350 232", stroke: COLORS.inkFaint, "stroke-width": 1.2, fill: "none", "stroke-dasharray": "4 4" }));
    svg.appendChild(el("path", { d: "M 344 226 L 350 234 L 356 226", stroke: COLORS.inkFaint, "stroke-width": 1.2, fill: "none" }));
    var cap = el("text", { x: 366, y: 212, fill: COLORS.inkFaint, "font-size": 11, "font-family": "Consolas, monospace" });
    cap.textContent = "project ↓ 投影";
    svg.appendChild(cap);
    svg.appendChild(el("line", { x1: 60, y1: 252, x2: 640, y2: 252, stroke: COLORS.inkDim, "stroke-width": 1.2 }));
    // 平面上的投影点：间距被压扁，示意信息损失
    [[150, 1], [210, 1], [268, 1], [430, 0], [492, 0], [560, 1]].forEach(function (pw) {
      svg.appendChild(el("circle", { cx: pw[0], cy: 252, r: 3, fill: pw[1] ? COLORS.cyan : COLORS.accent, opacity: 0.55 }));
    });
    var note = el("text", { x: 60, y: 282, fill: COLORS.inkFaint, "font-size": 12.5, "font-family": "STSong, SimSun, serif" });
    note.textContent = "意义栖居于高维流形；投到平面上，相对位置被挤压、折叠——本征信息已经丢失。";
    svg.appendChild(note);

    // 右侧批注
    var side = el("text", { x: 700, y: 120, fill: COLORS.ink, "font-size": 16, "font-family": "Georgia, serif", "font-style": "italic" });
    side.textContent = "meaning lives on a manifold";
    svg.appendChild(side);
    var side2 = el("text", { x: 700, y: 144, fill: COLORS.inkFaint, "font-size": 13, "font-family": "STSong, SimSun, serif" });
    side2.textContent = "不是一袋离散符号，而是一张连续曲面";
    svg.appendChild(side2);

    document.getElementById("manifold-fig").appendChild(svg);
  })();

  /* ============================================================
     2. SFGS 架构 SVG 图解
     数据流：Context → Flow Planner →（语义河床）→ Generator → Text
             Energy Meter 评分回路 + Langevin 迭代下降
     ============================================================ */
  (function drawSfgsDiagram() {
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 1000 360");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "SFGS architecture: flow planner, energy-guided generator, energy meter, Langevin inference");

    function el(tag, attrs) {
      var n = document.createElementNS(NS, tag);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    }
    function text(x, y, str, opts) {
      var t = el("text", Object.assign({ x: x, y: y }, opts || {}));
      t.textContent = str;
      return t;
    }
    function box(x, y, w, h, title, zh, color) {
      var g = el("g", {});
      g.appendChild(el("rect", { x: x, y: y, width: w, height: h, rx: 12, fill: "#0B0B10", stroke: color, "stroke-width": 1.3 }));
      g.appendChild(text(x + w / 2, y + 26, title, { "text-anchor": "middle", fill: COLORS.ink, "font-size": 15, "font-family": "Georgia, serif" }));
      g.appendChild(text(x + w / 2, y + 44, zh, { "text-anchor": "middle", fill: COLORS.inkFaint, "font-size": 13, "font-family": "STSong, SimSun, serif" }));
      return g;
    }
    function arrow(x1, y1, x2, y2, color, dash) {
      var g = el("g", {});
      var ang = Math.atan2(y2 - y1, x2 - x1);
      g.appendChild(el("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: color, "stroke-width": 1.2, "stroke-dasharray": dash || "none" }));
      g.appendChild(el("path", {
        d: "M " + x2 + " " + y2 + " L " + (x2 - 8 * Math.cos(ang - .5)) + " " + (y2 - 8 * Math.sin(ang - .5)) +
           " M " + x2 + " " + y2 + " L " + (x2 - 8 * Math.cos(ang + .5)) + " " + (y2 - 8 * Math.sin(ang + .5)),
        stroke: color, "stroke-width": 1.2, fill: "none"
      }));
      return g;
    }

    // 输入
    svg.appendChild(text(50, 62, "Context x_ctx", { fill: COLORS.inkDim, "font-size": 14, "font-family": "Georgia, serif", "font-style": "italic" }));
    svg.appendChild(text(50, 80, "上下文与目标", { fill: COLORS.inkFaint, "font-size": 11.5, "font-family": "STSong, SimSun, serif" }));

    // A 流规划器
    svg.appendChild(box(180, 36, 210, 64, "A · Flow Planner", "流规划器 · Neural SDE", COLORS.accent));
    svg.appendChild(arrow(140, 66, 178, 66, COLORS.inkDim));

    // 语义河床：正弦河道曲线
    var river = "M 410 66 ";
    for (var x = 410; x <= 620; x += 10) river += "L " + x + " " + (66 + Math.sin((x - 410) / 34) * 12).toFixed(1) + " ";
    svg.appendChild(el("path", { d: river, fill: "none", stroke: COLORS.cyan, "stroke-width": 1.6 }));
    svg.appendChild(text(508, 36, "semantic riverbed F_t", { "text-anchor": "middle", fill: COLORS.cyan, "font-size": 12, "font-family": "Georgia, serif", "font-style": "italic" }));
    svg.appendChild(arrow(392, 66, 408, 66, COLORS.inkDim));

    // B 能量引导生成器
    svg.appendChild(box(650, 36, 220, 64, "B · Energy-Guided Generator", "能量引导生成器 · Transformer", COLORS.accent));
    svg.appendChild(arrow(622, 66, 648, 66, COLORS.inkDim));

    // 输出文本
    svg.appendChild(arrow(872, 66, 920, 66, COLORS.inkDim));
    svg.appendChild(text(928, 62, "text", { fill: COLORS.ink, "font-size": 14, "font-family": "Georgia, serif", "font-style": "italic" }));
    svg.appendChild(text(928, 78, "离散文本序列", { fill: COLORS.inkFaint, "font-size": 11.5, "font-family": "STSong, SimSun, serif" }));

    // C 能量判别器（下方，评分回路）
    svg.appendChild(box(420, 180, 200, 64, "C · Energy Meter", "能量判别器 · E(x, F)", COLORS.opp));
    svg.appendChild(arrow(760, 102, 570, 178, COLORS.inkDim, "3 4"));
    svg.appendChild(text(690, 150, "score 评分", { fill: COLORS.inkFaint, "font-size": 11.5, "font-family": "STSong, SimSun, serif" }));

    // D 朗之万推理回路：能量地貌 + 下降迭代
    var ld = "M 130 300 Q 190 240 250 292 Q 310 340 370 296 Q 430 256 490 300";
    svg.appendChild(el("path", { d: ld, fill: "none", stroke: COLORS.violet, "stroke-width": 1.3 }));
    svg.appendChild(text(120, 330, "energy landscape 能量地貌", { fill: COLORS.violet, "font-size": 12, "font-family": "Georgia, serif", "font-style": "italic" }));
    // 下降小球 z_k → z_{k+1}
    svg.appendChild(el("circle", { cx: 165, cy: 268, r: 4.5, fill: COLORS.inkFaint }));
    svg.appendChild(text(150, 252, "z_k", { fill: COLORS.inkFaint, "font-size": 12, "font-family": "Georgia, serif", "font-style": "italic" }));
    svg.appendChild(el("circle", { cx: 252, cy: 290, r: 4.5, fill: COLORS.inkDim }));
    svg.appendChild(el("circle", { cx: 368, cy: 297, r: 5.5, fill: COLORS.accent }));
    svg.appendChild(text(352, 322, "z* 收敛", { fill: COLORS.accent, "font-size": 12, "font-family": "STSong, SimSun, serif" }));
    svg.appendChild(arrow(170, 272, 244, 286, COLORS.violet, "3 3"));
    svg.appendChild(arrow(258, 290, 360, 296, COLORS.violet, "3 3"));
    svg.appendChild(text(540, 288, "D · Langevin Inference", { fill: COLORS.ink, "font-size": 14, "font-family": "Georgia, serif", "font-style": "italic" }));
    svg.appendChild(text(540, 310, "朗之万动力学：沿能量梯度最速下降，", { fill: COLORS.inkDim, "font-size": 12.5, "font-family": "STSong, SimSun, serif" }));
    svg.appendChild(text(540, 330, "注入噪声逃离浅层极小值（System 1 → System 2）", { fill: COLORS.inkFaint, "font-size": 12.5, "font-family": "STSong, SimSun, serif" }));

    // 判别器 → 推理回路反馈
    svg.appendChild(arrow(470, 246, 400, 282, COLORS.opp, "3 4"));

    document.getElementById("sfgs-diagram").appendChild(svg);
  })();

  /* ---------- SFGS 模块卡：公式手写排版 ----------
     把 script.yaml 里的 ASCII 公式转成带上下标的 HTML：
     下标 _x → <sub>，上标 ^T/²/√ 等按规则替换，希腊字母原样保留。 */
  function renderFormula(src) {
    var html = src
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      // 上标：^T、² 已直接写 unicode 的不动
      .replace(/\^T/g, "<sup>T</sup>")
      // 下标：_t _θ _φ _k _ij _{k+1} 等
      .replace(/_\{([^}]+)\}/g, "<sub>$1</sub>")
      .replace(/_([A-Za-zθφα-ω]+)/g, "<sub>$1</sub>")
      // 运算符留白
      .replace(/([=+−])/g, '<span class="op">$1</span>');
    return html;
  }

  var modBox = document.getElementById("sfgs-modules");
  R.sfgs.modules.forEach(function (m, i) {
    var card = document.createElement("div");
    card.className = "sfgs-mod";
    card.innerHTML =
      '<p class="sfgs-mod-name">' + String.fromCharCode(65 + i) + " · " + m.name_en + "<em>" + m.name_zh + "</em></p>" +
      '<p class="sfgs-mod-text">' + m.text_en + "<em>" + m.text_zh + "</em></p>" +
      '<div class="formula">' + renderFormula(m.formula) + "</div>";
    modBox.appendChild(card);
  });

  /* ============================================================
     3. 维度投影小互动（Canvas）
     点云：瑞士卷流形（2D 曲面嵌入 3D）+ 少量离面噪声
     模式：free 自由视角 / drop 丢失一维 / ortho 正交平面（几乎无有效投影）
     信息保留量：投影后方差 ÷ 原始方差（通俗但直观的损失度量）
     ============================================================ */
  (function projectionPlayground() {
    var canvas = document.getElementById("proj-canvas");
    var ctx = canvas.getContext("2d");
    var mode = "free";
    var yaw = 0.7, pitch = 0.4;       // 视角（拖动改变）
    var autoSpin = true;               // 未交互时缓慢自转，吸引用户拖动
    var dragging = false, lx = 0, ly = 0;

    // ---- 生成瑞士卷点云：t ∈ [0.6π, 3π], h ∈ [-1, 1] ----
    var pts = [];
    var N = 900;
    for (var i = 0; i < N; i++) {
      var t = Math.PI * (0.6 + 2.4 * Math.random());
      var h = (Math.random() * 2 - 1) * 1.2;
      pts.push({
        x: t * Math.cos(t) / 10,
        y: h,
        z: t * Math.sin(t) / 10,
        c: t // 用卷曲参数着色，投影后颜色连续性直观展示流形是否被折叠
      });
    }

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();

    // 拖动旋转
    canvas.addEventListener("mousedown", function (e) { dragging = true; autoSpin = false; lx = e.clientX; ly = e.clientY; });
    window.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      yaw += (e.clientX - lx) * 0.008;
      pitch += (e.clientY - ly) * 0.008;
      pitch = Math.max(-1.5, Math.min(1.5, pitch));
      lx = e.clientX; ly = e.clientY;
    });
    window.addEventListener("mouseup", function () { dragging = false; });

    // 投影模式切换
    var modeBtns = document.querySelectorAll(".proj-mode");
    modeBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        modeBtns.forEach(function (x) { x.classList.remove("is-active"); });
        b.classList.add("is-active");
        mode = b.dataset.mode;
        var notes = {
          free: "Drag to rotate the manifold.<em>拖动旋转流形，观察三维结构</em>",
          drop: "One dimension dropped — the roll folds onto itself.<em>丢失一维：卷曲的层叠压在一起，本征结构被折叠</em>",
          ortho: "Plane seen edge-on: almost nothing projects.<em>正交视角：流形坍缩成一条线，几乎没有有效投影</em>"
        };
        document.getElementById("proj-note").innerHTML = notes[mode];
      });
    });

    // 旋转矩阵：绕 Y（yaw）再绕 X（pitch）
    function rotate(p) {
      var cy = Math.cos(yaw), sy = Math.sin(yaw);
      var cp = Math.cos(pitch), sp = Math.sin(pitch);
      var x = p.x * cy + p.z * sy;
      var z = -p.x * sy + p.z * cy;
      var y = p.y * cp - z * sp;
      z = p.y * sp + z * cp;
      return { x: x, y: y, z: z, c: p.c };
    }

    // 方差工具：信息保留量的通俗度量
    function variance(arr) {
      var m = arr.reduce(function (a, b) { return a + b; }, 0) / arr.length;
      return arr.reduce(function (a, b) { return a + (b - m) * (b - m); }, 0) / arr.length;
    }

    var meterFill = document.getElementById("proj-meter-fill");
    var meterNum = document.getElementById("proj-meter-num");

    function frame() {
      if (autoSpin) yaw += 0.003;
      var w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      var scale = Math.min(w, h) * 0.36;

      var rotated = pts.map(rotate);
      // 各模式的投影规则
      var projected = rotated.map(function (p) {
        if (mode === "drop") return { x: p.x, y: 0, z: p.z };           // 丢弃 y 维：流形折叠
        if (mode === "ortho") return { x: p.x * 0.02, y: 0, z: p.z };   // 平面侧视：x 方向几乎无信号
        return p;                                                        // free：保留全部三维
      });

      // 透视投影到 2D 画布
      var screen = projected.map(function (p) {
        var persp = 3.2 / (3.2 + p.z); // 简单透视：远的点更小更淡
        return {
          sx: w / 2 + p.x * scale * persp,
          sy: h / 2 + p.y * scale * persp,
          d: persp,
          c: p.c
        };
      });

      // 画接收平面（drop / ortho 模式下可视化投影面）
      if (mode !== "free") {
        ctx.save();
        ctx.strokeStyle = "rgba(242,237,227,.12)";
        ctx.setLineDash([4, 5]);
        ctx.strokeRect(w * 0.12, h / 2 - 2, w * 0.76, 4);
        ctx.fillStyle = COLORS.inkFaint;
        ctx.font = '11px "STSong","SimSun",serif';
        ctx.fillText(mode === "drop" ? "接收平面（少了一维）" : "正交接收平面（侧视）", w * 0.12, h / 2 - 12);
        ctx.restore();
      }

      // 绘制点云：按卷曲参数着色（青 → 金），深度调透明度
      for (var i = 0; i < screen.length; i++) {
        var s = screen[i];
        var k = (s.c - Math.PI * 0.6) / (Math.PI * 2.4); // 0..1
        var cr = Math.round(127 + (240 - 127) * k);
        var cg = Math.round(216 + (201 - 216) * k);
        var cb = Math.round(232 + (107 - 232) * k);
        ctx.beginPath();
        ctx.arc(s.sx, s.sy, 2.1 * s.d, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + cr + "," + cg + "," + cb + "," + (0.35 + 0.6 * (s.d - 0.7)).toFixed(2) + ")";
        ctx.fill();
      }

      // 信息保留量：投影后 xy 方差和 ÷ 原始三维方差和
      var xs = projected.map(function (p) { return p.x; });
      var ys = projected.map(function (p) { return p.y; });
      var zs = rotated.map(function (p) { return p.z; });
      var kept = variance(xs) + variance(ys);
      var total = variance(rotated.map(function (p) { return p.x; })) +
                  variance(rotated.map(function (p) { return p.y; })) + variance(zs);
      var ratio = total > 0 ? Math.min(1, kept / total) : 0;
      meterFill.style.width = (ratio * 100).toFixed(0) + "%";
      meterNum.textContent = (ratio * 100).toFixed(0) + "% preserved" +
        (mode === "ortho" ? " · 正交：几乎无有效投影" : mode === "drop" ? " · 本征信息已损失" : "");

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();
})();
