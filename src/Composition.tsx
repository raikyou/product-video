import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';
import { Scene5 } from './scenes/Scene5';
import { Scene6 } from './scenes/Scene6';
import { Scene7 } from './scenes/Scene7';

export const MainComposition: React.FC = () => {
  return (
    <TransitionSeries>
      {/* 场景1: 痛点呈现 (0-5秒, 150帧) */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <Scene1 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景2: 问题放大 (5-10秒, 150帧) */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <Scene2 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景3: 解决方案登场 (10-15秒, 150帧) */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <Scene3 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: 25 })}
      />

      {/* 场景4: 站点列表管理 (15-30秒, 450帧) */}
      <TransitionSeries.Sequence durationInFrames={450}>
        <Scene4 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景5: 接入规则配置 (30-50秒, 600帧) */}
      <TransitionSeries.Sequence durationInFrames={600}>
        <Scene5 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-left' })}
        timing={linearTiming({ durationInFrames: 25 })}
      />

      {/* 场景6: 效果对比 (50-60秒, 300帧) */}
      <TransitionSeries.Sequence durationInFrames={300}>
        <Scene6 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 场景7: 结尾CTA (60-75秒, 450帧) */}
      <TransitionSeries.Sequence durationInFrames={450}>
        <Scene7 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
