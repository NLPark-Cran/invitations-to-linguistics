// Stamp：等宽字体小注（Consolas），制造「实验记录」仪式感
// 形如 CH.1 · 03 · FUNCTIONS / n = 7，右上角，带一颗模块色小圆点
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { fadeIn } from "./anim";

export const Stamp: React.FC<{ text: string; color?: string; delay?: number }> = ({
  text,
  color = C.accent,
  delay = 10,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        right: 200,
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: F.mono,
        fontSize: 17,
        letterSpacing: "0.22em",
        color: C.inkFaint,
        opacity: fadeIn(frame, delay, 18),
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      {text}
    </div>
  );
};
