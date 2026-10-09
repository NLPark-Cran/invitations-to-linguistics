// Scene 包装：0.5s 交叉淡化。相邻幕的 Sequence 交叠 FADE 帧，
// 本幕前 FADE 帧淡入、末 FADE 帧淡出，叠化在包装上完成，场景内部无需关心。
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FADE } from "../tokens";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Scene: React.FC<{
  durationInFrames: number;
  fadeIn?: boolean;
  fadeOut?: boolean;
  children: React.ReactNode;
}> = ({ durationInFrames, fadeIn = true, fadeOut = true, children }) => {
  const frame = useCurrentFrame();
  const oIn = fadeIn ? interpolate(frame, [0, FADE], [0, 1], CLAMP) : 1;
  const oOut = fadeOut ? interpolate(frame, [durationInFrames - FADE, durationInFrames], [1, 0], CLAMP) : 1;

  return <AbsoluteFill style={{ opacity: oIn * oOut }}>{children}</AbsoluteFill>;
};
