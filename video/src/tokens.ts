// Design tokens —— 与 web/css/style.css :root、PRD.md「定稿设计令牌」一一对应
// 深空感（Deep-space editorial）：深黑底 + 暖纸白衬线大字 + 暖金高亮 + 细线图解

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 5400; // 180s
export const FADE = 15; // 幕间交叉淡化 0.5s

// ---- 色彩令牌 ----
export const C = {
  bg: "#0B0B10",
  bgSoft: "#12121A",
  bgRaise: "#1A1A24",
  ink: "#F2EDE3",
  inkDim: "rgba(242,237,227,.58)",
  inkFaint: "rgba(242,237,227,.32)",
  line: "rgba(242,237,227,.14)",
  accent: "#F0C96B",
  accentSoft: "rgba(240,201,107,.12)",
  cyan: "#7FD8E8",
  cyanSoft: "rgba(127,216,232,.12)",
  opp: "#FF5C7A",
  oppSoft: "rgba(255,92,122,.12)",
  violet: "#B79CFF",
  violetSoft: "rgba(183,156,255,.14)",
  green: "#8FD9A8",
  greenSoft: "rgba(143,217,168,.12)",
  orange: "#E8A15C", // 图谱 functions 模块色
  orangeSoft: "rgba(232,161,92,.12)",
} as const;

// ---- 字体令牌（渲染机无 STSong，中文宋体 SimSun 优先）----
export const F = {
  enDisplay: 'Georgia, "Times New Roman", serif',
  enUi: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
  zhSerif: '"SimSun", "STSong", "Noto Serif CJK SC", serif',
  zhUi: '"Microsoft YaHei", "PingFang SC", sans-serif',
  mono: 'Consolas, "Cascadia Code", monospace',
} as const;

// ---- 分镜时间轴（全局帧）----
export interface SceneDef {
  id: string;
  start: number;
  end: number;
}

export const SCENES: SceneDef[] = [
  { id: "S0", start: 0, end: 240 }, // 片头 8s
  { id: "S1", start: 240, end: 840 }, // opening hook 20s
  { id: "S2", start: 840, end: 1500 }, // definition 22s
  { id: "S3", start: 1500, end: 2160 }, // features 22s
  { id: "S4", start: 2160, end: 2820 }, // functions 22s
  { id: "S5", start: 2820, end: 3360 }, // linguistics triad 18s
  { id: "S6", start: 3360, end: 3960 }, // branches map 20s
  { id: "S7", start: 3960, end: 4560 }, // distinctions 20s
  { id: "S8", start: 4560, end: 4980 }, // closing 14s
  { id: "S9", start: 4980, end: 5400 }, // 研究预告 + 署名 14s
];
