// S2 definition（510-1050，18s）：定义长句 + SYSTEM/ARBITRARY/VOCAL/HUMAN 依次点亮
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { breathe, fadeIn, map, rise, springIn } from "../components/anim";
import { Background } from "../components/Background";
import { Kicker } from "../components/Kicker";
import { Caption } from "../components/Caption";
import { Stamp } from "../components/Stamp";
import { DEFINITION } from "../data";

// 四个关键词的点亮时刻（本幕局部帧）
const T = [100, 190, 280, 370];

/** 句内关键词：未点亮时与正文同色，点亮瞬间爆一下辉光，随后恒温呼吸 */
const Kw: React.FC<{ text: string; at: number }> = ({ text, at }) => {
  const frame = useCurrentFrame();
  const on = map(frame, at, at + 14, 0, 1);
  const ping = Math.max(0, 1 - Math.abs(frame - (at + 14)) / 22); // 点亮瞬间的脉冲
  const pulse = breathe(frame, 60, at);
  return (
    <span
      style={{
        color: on > 0.5 ? C.accent : C.ink,
        fontStyle: "italic",
        textShadow:
          on > 0.02
            ? `0 0 ${18 + on * 22 + ping * 26}px rgba(240,201,107,${0.5 * on + ping * 0.4 + pulse * 0.12 * on})`
            : "none",
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
  const enter = springIn(frame, 40 + index * 8);
  const on = map(frame, at, at + 16, 0, 1);
  const glow = breathe(frame, 70, index);

  return (
    <div
      style={{
        width: 356,
        backgroundColor: on > 0.5 ? C.bgRaise : C.bgSoft,
        border: `1px solid ${on > 0.5 ? `rgba(240,201,107,${0.45 + glow * 0.3})` : C.line}`,
        borderRadius: 14,
        padding: "26px 28px 30px",
        opacity: enter * (0.25 + on * 0.75),
        transform: `translateY(${rise(frame, 40 + index * 8, 26) - on * 8}px)`,
        boxShadow:
          on > 0.02
            ? `0 0 ${30 + on * 34}px rgba(240,201,107,${0.1 + on * 0.16}), 0 1px 3px rgba(0,0,0,.3), 0 ${10 + on * 14}px ${30 + on * 26}px rgba(0,0,0,${0.3 + on * 0.15})`
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
      <Stamp text="CH.1 · 01 · DEFINITION · n = 4" color={C.accent} delay={8} />
      <div style={{ position: "absolute", left: 200, top: 116, right: 200 }}>
        <div style={{ opacity: fadeIn(frame, 10, 14), transform: `translateY(${rise(frame, 10, 18)}px)` }}>
          <Kicker en={DEFINITION.kicker.en} zh={DEFINITION.kicker.zh} />
        </div>

        {/* 定义长句：衬线大字，关键词依次点亮 */}
        <div
          style={{
            marginTop: 76,
            maxWidth: 1420,
            fontFamily: F.enDisplay,
            fontSize: 62,
            lineHeight: 1.35,
            color: C.ink,
            opacity: springIn(frame, 20),
            transform: `translateY(${rise(frame, 20, 34)}px)`,
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

      <Caption text={DEFINITION.titleZh} hl="任意的有声符号系统" color={C.accent} delay={30} />
    </AbsoluteFill>
  );
};
