// Root：注册 Composition "LingCh1"（1920×1080 · 30fps · 5400 帧）
// 幕间 0.5s 交叉淡化：相邻 Sequence 交叠 FADE 帧，Scene 组件负责透明度斜坡
import React from "react";
import { AbsoluteFill, Composition, Sequence } from "remotion";
import { C, DURATION, FADE, FPS, HEIGHT, SCENES, WIDTH } from "./tokens";
import { Scene } from "./components/Scene";
import { S0Title } from "./scenes/S0Title";
import { S1Opening } from "./scenes/S1Opening";
import { S2Definition } from "./scenes/S2Definition";
import { S3Features } from "./scenes/S3Features";
import { S4Functions } from "./scenes/S4Functions";
import { S5Linguistics } from "./scenes/S5Linguistics";
import { S6Branches } from "./scenes/S6Branches";
import { S7Distinctions } from "./scenes/S7Distinctions";
import { S8Closing } from "./scenes/S8Closing";
import { S9Research } from "./scenes/S9Research";

const SCENE_COMPONENTS = [
  S0Title,
  S1Opening,
  S2Definition,
  S3Features,
  S4Functions,
  S5Linguistics,
  S6Branches,
  S7Distinctions,
  S8Closing,
  S9Research,
];

const LingCh1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {SCENES.map((s, i) => {
        const first = i === 0;
        const last = i === SCENES.length - 1;
        // 除首幕外提前 FADE 帧开始，与上一幕末尾交叠
        const from = first ? s.start : s.start - FADE;
        const duration = s.end - from;
        const Comp = SCENE_COMPONENTS[i];
        return (
          <Sequence key={s.id} from={from} durationInFrames={duration}>
            <Scene durationInFrames={duration} fadeIn={!first} fadeOut={!last}>
              <Comp />
            </Scene>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LingCh1"
      component={LingCh1}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
