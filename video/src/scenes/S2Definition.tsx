// S2 definition（840-1500，22s）：定义长句 + SYSTEM/ARBITRARY/VOCAL/HUMAN 依次点亮
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { breathe, fadeIn, map, rise, springIn } from "../components/anim";
import { Background } from "../components/Background";
import { Kicker } from "../components/Kicker";
import { Caption } from "../components/Caption";
import { DEFINITION } from "../data";

// 四个关键词的点亮时刻（本幕局部帧）
const T = [120, 235, 350, 465];

/** 句内关键词：未点亮时与正文同色，点亮后暖金 + 微光 */
const Kw: React.FC<{ text: string; at: number }> = ({ text, at }) => {
  const frame = useCurrentFrame();
  const on = map(frame, at, at + 18, 0, 1);
  return (
    <span
      style={{
        color: on > 0.5 ? C.accent : C.ink,
        fontStyle: "italic",
        textShadow: `0 0 ${on * 28}px rgba(240,201,107,${0.55 * on})`,
      }}
    >
      {text}
    </span>
  );
};

/** 关键词卡：默认压暗，点亮时浮起 + 暖金细边 */
const KeyCard: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const k = DEFINITION.keywords[index];
  const at = T[index];
  const enter = springIn(frame, 60 + index * 10);
  const on = map(frame, at, at + 20, 0, 1);
  const glow = breathe(frame, 70, index);

  return (
    <div
      style={{
        width: 356,
        backgroundColor: on > 0.5 ? C.bgRaise : C.bgSoft,
        border: `1px solid ${on > 0.5 ? `rgba(240,201,107,${0.35 + glow * 0.25})` : C.line}`,
        borderRadius: 14,
        padding: "26px 28px 30px",
        opacity: enter * (0.25 + on * 0.75),
        transform: `translateY(${rise(frame, 60 + index * 10, 26) - on * 8}px)`,
        boxShadow:
          on > 0.02
            ? `0 1px 3px rgba(0,0,0,.3), 0 ${10 + on * 14}px ${30 + on * 26}px rgba(0,0,0,${0.3 + on * 0.15})`
            : "0 1px 3px rgba(0,0,0,.25)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <span
          style={{
            fontFamily: F.mono,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: on > 0.5 ? C.accent : C.inkDim,
          }}
        >
          {k.wordEn}
        </span>
        <span style={{ fontFamily: F.zhSerif, fontSize: 21, color: C.inkDim }}>{k.wordZh}</span>
      </div>
      <div
        style={{
          fontFamily: F.enDisplay,
          fontSize: 19,
          lineHeight: 1.5,
          color: C.inkDim,
          marginTop: 16,
        }}
      >
        {k.textEn}
      </div>
      <div
        style={{
          fontFamily: F.zhSerif,
          fontSize: 17,
          lineHeight: 1.6,
          color: C.inkFaint,
          marginTop: 10,
        }}
      >
        {k.textZh}
      </div>
    </div>
  );
};

export const S2Definition: React.FC = () => {
  const frame = useCurrentFrame();
  const s = DEFINITION.sentence;

  return (
    <AbsoluteFill>
      <Background hue="gold" />
      <div style={{ position: "absolute", left: 200, top: 120, right: 200 }}>
        <div style={{ opacity: fadeIn(frame, 15, 20), transform: `translateY(${rise(frame, 15, 18)}px)` }}>
          <Kicker en={DEFINITION.kicker.en} zh={DEFINITION.kicker.zh} />
        </div>

        {/* 定义长句：衬线大字，关键词依次点亮 */}
        <div
          style={{
            marginTop: 88,
            maxWidth: 1420,
            fontFamily: F.enDisplay,
            fontSize: 62,
            lineHeight: 1.35,
            color: C.ink,
            opacity: springIn(frame, 28),
            transform: `translateY(${rise(frame, 28, 34)}px)`,
          }}
        >
          {s.pre}
          <Kw text={s.kw1} at={T[0]} />
          {s.mid1}
          <Kw text={s.kw2} at={T[1]} />
          {s.mid2}
          <Kw text={s.kw3} at={T[2]} />
          {s.mid3}
          <Kw text={s.kw4} at={T[3]} />
          {s.post}
        </div>

        {/* 四张关键词卡 */}
        <div style={{ marginTop: 96, display: "flex", gap: 24 }}>
          {DEFINITION.keywords.map((_, i) => (
            <KeyCard key={i} index={i} />
          ))}
        </div>
      </div>

      <Caption text={DEFINITION.titleZh} delay={45} />
    </AbsoluteFill>
  );
};
