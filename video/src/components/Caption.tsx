// Caption：底部中文字幕条（SimSun 宋体小字，宽字距，居中）
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { fadeIn } from "./anim";

export const Caption: React.FC<{ text: string; delay?: number }> = ({ text, delay = 40 }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 60,
        textAlign: "center",
        opacity: fadeIn(frame, delay, 24),
        fontFamily: F.zhSerif,
        fontSize: 25,
        letterSpacing: "0.14em",
        color: C.inkFaint,
      }}
    >
      {text}
    </div>
  );
};
