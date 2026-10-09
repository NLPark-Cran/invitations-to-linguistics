// S4 functions（1530-2070，18s）：七种功能，4+3 紧凑网格（模块色橙）
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { fadeIn, rise, springIn } from "../components/anim";
import { Background } from "../components/Background";
import { Kicker } from "../components/Kicker";
import { Caption } from "../components/Caption";
import { Stamp } from "../components/Stamp";
import { FUNCTIONS } from "../data";

const CARD_W = 363;
const CARD_H = 236;

const FnCard: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const item = FUNCTIONS.items[index];
  const at = 36 + index * 20; // 快速级联
  const enter = springIn(frame, at, 13);
  const flash = Math.max(0, 1 - Math.abs(frame - (at + 13)) / 20); // 入场脉冲辉光

  return (
    <div
      style={{
        width: CARD_W,
        height: CARD_H,
        backgroundColor: C.bgSoft,
        border: `1px solid ${flash > 0.05 ? `rgba(232,161,92,${0.14 + flash * 0.4})` : C.line}`,
        borderRadius: 14,
        padding: "22px 26px",
        opacity: enter,
        transform: `translateY(${rise(frame, at, 28, 13)}px) scale(${0.94 + enter * 0.06})`,
        boxShadow: `0 0 ${flash * 44}px rgba(232,161,92,${flash * 0.22}), 0 1px 3px rgba(0,0,0,.25), 0 10px 30px rgba(0,0,0,.28)`,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <span style={{ fontFamily: F.mono, fontSize: 20, color: C.orange }}>0{index + 1}</span>
        <span style={{ fontFamily: F.enDisplay, fontSize: 31, color: C.ink }}>{item.termEn}</span>
      </div>
      <div
        style={{
          fontFamily: F.zhSerif,
          fontSize: 19,
          color: C.inkDim,
          letterSpacing: "0.12em",
          marginTop: 4,
        }}
      >
        {item.termZh}
      </div>
      <div
        style={{
          fontFamily: F.enDisplay,
          fontSize: 17,
          lineHeight: 1.42,
          color: C.inkDim,
          marginTop: 14,
        }}
      >
        {item.textEn}
      </div>
      <div
        style={{
          fontFamily: F.zhSerif,
          fontSize: 16,
          lineHeight: 1.45,
          color: C.inkFaint,
          marginTop: 6,
        }}
      >
        {item.textZh}
      </div>
    </div>
  );
};

export const S4Functions: React.FC = () => {
  const frame = useCurrentFrame();
  const top = FUNCTIONS.items.slice(0, 4);
  const bottom = FUNCTIONS.items.slice(4);

  return (
    <AbsoluteFill>
      <Background hue="gold" />
      <Stamp text="CH.1 · 03 · FUNCTIONS · n = 7" color={C.orange} delay={8} />
      <div style={{ position: "absolute", left: 200, top: 96, right: 200 }}>
        <div
          style={{
            opacity: fadeIn(frame, 8, 14),
            transform: `translateY(${rise(frame, 8, 18)}px)`,
          }}
        >
          <Kicker en={FUNCTIONS.kicker.en} zh={FUNCTIONS.kicker.zh} color={C.orange} />
        </div>

        <div
          style={{
            marginTop: 24,
            fontFamily: F.enDisplay,
            fontSize: 62,
            color: C.ink,
            opacity: springIn(frame, 14),
            transform: `translateY(${rise(frame, 14, 28)}px)`,
          }}
        >
          Seven jobs for{" "}
          <span style={{ fontStyle: "italic", color: C.orange, textShadow: "0 0 34px rgba(232,161,92,.5)" }}>
            one tool
          </span>
          .
        </div>

        {/* 上排 4 张 */}
        <div style={{ marginTop: 46, display: "flex", gap: 22 }}>
          {top.map((_, i) => (
            <FnCard key={i} index={i} />
          ))}
        </div>
        {/* 下排 3 张，居中 */}
        <div style={{ marginTop: 22, display: "flex", gap: 22, justifyContent: "center" }}>
          {bottom.map((_, i) => (
            <FnCard key={i + 4} index={i + 4} />
          ))}
        </div>
      </div>

      <Caption text={FUNCTIONS.titleZh} hl="七种用途" color={C.orange} delay={24} />
    </AbsoluteFill>
  );
};
