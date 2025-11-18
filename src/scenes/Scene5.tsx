import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';

const COLORS = {
  primary: '#0052D9',
  accent: '#0066FF',
  accentLight: '#85A5FF',
  background: '#0D1117',
  success: '#00C853',
  text: '#FFFFFF',
  textSecondary: '#8B949E',
};

interface RuleFeature {
  icon: string;
  title: string;
  description: string;
  benefit: string;
  color: string;
}

const ruleFeatures: RuleFeature[] = [
  {
    icon: '🏢',
    title: '会议室规则',
    description: '重要会议室录制存本地',
    benefit: '安全又快速',
    color: COLORS.primary,
  },
  {
    icon: '🌐',
    title: 'IP规则',
    description: 'IP地址段自动就近接入',
    benefit: '延迟降低70%',
    color: COLORS.accent,
  },
  {
    icon: '👥',
    title: '部门规则',
    description: '部门专属站点资源隔离',
    benefit: 'VIP会议质量保障',
    color: COLORS.accentLight,
  },
];

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 弹窗界面动画
  const modalOpacity = interpolate(
    frame,
    [0, 30],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  const modalScale = spring({
    fps,
    frame,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  // 功能卡片分阶段出现
  const getCardAnimation = (index: number) => {
    const startFrame = 60 + index * 80;
    const endFrame = startFrame + 70;

    const opacity = interpolate(
      frame,
      [startFrame, startFrame + 20],
      [0, 1],
      { extrapolateRight: 'clamp' }
    );

    const x = interpolate(
      frame,
      [startFrame, startFrame + 30],
      [-100, 0],
      { extrapolateRight: 'clamp' }
    );

    const scale = spring({
      fps,
      frame: Math.max(0, frame - startFrame - 10),
      config: {
        damping: 15,
        stiffness: 100,
      },
    });

    // 数据动画
    const dataOpacity = interpolate(
      frame,
      [startFrame + 40, startFrame + 60],
      [0, 1],
      { extrapolateRight: 'clamp' }
    );

    return { opacity, x, scale, dataOpacity, isActive: frame >= startFrame && frame < endFrame };
  };

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #0a1628 100%)`,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* 背景网格 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(0deg, rgba(0, 82, 217, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 82, 217, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.4,
        }}
      />

      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          智能接入规则
        </div>
      </div>

      {/* 弹窗界面背景 */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '50%',
          transform: `translate(-50%, 0) scale(${Math.min(1, modalScale * 0.6)})`,
          opacity: modalOpacity * 0.8,
          width: 1000,
          height: 650,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          border: `2px solid ${COLORS.accent}44`,
        }}
      >
        <Img
          src={staticFile('image-7.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3,
          }}
        />
      </div>

      {/* 功能卡片列表 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -45%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
          width: 1500,
        }}
      >
        {ruleFeatures.map((feature, index) => {
          const animation = getCardAnimation(index);

          return (
            <div
              key={index}
              style={{
                opacity: animation.opacity,
                transform: `translateX(${animation.x}px) scale(${Math.min(1, animation.scale)})`,
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${feature.color}22 0%, ${feature.color}11 100%)`,
                  border: `3px solid ${feature.color}`,
                  borderRadius: 20,
                  padding: '40px 50px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 50,
                  boxShadow: `0 8px 32px ${feature.color}44`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* 背景光效 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 300,
                    height: 300,
                    background: `radial-gradient(circle, ${feature.color}44, transparent)`,
                    opacity: 0.5,
                  }}
                />

                {/* 图标 */}
                <div
                  style={{
                    fontSize: 100,
                    filter: `drop-shadow(0 0 20px ${feature.color})`,
                    minWidth: 120,
                    textAlign: 'center',
                  }}
                >
                  {feature.icon}
                </div>

                {/* 内容 */}
                <div style={{ flex: 1, position: 'relative' }}>
                  <div
                    style={{
                      fontSize: 52,
                      fontWeight: 'bold',
                      color: COLORS.text,
                      marginBottom: 15,
                    }}
                  >
                    {feature.title}
                  </div>
                  <div
                    style={{
                      fontSize: 36,
                      color: COLORS.textSecondary,
                      marginBottom: 10,
                    }}
                  >
                    {feature.description}
                  </div>
                </div>

                {/* 效益标签 */}
                <div
                  style={{
                    opacity: animation.dataOpacity,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                      color: COLORS.text,
                      padding: '20px 35px',
                      borderRadius: 12,
                      fontSize: 40,
                      fontWeight: 'bold',
                      boxShadow: `0 4px 20px ${feature.color}88`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ✓ {feature.benefit}
                  </div>
                </div>

                {/* 装饰线 */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 6,
                    background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 地图可视化 */}
      <div
        style={{
          position: 'absolute',
          bottom: -50,
          right: -100,
          width: 600,
          height: 600,
          opacity: interpolate(frame, [300, 350], [0, 0.2], { extrapolateRight: 'clamp' }),
        }}
      >
        <img
          src="/china.svg"
          alt="China Map"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'hue-rotate(120deg)',
          }}
        />
      </div>

      {/* 底部总结文案 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [500, 530], [0, 1], { extrapolateRight: 'clamp' }),
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
          按需分配资源，精准高效
        </div>
      </div>

      {/* 淡出效果 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: COLORS.background,
          opacity: interpolate(frame, [580, 600], [0, 0.3], { extrapolateRight: 'clamp' }),
        }}
      />
    </AbsoluteFill>
  );
};
