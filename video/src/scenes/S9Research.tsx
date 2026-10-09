// S9 研究预告 + 署名（4980-5400，14s）：
// The Semantic Manifold Hypothesis 标题浮现 + Chen Jingyu & Zhang Zhaoyang · Group 1
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { breathe, drift, fadeIn, map, rise, springIn } from "../components/anim";
import { Background } from "../components/Background";
import { RESEARCH } from "../data";

export const S9Research: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = breathe(frame, 85);
  const float = drift(frame, 6, 150);

  return (
    <AbsoluteFill>
      <Background hue="cyan" />

      {/* 标题后方的青色呼吸光晕：流形/潜空间的冷色暗示 */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          width: 1400,
          height: 560,
          transform: `translate(-50%, -50%) translateY(${float}px)`,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, rgba(127,216,232,${0.08 + glow * 0.07}), transparent 70%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 200px",
        }}
      >
        {/* kicker */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 24,
            opacity: fadeIn(frame, 10, 20),
            transform: `translateY(${rise(frame, 10, 16)}px)`,
          }}
        >
          <span
            style={{
              fontFamily: F.enUi,
              fontSize: 21,
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: C.cyan,
            }}
          >
            {RESEARCH.kicker.en}
          </span>
          <span style={{ fontFamily: F.zhSerif, fontSize: 20, letterSpacing: "0.18em", color: C.inkFaint }}>
            {RESEARCH.kicker.zh}
          </span>
        </div>

        {/* 假说标题 */}
        <div
          style={{
            marginTop: 54,
            fontFamily: F.enDisplay,
            fontSize: 88,
            lineHeight: 1.18,
            color: C.ink,
            maxWidth: 1500,
            opacity: springIn(frame, 26),
            transform: `translateY(${rise(frame, 26, 38)}px) scale(${0.97 + springIn(frame, 26) * 0.03})`,
            textShadow: `0 0 ${30 + glow * 30}px rgba(127,216,232,${0.12 + glow * 0.1})`,
          }}
        >
          The Semantic <span style={{ fontStyle: "italic", color: C.cyan }}>Manifold</span> Hypothesis
        </div>

        <div
          style={{
            marginTop: 26,
            fontFamily: F.zhSerif,
            fontSize: 30,
            letterSpacing: "0.34em",
            color: C.inkDim,
            opacity: fadeIn(frame, 55, 24),
            transform: `translateY(${rise(frame, 55, 18)}px)`,
          }}
        >
          {RESEARCH.titleZh}
        </div>

        {/* 预告句 */}
        <div
          style={{
            marginTop: 44,
            fontFamily: F.enDisplay,
            fontSize: 25,
            lineHeight: 1.6,
            color: C.inkDim,
            maxWidth: 1160,
            opacity: fadeIn(frame, 95, 28),
          }}
        >
          {RESEARCH.teaserEn}
        </div>

        {/* 细线 */}
        <div
          style={{
            width: map(frame, 150, 190, 0, 300),
            height: 1,
            backgroundColor: C.line,
            marginTop: 64,
          }}
        />

        {/* 署名 */}
        <div
          style={{
            marginTop: 36,
            fontFamily: F.mono,
            fontSize: 26,
            letterSpacing: "0.12em",
            color: C.accent,
            opacity: fadeIn(frame, 180, 26),
            transform: `translateY(${rise(frame, 180, 16)}px)`,
          }}
        >
          {RESEARCH.signature}
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: F.zhSerif,
            fontSize: 20,
            letterSpacing: "0.24em",
            color: C.inkFaint,
            opacity: fadeIn(frame, 200, 26),
          }}
        >
          {RESEARCH.signatureZh}
        </div>
      </div>

      {/* 中文字幕 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 60,
          textAlign: "center",
          fontFamily: F.zhSerif,
          fontSize: 25,
          letterSpacing: "0.14em",
          color: C.inkFaint,
          opacity: fadeIn(frame, 120, 26),
        }}
      >
        {RESEARCH.teaserZh}
      </div>
    </AbsoluteFill>
  );
};
