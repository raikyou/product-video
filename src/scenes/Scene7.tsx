import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const COLORS = {
  primary: '#0052D9',
  accent: '#0066FF',
  accentLight: '#85A5FF',
  background: '#0D1117',
  text: '#FFFFFF',
};

const features = [
  { icon: '🎯', text: '智能就近接入' },
  { icon: '🛡️', text: '自动备份容错' },
  { icon: '⚙️', text: '灵活规则配置' },
];

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo 弹性进入
  const logoScale = spring({
    fps,
    frame,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 脉冲光效
  const pulse = Math.sin((frame / 20) * Math.PI);
  const pulseIntensity = interpolate(pulse, [-1, 1], [0.5, 1]);

  // CTA 按钮动画
  const ctaFrame = 280;
  const ctaScale = spring({
    fps,
    frame: Math.max(0, frame - ctaFrame),
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const ctaOpacity = interpolate(
    frame,
    [ctaFrame, ctaFrame + 20],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // 呼吸动画
  const breathe = Math.sin((frame / 30) * Math.PI);
  const breatheScale = 1 + breathe * 0.05;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #0a1628 100%)`,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* 动态背景网格 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(0deg, rgba(0, 82, 217, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 82, 217, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: `${interpolate(frame, [0, 450], [0, 50])}px ${interpolate(frame, [0, 450], [0, 50])}px`,
          opacity: 0.4,
        }}
      />

      {/* 光效背景 */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          background: `radial-gradient(circle, ${COLORS.primary}${Math.floor(pulseIntensity * 100).toString(16).padStart(2, '0')}, transparent)`,
          opacity: 0.3,
          filter: 'blur(100px)',
        }}
      />

      {/* 主标题 */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: 0,
          right: 0,
          textAlign: 'center',
          transform: `scale(${Math.min(1, logoScale)})`,
          opacity: logoOpacity,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent}, ${COLORS.accentLight})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 30,
            filter: `drop-shadow(0 0 40px ${COLORS.accent})`,
          }}
        >
          站点管理
        </div>
        <div
          style={{
            fontSize: 48,
            color: COLORS.accentLight,
            opacity: interpolate(frame, [20, 40], [0, 0.9], { extrapolateRight: 'clamp' }),
          }}
        >
          让多地区部署的视频会议系统真正发挥价值
        </div>
      </div>

      {/* 特性列表 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: 60,
        }}
      >
        {features.map((feature, index) => {
          const startFrame = 80 + index * 30;
          const featureOpacity = interpolate(
            frame,
            [startFrame, startFrame + 20],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          const featureY = interpolate(
            frame,
            [startFrame, startFrame + 25],
            [50, 0],
            { extrapolateRight: 'clamp' }
          );

          const featureScale = spring({
            fps,
            frame: Math.max(0, frame - startFrame - 10),
            config: {
              damping: 15,
              stiffness: 100,
            },
          });

          return (
            <div
              key={index}
              style={{
                opacity: featureOpacity,
                transform: `translateY(${featureY}px) scale(${Math.min(1, featureScale)})`,
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${COLORS.accent}22 0%, ${COLORS.accent}11 100%)`,
                  border: `3px solid ${COLORS.accent}`,
                  borderRadius: 20,
                  padding: '40px 50px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 20,
                  minWidth: 300,
                  boxShadow: `0 8px 32px ${COLORS.accent}44`,
                }}
              >
                <div
                  style={{
                    fontSize: 80,
                    filter: `drop-shadow(0 0 20px ${COLORS.accent})`,
                  }}
                >
                  {feature.icon}
                </div>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 'bold',
                    color: COLORS.text,
                    textAlign: 'center',
                  }}
                >
                  {feature.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA 按钮 */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: `translate(-50%, 0) scale(${Math.min(1, ctaScale * breatheScale)})`,
          opacity: ctaOpacity,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
            color: COLORS.text,
            padding: '30px 80px',
            borderRadius: 16,
            fontSize: 56,
            fontWeight: 'bold',
            boxShadow: `
              0 0 ${40 * pulseIntensity}px ${COLORS.accent}${Math.floor(pulseIntensity * 255).toString(16).padStart(2, '0')},
              0 8px 32px rgba(0, 0, 0, 0.3)
            `,
            cursor: 'pointer',
            border: `3px solid ${COLORS.accentLight}`,
          }}
        >
          立即体验
        </div>
      </div>

      {/* 装饰粒子 */}
      {Array.from({ length: 15 }, (_, i) => {
        const particleX = (i * 7 + 10) % 100;
        const particleY = ((i * 13 + 20) % 80);
        const particleSpeed = (i % 3) + 1;

        const particleOpacity = interpolate(
          frame,
          [200, 250],
          [0, 0.4],
          { extrapolateRight: 'clamp' }
        );

        const particleYOffset = interpolate(
          frame,
          [0, 450],
          [0, -100 * particleSpeed],
          { extrapolateRight: 'extend' }
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${particleX}%`,
              top: `${(particleY + particleYOffset) % 100}%`,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: COLORS.accentLight,
              boxShadow: `0 0 10px ${COLORS.accentLight}`,
              opacity: particleOpacity,
            }}
          />
        );
      })}

      {/* 全局淡出 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: COLORS.background,
          opacity: interpolate(frame, [400, 450], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      />
    </AbsoluteFill>
  );
};
