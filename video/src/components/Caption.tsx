// Caption：底部大字幕条（小红书知识视频风格）
// 白色主文 + 关键词彩色高亮（带辉光），SimSun 34px，底部居中
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, F } from "../tokens";
import { fadeIn } from "./anim";

export const Caption: React.FC<{
  text: string;
  delay?: number;
  hl?: string; // 需要彩色高亮的关键词（取第一次出现）
  color?: string; // 高亮色，默认暖金
  opacity?: number; // 外部接管透明度（多段字幕交叉淡化时用）
}> = ({ text, delay = 30, hl, color = C.accent, opacity }) => {
  const frame = useCurrentFrame();
  const o = opacity !== undefined ? opacity : fadeIn(frame, delay, 16);

  // 拆分关键词：前缀 / 高亮词 / 后缀
  let body: React.ReactNode = text;
  if (hl && text.includes(hl)) {
    const idx = text.indexOf(hl);
    body = (
      <>
        {text.slice(0, idx)}
        <span style={{ color, textShadow: `0 0 22px ${color}B3, 0 0 46px ${color}59` }}>{hl}</span>
        {text.slice(idx + hl.length)}
      </>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        right: 100,
        bottom: 56,
        textAlign: "center",
        opacity: o,
        fontFamily: F.zhSerif,
        fontSize: 32,
        lineHeight: 1.4,
        letterSpacing: "0.08em",
        color: C.ink,
        textShadow: "0 2px 26px rgba(0,0,0,.85), 0 0 12px rgba(0,0,0,.6)",
      }}
    >
      {body}
    </div>
  );
};
