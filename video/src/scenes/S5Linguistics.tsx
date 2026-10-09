// S5 linguistics（2070-2460，13s）：triad 三原则 + 科学循环图解（青色）
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { fadeIn, map, rise, springIn } from "../components/anim";
import { Background } from "../components/Background";
import { Kicker } from "../components/Kicker";
import { Caption } from "../components/Caption";
import { Stamp } from "../components/Stamp";
import { LINGUISTICS } from "../data";

const Principle: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const p = LINGUISTICS.principles[index];
  const at = 40 + index * 40;
  const enter = springIn(frame, at);
  const flash = Math.max(0, 1 - Math.abs(frame - (at + 13)) / 20);

  return (
    <div
      style={{
        width: 480,
        backgroundColor: C.bgSoft,
        border: `1px solid ${flash > 0.05 ? `rgba(240,201,107,${0.12 + flash * 0.35})` : C.line}`,
        borderRadius: 14,
        padding: "30px 34px 34px",
        opacity: enter,
        transform: `translateY(${rise(frame, at, 30)}px)`,
        boxShadow: `0 0 ${flash * 40}px rgba(240,201,107,${flash * 0.18}), 0 1px 3px rgba(0,0,0,.25), 0 12px 36px rgba(0,0,0,.3)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <span style={{ fontFamily: F.mono, fontSize: 20, color: C.accent }}>P{index + 1}</span>
        <span style={{ fontFamily: F.enDisplay, fontSize: 36, color: C.ink }}>{p.termEn}</span>
        <span style={{ fontFamily: F.zhSerif, fontSize: 20, color: C.inkDim, letterSpacing: "0.1em" }}>
          {p.termZh}
        </span>
      </div>
      <div style={{ fontFamily: F.enDisplay, fontSize: 20, lineHeight: 1.5, color: C.inkDim, marginTop: 16 }}>
        {p.textEn}
      </div>
      <div style={{ fontFamily: F.zhSerif, fontSize: 17, lineHeight: 1.55, color: C.inkFaint, marginTop: 8 }}>
        {p.textZh}
      </div>
    </div>
  );
};

/** 科学循环：三个节点 + 正向箭头 + 底部回环弧线，青色细线逐段生长 */
const Loop: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 1160;
  const H = 210;
  const ys = 60; // 节点中线
  const xs = [180, 580, 980]; // 三个节点中心
  const start = 180; // 图解起始帧

  const nodeOp = (i: number) => springIn(frame, start + i * 26);
  const arrowLen = (i: number) => map(frame, start + 16 + i * 26, start + 36 + i * 26, 0, 1);
  const loopLen = map(frame, start + 95, start + 150, 0, 1);

  return (
    <div style={{ position: "relative", width: W, height: H, margin: "44px auto 0" }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {/* 正向箭头 */}
        {[0, 1].map((i) => (
          <line
            key={i}
            x1={xs[i] + 128}
            y1={ys}
            x2={xs[i + 1] - 128}
            y2={ys}
            stroke={C.cyan}
            strokeWidth={1.5}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - arrowLen(i)}
            opacity={0.85}
          />
        ))}
        {/* 回环弧线：TEST & REVISE → OBSERVE DATA */}
        <path
          d={`M ${xs[2]} ${ys + 44} C ${xs[2]} ${H - 20}, ${xs[0]} ${H - 20}, ${xs[0]} ${ys + 44}`}
          fill="none"
          stroke={C.cyan}
          strokeWidth={1.5}
          strokeDasharray="1"
          pathLength={1}
          strokeDashoffset={1 - loopLen}
          opacity={0.7}
        />
        {/* 回环箭头尖 */}
        <polygon
          points={`${xs[0] - 6},${ys + 36} ${xs[0] + 6},${ys + 36} ${xs[0]},${ys + 48}`}
          fill={C.cyan}
          opacity={loopLen > 0.95 ? 1 : 0}
        />
      </svg>

      {/* 节点 */}
      {LINGUISTICS.loop.map((n, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: xs[i],
            top: ys,
            transform: `translate(-50%, -50%) scale(${0.9 + nodeOp(i) * 0.1})`,
            opacity: nodeOp(i),
            backgroundColor: C.bgRaise,
            border: `1px solid ${C.cyan}66`,
            borderRadius: 999,
            padding: "14px 30px",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontFamily: F.enUi, fontSize: 19, letterSpacing: "0.16em", color: C.cyan }}>
            {n.en}
          </span>
          <span style={{ fontFamily: F.zhSerif, fontSize: 17, color: C.inkFaint, marginLeft: 14 }}>
            {n.zh}
          </span>
        </div>
      ))}

      {/* 回环标签 */}
      <div
        style={{
          position: "absolute",
          left: xs[1],
          top: H - 34,
          transform: "translateX(-50%)",
          fontFamily: F.mono,
          fontSize: 16,
          letterSpacing: "0.24em",
          color: C.inkFaint,
          opacity: loopLen,
        }}
      >
        REVISE &amp; LOOP
      </div>
    </div>
  );
};

export const S5Linguistics: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background hue="cyan" />
      <Stamp text="CH.1 · 04 · LINGUISTICS · P × 3" color={C.cyan} delay={8} />
      <div style={{ position: "absolute", left: 200, top: 108, right: 200 }}>
        <div style={{ opacity: fadeIn(frame, 8, 14), transform: `translateY(${rise(frame, 8, 18)}px)` }}>
          <Kicker en={LINGUISTICS.kicker.en} zh={LINGUISTICS.kicker.zh} color={C.cyan} />
        </div>

        {/* 定义句：scientific 暖金承重 */}
        <div
          style={{
            marginTop: 36,
            fontFamily: F.enDisplay,
            fontSize: 62,
            lineHeight: 1.25,
            color: C.ink,
            opacity: springIn(frame, 16),
            transform: `translateY(${rise(frame, 16, 30)}px)`,
          }}
        >
          {LINGUISTICS.titlePre}
          <span style={{ fontStyle: "italic", color: C.accent, textShadow: "0 0 36px rgba(240,201,107,.5)" }}>
            {LINGUISTICS.titleEm}
          </span>
          {LINGUISTICS.titlePost}
        </div>

        <div
          style={{
            marginTop: 20,
            fontFamily: F.enDisplay,
            fontSize: 24,
            lineHeight: 1.5,
            color: C.inkDim,
            maxWidth: 1300,
            opacity: fadeIn(frame, 34, 18),
          }}
        >
          {LINGUISTICS.bodyEn}
        </div>

        {/* 三原则 */}
        <div style={{ marginTop: 44, display: "flex", gap: 24 }}>
          {LINGUISTICS.principles.map((_, i) => (
            <Principle key={i} index={i} />
          ))}
        </div>

        {/* 科学循环 */}
        <Loop />
      </div>

      <Caption text={LINGUISTICS.bodyZh} hl="科学" color={C.accent} delay={26} />
    </AbsoluteFill>
  );
};
