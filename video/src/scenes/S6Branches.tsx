// S6 branches（3360-3960，20s）：核心六分支 + 宏观四分支地图式陈列，
// Computational Linguistics 以青色桥梁高亮（通往 Part 3）
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BranchItem, BRANCHES } from "../data";
import { C, F } from "../tokens";
import { breathe, fadeIn, map, rise, springIn } from "../components/anim";
import { Background } from "../components/Background";
import { Kicker } from "../components/Kicker";
import { Caption } from "../components/Caption";

// ---- 地图坐标 ----
const HUB = { x: 960, y: 590, r: 96 };
const LEFT = { x: 200, w: 400, edge: 600 }; // 节点右缘
const RIGHT = { x: 1320, w: 400, edge: 1320 }; // 节点左缘
const leftY = BRANCHES.core.map((_, i) => 320 + i * 92); // 节点中心 y
const rightY = BRANCHES.macro.map((_, i) => 350 + i * 120);

const NodeCard: React.FC<{
  item: BranchItem;
  side: "left" | "right";
  index: number;
  top: number;
  at: number;
}> = ({ item, side, index, top, at }) => {
  const frame = useCurrentFrame();
  const enter = springIn(frame, at);
  const glow = breathe(frame, 80, index);
  const isBridge = !!item.bridge;

  return (
    <div
      style={{
        position: "absolute",
        left: side === "left" ? LEFT.x : RIGHT.x,
        top: top - 40,
        width: side === "left" ? LEFT.w : RIGHT.w,
        opacity: enter,
        transform: `translateY(${rise(frame, at, 26)}px) scale(${0.94 + enter * 0.06})`,
      }}
    >
      <div
        style={{
          backgroundColor: isBridge ? C.bgRaise : C.bgSoft,
          border: `1px solid ${isBridge ? `rgba(127,216,232,${0.55 + glow * 0.35})` : C.line}`,
          borderRadius: 14,
          padding: "16px 24px 18px",
          boxShadow: isBridge
            ? `0 0 ${24 + glow * 22}px rgba(127,216,232,${0.16 + glow * 0.14}), 0 12px 36px rgba(0,0,0,.35)`
            : "0 1px 3px rgba(0,0,0,.25), 0 10px 28px rgba(0,0,0,.26)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span
            style={{
              fontFamily: F.enDisplay,
              fontSize: isBridge ? 25 : 27,
              color: isBridge ? C.cyan : C.ink,
            }}
          >
            {item.termEn}
          </span>
          {item.group && (
            <span
              style={{
                marginLeft: "auto",
                fontFamily: F.zhUi,
                fontSize: 15,
                color: C.violet,
                backgroundColor: C.violetSoft,
                borderRadius: 999,
                padding: "3px 12px",
                whiteSpace: "nowrap",
              }}
            >
              {item.group}
            </span>
          )}
        </div>
        <div
          style={{
            fontFamily: F.zhSerif,
            fontSize: 17,
            color: C.inkFaint,
            marginTop: 5,
            letterSpacing: "0.08em",
          }}
        >
          {item.termZh} · {isBridge ? "语言 × 计算" : item.textZh}
        </div>
      </div>

      {/* 桥梁标签 */}
      {isBridge && (
        <div
          style={{
            marginTop: 12,
            display: "inline-block",
            fontFamily: F.mono,
            fontSize: 16,
            letterSpacing: "0.18em",
            color: C.cyan,
            backgroundColor: C.cyanSoft,
            border: `1px solid rgba(127,216,232,.35)`,
            borderRadius: 999,
            padding: "6px 18px",
            whiteSpace: "nowrap",
            opacity: fadeIn(frame, at + 26, 18),
          }}
        >
          {item.textZh}
        </div>
      )}
    </div>
  );
};

export const S6Branches: React.FC = () => {
  const frame = useCurrentFrame();
  const hubEnter = springIn(frame, 36);
  const hubGlow = breathe(frame, 90);

  const lineAt = (side: "left" | "right", i: number) =>
    side === "left" ? 60 + i * 20 : 190 + i * 24;

  return (
    <AbsoluteFill>
      <Background hue="cyan" />
      <div style={{ position: "absolute", left: 200, top: 88, right: 200 }}>
        <div style={{ opacity: fadeIn(frame, 10, 18), transform: `translateY(${rise(frame, 10, 16)}px)` }}>
          <Kicker en={BRANCHES.kicker.en} zh={BRANCHES.kicker.zh} color={C.cyan} />
        </div>
        <div
          style={{
            marginTop: 20,
            fontFamily: F.enDisplay,
            fontSize: 54,
            color: C.ink,
            opacity: springIn(frame, 20),
            transform: `translateY(${rise(frame, 20, 24)}px)`,
          }}
        >
          One discipline, <span style={{ fontStyle: "italic", color: C.cyan }}>many doors</span>.
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: F.zhSerif,
            fontSize: 20,
            color: C.inkFaint,
            letterSpacing: "0.1em",
            opacity: fadeIn(frame, 40, 22),
          }}
        >
          {BRANCHES.bodyZh}
        </div>
      </div>

      {/* 分组标签 */}
      <div
        style={{
          position: "absolute",
          left: LEFT.x,
          top: 252,
          fontFamily: F.mono,
          fontSize: 19,
          letterSpacing: "0.3em",
          color: C.accent,
          opacity: fadeIn(frame, 46, 18),
        }}
      >
        CORE <span style={{ fontFamily: F.zhSerif, color: C.inkFaint, letterSpacing: "0.14em" }}>核心分支</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: RIGHT.x,
          top: 252,
          fontFamily: F.mono,
          fontSize: 19,
          letterSpacing: "0.3em",
          color: C.violet,
          opacity: fadeIn(frame, 170, 18),
        }}
      >
        MACRO <span style={{ fontFamily: F.zhSerif, color: C.inkFaint, letterSpacing: "0.14em" }}>宏观分支</span>
      </div>

      {/* 连接线：细线逐条生长 */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {leftY.map((y, i) => (
          <path
            key={`l${i}`}
            d={`M ${HUB.x - HUB.r} ${HUB.y} C 800 ${HUB.y}, 720 ${y}, ${LEFT.edge} ${y}`}
            fill="none"
            stroke={C.cyan}
            strokeWidth={1.2}
            opacity={0.5}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - map(frame, lineAt("left", i), lineAt("left", i) + 26, 0, 1)}
          />
        ))}
        {rightY.map((y, i) => (
          <path
            key={`r${i}`}
            d={`M ${HUB.x + HUB.r} ${HUB.y} C 1120 ${HUB.y}, 1200 ${y}, ${RIGHT.edge} ${y}`}
            fill="none"
            stroke={i === 3 ? C.cyan : C.violet}
            strokeWidth={i === 3 ? 2 : 1.2}
            opacity={i === 3 ? 0.9 : 0.5}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - map(frame, lineAt("right", i), lineAt("right", i) + 26, 0, 1)}
          />
        ))}
      </svg>

      {/* 中心枢纽 */}
      <div
        style={{
          position: "absolute",
          left: HUB.x - HUB.r,
          top: HUB.y - HUB.r,
          width: HUB.r * 2,
          height: HUB.r * 2,
          borderRadius: "50%",
          backgroundColor: C.bgRaise,
          border: `1.5px solid rgba(240,201,107,${0.4 + hubGlow * 0.3})`,
          boxShadow: `0 0 ${30 + hubGlow * 30}px rgba(240,201,107,${0.12 + hubGlow * 0.1})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          opacity: hubEnter,
          transform: `scale(${0.85 + hubEnter * 0.15})`,
        }}
      >
        <span style={{ fontFamily: F.enUi, fontSize: 21, letterSpacing: "0.22em", color: C.accent }}>
          {BRANCHES.hub.en}
        </span>
        <span style={{ fontFamily: F.zhSerif, fontSize: 19, color: C.inkDim, letterSpacing: "0.2em" }}>
          {BRANCHES.hub.zh}
        </span>
      </div>

      {/* 左右节点 */}
      {BRANCHES.core.map((item, i) => (
        <NodeCard key={item.termEn} item={item} side="left" index={i} top={leftY[i]} at={lineAt("left", i) + 12} />
      ))}
      {BRANCHES.macro.map((item, i) => (
        <NodeCard key={item.termEn} item={item} side="right" index={i} top={rightY[i]} at={lineAt("right", i) + 12} />
      ))}

      <Caption text={BRANCHES.titleZh} delay={40} />
    </AbsoluteFill>
  );
};
