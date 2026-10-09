// 深空背景：纯色底 + 两层呼吸径向光晕 + 暗角，克制不花哨
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../tokens";
import { breathe, drift } from "./anim";

export const Background: React.FC<{ hue?: "gold" | "cyan" | "opp" }> = ({ hue = "gold" }) => {
  const frame = useCurrentFrame();
  const color = hue === "cyan" ? C.cyan : hue === "opp" ? C.opp : C.accent;
  const b1 = breathe(frame, 110);
  const b2 = breathe(frame, 160, Math.PI / 2);
  const dx = drift(frame, 40, 200);
  const dy = drift(frame, 26, 170, 1.3);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* 主光晕：随幕次换色相，缓慢呼吸 + 漂浮 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(900px 620px at ${68 + dx / 24}% ${30 + dy / 24}%, ${color}14, transparent 70%)`,
          opacity: 0.55 + b1 * 0.45,
        }}
      />
      {/* 次光晕：冷青补光，反相位 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(760px 540px at ${18 - dx / 30}% ${78 - dy / 30}%, ${C.cyan}0D, transparent 70%)`,
          opacity: 0.4 + b2 * 0.4,
        }}
      />
      {/* 暗角，聚拢视线 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(140% 110% at 50% 46%, transparent 55%, rgba(0,0,0,.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
