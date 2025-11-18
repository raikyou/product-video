import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const COLORS = {
  primary: '#0052D9',
  accent: '#0066FF',
  background: '#0D1117',
  danger: '#FF4D4F',
  warning: '#FFB300',
  text: '#FFFFFF',
  textSecondary: '#8B949E',
};

interface ProblemItem {
  icon: string;
  title: string;
  color: string;
}

const problems: ProblemItem[] = [
  { icon: '⏱️', title: '视频延迟高', color: COLORS.danger },
  { icon: '🖥️', title: '总部压力大', color: COLORS.warning },
  { icon: '📁', title: '录制文件难管理', color: COLORS.accent },
];

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1a1f2e 100%)`,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* 动态网格背景 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(0deg, rgba(255, 77, 79, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 77, 79, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.3,
        }}
      />

      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: 200,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `translateY(${interpolate(frame, [0, 20], [-50, 0], { extrapolateRight: 'clamp' })}px)`,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: COLORS.textSecondary,
          }}
        >
          当前面临的问题
        </div>
      </div>

      {/* 问题卡片容器 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: 80,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {problems.map((problem, index) => {
          const startFrame = 20 + index * 15;

          // 3D 卡片翻转效果
          const rotateY = interpolate(
            frame,
            [startFrame, startFrame + 30],
            [90, 0],
            { extrapolateRight: 'clamp' }
          );

          const opacity = interpolate(
            frame,
            [startFrame, startFrame + 30],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          // 弹性缩放
          const scale = spring({
            fps,
            frame: Math.max(0, frame - startFrame - 15),
            config: {
              damping: 15,
              stiffness: 100,
            },
          });

          // 脉冲效果
          const pulse = Math.sin(((frame - startFrame) / 15) * Math.PI);
          const glowIntensity = interpolate(pulse, [-1, 1], [0.3, 0.7]);

          return (
            <div
              key={index}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                style={{
                  width: 400,
                  height: 400,
                  background: `linear-gradient(135deg, ${problem.color}22 0%, ${problem.color}11 100%)`,
                  borderRadius: 24,
                  border: `3px solid ${problem.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 30,
                  transform: `rotateY(${rotateY}deg) scale(${Math.min(1, scale)})`,
                  opacity,
                  backfaceVisibility: 'hidden',
                  boxShadow: `
                    0 0 ${30 * glowIntensity}px ${problem.color}${Math.floor(glowIntensity * 255).toString(16).padStart(2, '0')},
                    0 8px 32px rgba(0, 0, 0, 0.3)
                  `,
                }}
              >
                {/* 图标 */}
                <div
                  style={{
                    fontSize: 120,
                    filter: `drop-shadow(0 0 20px ${problem.color})`,
                  }}
                >
                  {problem.icon}
                </div>

                {/* 标题 */}
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 'bold',
                    color: COLORS.text,
                    textAlign: 'center',
                    textShadow: `0 0 20px ${problem.color}`,
                  }}
                >
                  {problem.title}
                </div>

                {/* 装饰线 */}
                <div
                  style={{
                    width: '60%',
                    height: 4,
                    background: problem.color,
                    borderRadius: 2,
                    boxShadow: `0 0 10px ${problem.color}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 底部文案 */}
      <div
        style={{
          position: 'absolute',
          bottom: 150,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            color: COLORS.text,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
          }}
        >
          这些问题，急需解决
        </div>
      </div>

      {/* 淡出到下一场景 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: COLORS.background,
          opacity: interpolate(frame, [130, 150], [0, 0.5], { extrapolateRight: 'clamp' }),
        }}
      />
    </AbsoluteFill>
  );
};
