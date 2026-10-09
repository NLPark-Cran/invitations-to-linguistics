// S7 distinctions（2940-3420，16s）：四对区分，VS 对撞式呈现（品红强调）
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { breathe, fadeIn, map, springIn } from "../components/anim";
import { Background } from "../components/Background";
import { Kicker } from "../components/Kicker";
import { Caption } from "../components/Caption";
import { Stamp } from "../components/Stamp";
import { DISTINCTIONS, PairItem } from "../data";

const PairRow: React.FC<{ item: PairItem; index: number }> = ({ item, index }) => {
  const frame = useCurrentFrame();
  const at = 36 + index * 48;
  const eL = springIn(frame, at, 11);
  const eR = springIn(frame, at + 5, 11);
  const eV = springIn(frame, at + 11, 9); // VS 重回弹，对撞感
  const pulse = breathe(frame, 60, index * 1.2);
  const crash = Math.max(0, 1 - Math.abs(frame - (at + 18)) / 18); // 对撞瞬间爆闪

  const termCard = (en: string, zh: string, align: "left" | "right") => (
    <div
      style={{
        width: 330,
        backgroundColor: C.bgSoft,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        padding: "18px 26px 20px",
        textAlign: align,
        flexShrink: 0,
      }}
    >
      <div style={{ fontFamily: F.enDisplay, fontSize: 34, color: C.ink, lineHeight: 1.1 }}>{en}</div>
      <div style={{ fontFamily: F.zhSerif, fontSize: 19, color: C.inkDim, marginTop: 5, letterSpacing: "0.12em" }}>
        {zh}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
      {/* 左项：从左撞入 */}
      <div style={{ opacity: eL, transform: `translateX(${(1 - eL) * -70}px)` }}>
        {termCard(item.leftEn, item.leftZh, "left")}
      </div>

      {/* VS 徽章：品红，呼吸光晕 */}
      <div
        style={{
          width: 66,
          height: 66,
          borderRadius: "50%",
          backgroundColor: C.oppSoft,
          border: `1.5px solid rgba(255,92,122,${0.55 + pulse * 0.3 + crash * 0.15})`,
          boxShadow: `0 0 ${18 + pulse * 20 + crash * 46}px rgba(255,92,122,${0.24 + pulse * 0.16 + crash * 0.4})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: F.mono,
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: C.opp,
          flexShrink: 0,
          opacity: eV,
          transform: `scale(${0.6 + eV * 0.4})`,
        }}
      >
        VS
      </div>

      {/* 右项：从右撞入 */}
      <div style={{ opacity: eR, transform: `translateX(${(1 - eR) * 70}px)` }}>
        {termCard(item.rightEn, item.rightZh, "left")}
      </div>

      {/* 注释 */}
      <div style={{ flex: 1, opacity: fadeIn(frame, at + 18, 16), paddingLeft: 26 }}>
        <div style={{ fontFamily: F.enDisplay, fontSize: 21, lineHeight: 1.45, color: C.inkDim }}>
          {item.noteEn}
        </div>
        <div style={{ fontFamily: F.zhSerif, fontSize: 18, lineHeight: 1.5, color: C.inkFaint, marginTop: 5 }}>
          {item.noteZh}
        </div>
      </div>
    </div>
  );
};

export const S7Distinctions: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background hue="opp" />
      <Stamp text="CH.1 · 06 · VS · n = 4" color={C.opp} delay={8} />
      <div style={{ position: "absolute", left: 200, top: 92, right: 200 }}>
        <div style={{ opacity: fadeIn(frame, 8, 14), transform: `translateY(${(1 - springIn(frame, 8)) * 18}px)` }}>
          <Kicker en={DISTINCTIONS.kicker.en} zh={DISTINCTIONS.kicker.zh} color={C.opp} />
        </div>

        <div
          style={{
            marginTop: 22,
            fontFamily: F.enDisplay,
            fontSize: 60,
            color: C.ink,
            opacity: springIn(frame, 14),
            transform: `translateY(${(1 - springIn(frame, 14)) * 28}px)`,
          }}
        >
          Draw the lines{" "}
          <span style={{ fontStyle: "italic", color: C.opp, textShadow: "0 0 34px rgba(255,92,122,.5)" }}>
            first
          </span>
          .
        </div>

        {/* 顶部细线 */}
        <div
          style={{
            width: map(frame, 22, 46, 0, 1520),
            height: 1,
            backgroundColor: C.line,
            marginTop: 30,
          }}
        />

        {/* 四行对撞 */}
        <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 32 }}>
          {DISTINCTIONS.items.map((item, i) => (
            <PairRow key={item.leftEn} item={item} index={i} />
          ))}
        </div>
      </div>

      <Caption text={DISTINCTIONS.titleZh} hl="界限" color={C.opp} delay={22} />
    </AbsoluteFill>
  );
};
