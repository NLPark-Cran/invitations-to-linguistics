// 动效助手 —— spring 回弹入场（easeOutBack 手感）、级联、呼吸
import { interpolate, spring } from "remotion";
import { FPS } from "../tokens";

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 弹簧进度 0→1（damping 12 带过冲回弹，对应网页 --spring 手感） */
export const springIn = (frame: number, delay = 0, damping = 12): number =>
  spring({ frame: frame - delay, fps: FPS, config: { damping, stiffness: 130, mass: 0.9 } });

/** 线性淡入 0→1 */
export const fadeIn = (frame: number, delay = 0, dur = 20): number =>
  interpolate(frame - delay, [0, dur], [0, 1], CLAMP);

/** 上浮位移：配合 springIn，从 dist px 下方归位 */
export const rise = (frame: number, delay = 0, dist = 34, damping = 12): number =>
  (1 - springIn(frame, delay, damping)) * dist;

/** 通用区间映射（自动 clamp） */
export const map = (frame: number, i0: number, i1: number, o0: number, o1: number): number =>
  interpolate(frame, [i0, i1], [o0, o1], CLAMP);

/** 呼吸 0→1→0 正弦，period 单位帧 */
export const breathe = (frame: number, period = 90, phase = 0): number =>
  0.5 + 0.5 * Math.sin((frame / period) * Math.PI * 2 + phase);

/** 慢速漂浮位移（px） */
export const drift = (frame: number, amp = 6, period = 140, phase = 0): number =>
  amp * Math.sin((frame / period) * Math.PI * 2 + phase);
