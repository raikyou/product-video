import React from 'react';
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
import { Scene8 } from './scenes/Scene8';
import { Scene9 } from './scenes/Scene9';

export const ProductDemo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Pain point introduction - Server overload (0-240 frames) */}
      <TransitionSeries.Sequence durationInFrames={240}>
        <Scene1 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* Scene 2: Four major disasters (260-560 frames) */}
      <TransitionSeries.Sequence durationInFrames={300}>
        <Scene2 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* Scene 3: Solution introduction (580-760 frames) */}
      <TransitionSeries.Sequence durationInFrames={180}>
        <Scene3 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* Scene 4: Core capability 1 - Nearby access (780-1140 frames) */}
      <TransitionSeries.Sequence durationInFrames={360}>
        <Scene4 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* Scene 5: Core capability 2 - Meeting isolation (1160-1520 frames) */}
      <TransitionSeries.Sequence durationInFrames={360}>
        <Scene5 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* Scene 6: Core capability 3 - Local recording (1540-1840 frames) */}
      <TransitionSeries.Sequence durationInFrames={300}>
        <Scene6 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* Scene 7: Core capability 4 - Smart failover (1860-2100 frames) */}
      <TransitionSeries.Sequence durationInFrames={240}>
        <Scene7 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* Scene 8: Before/After comparison (2120-2360 frames) */}
      <TransitionSeries.Sequence durationInFrames={240}>
        <Scene8 />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* Scene 9: Call to action (2380-2520 frames) */}
      <TransitionSeries.Sequence durationInFrames={140}>
        <Scene9 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
