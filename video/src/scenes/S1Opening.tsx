// S1 opening（240-840，20s）：hook 版式 —— 同一句话，不同的意思
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { fadeIn, map, rise, springIn } from "../components/anim";
import { Background } from "../components/Background";
import { Kicker } from "../components/Kicker";
import { OPENING } from "../data";

export const S1Opening: React.FC = () => {
  const frame = useCurrentFrame();
  // 中文字幕两段切换：先 hook 句，后正文解释
  const cap1 = fadeIn(frame, 70, 22) * (1 - map(frame, 330, 360, 0, 1));
  const cap2 = map(frame, 350, 380, 0, 1);

  return (
    <AbsoluteFill>
      <Background hue="gold" />
      <div style={{ position: "absolute", left: 200, top: 150, right: 200 }}>
        <div style={{ opacity: fadeIn(frame, 15, 20), transform: `translateY(${rise(frame, 15, 20)}px)` }}>
          <Kicker en={OPENING.kicker.en} zh={OPENING.kicker.zh} />
        </div>

        {/* Hook 大标题 */}
        <div style={{ marginTop: 64 }}>
          <div
            style={{
              fontFamily: F.enDisplay,
              fontSize: 96,
              lineHeight: 1.12,
              color: C.ink,
              opacity: springIn(frame, 32),
              transform: `translateY(${rise(frame, 32, 38)}px)`,
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
              opacity: springIn(frame, 48),
              transform: `translateY(${rise(frame, 48, 38)}px)`,
            }}
          >
            {OPENING.titleLine2}
          </div>
        </div>

        {/* 引文卡：浮起面板，左侧无彩条，用整体浅底 + 大号引号表达引用 */}
        <div
          style={{
            marginTop: 72,
            display: "inline-block",
            backgroundColor: C.bgSoft,
            border: `1px solid ${C.line}`,
            borderRadius: 14,
            padding: "40px 56px",
            opacity: springIn(frame, 110),
            transform: `translateY(${rise(frame, 110, 30)}px) scale(${0.97 + springIn(frame, 110) * 0.03})`,
            boxShadow: "0 1px 3px rgba(0,0,0,.3), 0 16px 48px rgba(0,0,0,.35)",
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
              marginTop: 16,
              opacity: fadeIn(frame, 160, 24),
            }}
          >
            {OPENING.quoteNote}
          </div>
        </div>

        {/* 正文句：language / linguistics 暖金点亮 */}
        <div
          style={{
            marginTop: 64,
            maxWidth: 1280,
            fontFamily: F.enDisplay,
            fontSize: 34,
            lineHeight: 1.55,
            color: C.inkDim,
            opacity: fadeIn(frame, 210, 28),
            transform: `translateY(${rise(frame, 210, 22)}px)`,
          }}
        >
          {OPENING.bodyPre}
          <span style={{ color: C.accent }}>{OPENING.bodyEm1}</span>
          {OPENING.bodyMid}
          <span style={{ color: C.accent }}>{OPENING.bodyEm2}</span>
          {OPENING.bodyEnd}
        </div>
      </div>

      {/* 底部中文字幕：两段交叉替换 */}
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
          opacity: cap1,
        }}
      >
        {OPENING.titleZh}
      </div>
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
          opacity: cap2,
        }}
      >
        {OPENING.bodyZh}
      </div>
    </AbsoluteFill>
  );
};
