// S0 片头（0-150，5s）：粒子/光晕爆发起手 → 大字标题弹入，定调「震撼」
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { breathe, drift, fadeIn, map, rise, springIn } from "../components/anim";

// 爆发粒子（确定性种子，渲染帧间稳定）
const SPARKS = Array.from({ length: 30 }, (_, i) => ({
  angle: (i / 30) * Math.PI * 2 + (i % 5) * 0.13,
  dist: 260 + ((i * 173) % 340),
  size: 2 + ((i * 29) % 4),
  delay: (i * 7) % 8,
  gold: i % 3 !== 0,
}));

export const S0Title: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = breathe(frame, 70);
  const float = drift(frame, 5, 150);

  // 起手爆发：闪光 0-12 / 冲击波环 2-30 / 粒子 0-46
  const flash = 1 - map(frame, 0, 12, 0, 1);
  const ringR = map(frame, 2, 30, 60, 620);
  const ringO = 1 - map(frame, 2, 30, 0, 1);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {/* 中心闪光 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(640px 420px at 50% 46%, rgba(255,244,220,.9), ${C.accent}40 45%, transparent 75%)`,
          opacity: flash,
        }}
      />
      {/* 冲击波环 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          width: ringR * 2,
          height: ringR * 2,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: `2px solid ${C.accent}`,
          opacity: ringO * 0.7,
          boxShadow: `0 0 40px ${C.accent}66, inset 0 0 40px ${C.accent}44`,
        }}
      />
      {/* 放射粒子 */}
      {SPARKS.map((p, i) => {
        const t = map(frame, p.delay, p.delay + 38, 0, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const d = ease * p.dist;
        const o = (1 - map(frame, p.delay + 16, p.delay + 44, 0, 1)) * (t > 0 ? 1 : 0);
        const col = p.gold ? C.accent : C.cyan;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${Math.cos(p.angle) * d}px)`,
              top: `calc(46% + ${Math.sin(p.angle) * d * 0.62}px)`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: col,
              boxShadow: `0 0 ${6 + p.size * 2}px ${col}`,
              opacity: o,
            }}
          />
        );
      })}

      {/* 标题背后的呼吸光晕（爆发余热） */}
      <div
        style={{
          position: "absolute",
          width: 1300,
          height: 560,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${C.accent}24, transparent 70%)`,
          opacity: (0.5 + glow * 0.5) * fadeIn(frame, 10, 24),
          transform: `translateY(${float}px)`,
        }}
      />

      <div style={{ textAlign: "center", transform: `translateY(${float * 0.6}px)` }}>
        {/* CHAPTER 1 */}
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 26,
            letterSpacing: "0.5em",
            color: C.accent,
            opacity: fadeIn(frame, 10, 16),
            transform: `translateY(${rise(frame, 10, 18)}px)`,
            marginBottom: 40,
            textShadow: `0 0 18px ${C.accent}80`,
          }}
        >
          CHAPTER 1
        </div>

        {/* 主标题：两行衬线大字，spring 回弹 + bloom */}
        <div
          style={{
            fontFamily: F.enDisplay,
            fontSize: 118,
            lineHeight: 1.08,
            color: C.ink,
            letterSpacing: "0.01em",
            opacity: springIn(frame, 18),
            transform: `translateY(${rise(frame, 18, 40)}px) scale(${0.97 + springIn(frame, 18) * 0.03})`,
            textShadow: "0 0 34px rgba(242,237,227,.22)",
          }}
        >
          INVITATIONS TO
        </div>
        <div
          style={{
            fontFamily: F.enDisplay,
            fontSize: 118,
            lineHeight: 1.08,
            color: C.ink,
            fontStyle: "italic",
            opacity: springIn(frame, 28),
            transform: `translateY(${rise(frame, 28, 40)}px) scale(${0.97 + springIn(frame, 28) * 0.03})`,
            textShadow: `0 0 44px rgba(240,201,107,${0.28 + glow * 0.14})`,
          }}
        >
          LINGUISTICS
        </div>

        {/* 细线生长 */}
        <div
          style={{
            width: map(frame, 44, 72, 0, 340),
            height: 1,
            backgroundColor: C.line,
            margin: "44px auto 34px",
          }}
        />

        {/* 中文小字幕 */}
        <div
          style={{
            fontFamily: F.zhSerif,
            fontSize: 32,
            letterSpacing: "0.3em",
            color: C.inkDim,
            opacity: fadeIn(frame, 56, 18),
            transform: `translateY(${rise(frame, 56, 16)}px)`,
          }}
        >
          语言学总论 · 第 1 组
        </div>
      </div>
    </AbsoluteFill>
  );
};
