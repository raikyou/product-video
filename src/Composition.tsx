import React from 'react';
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { iris } from '@remotion/transitions/iris';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';

export const MainComposition: React.FC = () => {
  return (
    <TransitionSeries>
      {/* 场景 1: 问题场景 (0-15秒, 450帧) */}
      <TransitionSeries.Sequence durationInFrames={450}>
        <Scene1 />
      </TransitionSeries.Sequence>

      {/* 转场 1: fade (30帧, 1秒) */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      {/* 场景 2: 解决方案引入 (15-28秒, 360帧) */}
      <TransitionSeries.Sequence durationInFrames={360}>
        <Scene2 />
      </TransitionSeries.Sequence>

      {/* 转场 2: slide (25帧) */}
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-left' })}
        timing={springTiming({ config: { damping: 200 } })}
      />

      {/* 场景 3: 站点列表展示 (28-45秒, 485帧) */}
      <TransitionSeries.Sequence durationInFrames={485}>
        <Scene3 />
      </TransitionSeries.Sequence>

      {/* 转场 3: fade (20帧) */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景 4: 规则配置展示 (45-60秒, 430帧) */}
      <TransitionSeries.Sequence durationInFrames={430}>
        <Scene4 />
      </TransitionSeries.Sequence>

      {/* 转场 4: iris 圆形扩散 (30帧) */}
      <TransitionSeries.Transition
        presentation={iris({ width: 1920, height: 1080 })}
        timing={linearTiming({ durationInFrames: 30 })}
      />

      {/* 场景 5: 结尾 CTA (60-75秒, 420帧) */}
      <TransitionSeries.Sequence durationInFrames={420}>
        <Scene5 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
