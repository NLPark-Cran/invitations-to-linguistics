// S0 片头（0-240，8s）：大字标题弹入 + 语言学总论 · 第 1 组 + CHAPTER 1
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { breathe, drift, fadeIn, map, rise, springIn } from "../components/anim";

export const S0Title: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = breathe(frame, 80);
  const float = drift(frame, 5, 160);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {/* 标题背后的呼吸光晕 */}
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 520,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${C.accent}1A, transparent 70%)`,
          opacity: 0.5 + glow * 0.5,
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
            opacity: fadeIn(frame, 8, 22),
            transform: `translateY(${rise(frame, 8, 18)}px)`,
            marginBottom: 44,
          }}
        >
          CHAPTER 1
        </div>

        {/* 主标题：两行衬线大字，spring 回弹 */}
        <div
          style={{
            fontFamily: F.enDisplay,
            fontSize: 118,
            lineHeight: 1.08,
            color: C.ink,
            letterSpacing: "0.01em",
            opacity: springIn(frame, 20),
            transform: `translateY(${rise(frame, 20, 40)}px) scale(${0.97 + springIn(frame, 20) * 0.03})`,
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
            opacity: springIn(frame, 32),
            transform: `translateY(${rise(frame, 32, 40)}px) scale(${0.97 + springIn(frame, 32) * 0.03})`,
          }}
        >
          LINGUISTICS
        </div>

        {/* 细线生长 */}
        <div
          style={{
            width: map(frame, 60, 100, 0, 340),
            height: 1,
            backgroundColor: C.line,
            margin: "52px auto 40px",
          }}
        />

        {/* 中文小字幕 */}
        <div
          style={{
            fontFamily: F.zhSerif,
            fontSize: 32,
            letterSpacing: "0.3em",
            color: C.inkDim,
            opacity: fadeIn(frame, 78, 26),
            transform: `translateY(${rise(frame, 78, 16)}px)`,
          }}
        >
          语言学总论 · 第 1 组
        </div>
      </div>
    </AbsoluteFill>
  );
};
