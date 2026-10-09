// S1 opening（150-510，12s）：hook 版式 —— 同一句话，不同的意思
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { fadeIn, map, rise, springIn } from "../components/anim";
import { Background } from "../components/Background";
import { Kicker } from "../components/Kicker";
import { Caption } from "../components/Caption";
import { Stamp } from "../components/Stamp";
import { OPENING } from "../data";

export const S1Opening: React.FC = () => {
  const frame = useCurrentFrame();
  // 中文字幕两段切换：先 hook 句，后正文解释
  const cap1 = fadeIn(frame, 40, 14) * (1 - map(frame, 198, 220, 0, 1));
  const cap2 = map(frame, 212, 234, 0, 1);

  return (
    <AbsoluteFill>
      <Background hue="gold" />
      <Stamp text="CH.1 · 00 · HOOK" color={C.accent} delay={6} />
      <div style={{ position: "absolute", left: 200, top: 130, right: 200 }}>
        <div style={{ opacity: fadeIn(frame, 8, 14), transform: `translateY(${rise(frame, 8, 20)}px)` }}>
          <Kicker en={OPENING.kicker.en} zh={OPENING.kicker.zh} />
        </div>

        {/* Hook 大标题 */}
        <div style={{ marginTop: 52 }}>
          <div
            style={{
              fontFamily: F.enDisplay,
              fontSize: 96,
              lineHeight: 1.12,
              color: C.ink,
              opacity: springIn(frame, 16),
              transform: `translateY(${rise(frame, 16, 38)}px)`,
              textShadow: "0 0 30px rgba(242,237,227,.18)",
            }}
          >
            {OPENING.titleLine1}
          </div>
          <div
            style={{
              fontFamily: F.enDisplay,
              fontSize: 96,
              lineHeight: 1.12,
              fontStyle: "italic",
              color: C.accent,
              opacity: springIn(frame, 26),
              transform: `translateY(${rise(frame, 26, 38)}px)`,
              textShadow: `0 0 40px rgba(240,201,107,.4)`,
            }}
          >
            {OPENING.titleLine2}
          </div>
        </div>

        {/* 引文卡：浮起面板，左侧无彩条，用整体浅底 + 大号引号表达引用 */}
        <div
          style={{
            marginTop: 56,
            display: "inline-block",
            backgroundColor: C.bgSoft,
            border: `1px solid ${C.line}`,
            borderRadius: 14,
            padding: "36px 52px",
            opacity: springIn(frame, 55),
            transform: `translateY(${rise(frame, 55, 30)}px) scale(${0.97 + springIn(frame, 55) * 0.03})`,
            boxShadow:
              "0 1px 3px rgba(0,0,0,.3), 0 16px 48px rgba(0,0,0,.35), 0 0 60px rgba(240,201,107,.07)",
          }}
        >
          <div style={{ fontFamily: F.enDisplay, fontStyle: "italic", fontSize: 52, color: C.ink }}>
            {OPENING.quote}
          </div>
          <div
            style={{
              fontFamily: F.enDisplay,
              fontSize: 30,
              color: C.inkDim,
              marginTop: 14,
              opacity: fadeIn(frame, 85, 18),
            }}
          >
            {OPENING.quoteNote}
          </div>
        </div>

        {/* 正文句：language / linguistics 暖金点亮 */}
        <div
          style={{
            marginTop: 52,
            maxWidth: 1280,
            fontFamily: F.enDisplay,
            fontSize: 34,
            lineHeight: 1.55,
            color: C.inkDim,
            opacity: fadeIn(frame, 120, 20),
            transform: `translateY(${rise(frame, 120, 22)}px)`,
          }}
        >
          {OPENING.bodyPre}
          <span style={{ color: C.accent, textShadow: "0 0 20px rgba(240,201,107,.45)" }}>
            {OPENING.bodyEm1}
          </span>
          {OPENING.bodyMid}
          <span style={{ color: C.accent, textShadow: "0 0 20px rgba(240,201,107,.45)" }}>
            {OPENING.bodyEm2}
          </span>
          {OPENING.bodyEnd}
        </div>
      </div>

      {/* 底部中文字幕：两段交叉替换（关键词高亮） */}
      <Caption text={OPENING.titleZh} hl="不同的意思" color={C.opp} opacity={cap1} />
      <Caption text={OPENING.bodyZh} hl="语言学" color={C.cyan} opacity={cap2} />
    </AbsoluteFill>
  );
};
