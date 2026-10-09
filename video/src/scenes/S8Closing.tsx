// S8 closing（3420-3720，10s）：closing 页文案 + 漂浮星点（暗示概念网络）
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { drift, fadeIn, map, rise, springIn } from "../components/anim";
import { Background } from "../components/Background";
import { Kicker } from "../components/Kicker";
import { Caption } from "../components/Caption";
import { Stamp } from "../components/Stamp";
import { CLOSING } from "../data";

// 伪随机星点（确定性种子，渲染帧间稳定）
const DOTS = Array.from({ length: 16 }, (_, i) => ({
  x: ((i * 587) % 1700) + 110,
  y: ((i * 389) % 860) + 90,
  r: 1.5 + ((i * 37) % 10) / 5,
  phase: i * 0.9,
}));

export const S8Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const cap1 = fadeIn(frame, 34, 14) * (1 - map(frame, 150, 172, 0, 1));
  const cap2 = map(frame, 164, 186, 0, 1);

  return (
    <AbsoluteFill>
      <Background hue="gold" />
      <Stamp text="CH.1 · 07 · EXPLORE" color={C.accent} delay={6} />

      {/* 漂浮星点：概念网络的暗示 */}
      {DOTS.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: d.x + drift(frame, 14, 150, d.phase),
            top: d.y + drift(frame, 10, 180, d.phase * 1.7),
            width: d.r * 2,
            height: d.r * 2,
            borderRadius: "50%",
            backgroundColor: i % 3 === 0 ? C.accent : C.cyan,
            boxShadow: `0 0 8px ${i % 3 === 0 ? C.accent : C.cyan}88`,
            opacity: fadeIn(frame, 10 + i * 4, 22) * 0.55,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 240px",
        }}
      >
        <div style={{ opacity: fadeIn(frame, 8, 14), transform: `translateY(${rise(frame, 8, 16)}px)` }}>
          <Kicker en={CLOSING.kicker.en} zh={CLOSING.kicker.zh} />
        </div>

        <div
          style={{
            marginTop: 48,
            fontFamily: F.enDisplay,
            fontSize: 72,
            lineHeight: 1.25,
            color: C.ink,
            maxWidth: 1400,
            opacity: springIn(frame, 18),
            transform: `translateY(${rise(frame, 18, 34)}px) scale(${0.97 + springIn(frame, 18) * 0.03})`,
          }}
        >
          {CLOSING.titlePre}
          <span style={{ fontStyle: "italic", color: C.accent, textShadow: "0 0 38px rgba(240,201,107,.5)" }}>
            {CLOSING.titleEm}
          </span>
          {CLOSING.titlePost}
        </div>

        <div
          style={{
            marginTop: 42,
            fontFamily: F.enDisplay,
            fontSize: 26,
            lineHeight: 1.6,
            color: C.inkDim,
            maxWidth: 1180,
            opacity: fadeIn(frame, 60, 20),
            transform: `translateY(${rise(frame, 60, 20)}px)`,
          }}
        >
          {CLOSING.bodyEn}
        </div>
      </div>

      {/* 中文字幕两段切换（关键词高亮） */}
      <Caption text={CLOSING.titleZh} hl="路标" color={C.accent} opacity={cap1} />
      <Caption text={CLOSING.bodyZh} hl="几何" color={C.cyan} opacity={cap2} />
    </AbsoluteFill>
  );
};
