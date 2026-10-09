// S3 features（1500-2160，22s）：五个识别特征级联入场（模块色绿）
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { fadeIn, map, rise, springIn } from "../components/anim";
import { Background } from "../components/Background";
import { Kicker } from "../components/Kicker";
import { Caption } from "../components/Caption";
import { FEATURES } from "../data";

const Row: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const item = FEATURES.items[index];
  const at = 80 + index * 82; // 级联
  const enter = springIn(frame, at);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 44,
        padding: "26px 0",
        borderBottom: `1px solid ${C.line}`,
        opacity: enter,
        transform: `translateY(${rise(frame, at, 30)}px)`,
      }}
    >
      {/* 序号：等宽 + 模块色绿 */}
      <span
        style={{
          fontFamily: F.mono,
          fontSize: 24,
          color: C.green,
          width: 52,
          flexShrink: 0,
          opacity: 0.9,
        }}
      >
        0{index + 1}
      </span>

      {/* 术语中英对照 */}
      <div style={{ width: 460, flexShrink: 0 }}>
        <div style={{ fontFamily: F.enDisplay, fontSize: 40, color: C.ink, lineHeight: 1.15 }}>
          {item.termEn}
        </div>
        <div style={{ fontFamily: F.zhSerif, fontSize: 21, color: C.inkDim, marginTop: 6, letterSpacing: "0.1em" }}>
          {item.termZh}
        </div>
      </div>

      {/* 解释 */}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: F.enDisplay, fontSize: 23, lineHeight: 1.45, color: C.inkDim }}>
          {item.textEn}
        </div>
        <div style={{ fontFamily: F.zhSerif, fontSize: 18, lineHeight: 1.5, color: C.inkFaint, marginTop: 6 }}>
          {item.textZh}
        </div>
      </div>
    </div>
  );
};

export const S3Features: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background hue="cyan" />
      <div style={{ position: "absolute", left: 200, top: 108, right: 200 }}>
        <div style={{ opacity: fadeIn(frame, 12, 18), transform: `translateY(${rise(frame, 12, 18)}px)` }}>
          <Kicker en={FEATURES.kicker.en} zh={FEATURES.kicker.zh} color={C.green} />
        </div>

        <div
          style={{
            marginTop: 34,
            fontFamily: F.enDisplay,
            fontSize: 66,
            color: C.ink,
            opacity: springIn(frame, 24),
            transform: `translateY(${rise(frame, 24, 30)}px)`,
          }}
        >
          What makes language, <span style={{ fontStyle: "italic", color: C.green }}>language</span>?
        </div>

        {/* 顶部细线生长 */}
        <div
          style={{
            width: map(frame, 50, 90, 0, 1520),
            height: 1,
            backgroundColor: C.line,
            marginTop: 30,
          }}
        />

        <div style={{ marginTop: 6 }}>
          {FEATURES.items.map((_, i) => (
            <Row key={i} index={i} />
          ))}
        </div>
      </div>

      <Caption text={FEATURES.titleZh} delay={40} />
    </AbsoluteFill>
  );
};
