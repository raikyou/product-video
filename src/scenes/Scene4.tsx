import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';

const COLORS = {
  primary: '#0052D9',
  accent: '#0066FF',
  accentLight: '#85A5FF',
  background: '#0D1117',
  text: '#FFFFFF',
  textSecondary: '#8B949E',
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 界面从下方滑入
  const interfaceY = interpolate(
    frame,
    [0, 40],
    [100, 0],
    { extrapolateRight: 'clamp' }
  );

  const interfaceOpacity = interpolate(
    frame,
    [0, 30],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // 界面缩放
  const interfaceScale = spring({
    fps,
    frame,
    config: {
      damping: 30,
      stiffness: 100,
    },
  });

  // 高亮框动画
  const highlightFrame1 = 80;
  const highlight1Opacity = interpolate(
    frame,
    [highlightFrame1, highlightFrame1 + 20],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  const highlightFrame2 = 180;
  const highlight2Opacity = interpolate(
    frame,
    [highlightFrame2, highlightFrame2 + 20],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // 标注动画
  const calloutFrame = 100;
  const callout1Opacity = interpolate(
    frame,
    [calloutFrame, calloutFrame + 20],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  const callout1Y = interpolate(
    frame,
    [calloutFrame, calloutFrame + 20],
    [20, 0],
    { extrapolateRight: 'clamp' }
  );

  const calloutFrame2 = 200;
  const callout2Opacity = interpolate(
    frame,
    [calloutFrame2, calloutFrame2 + 20],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  const callout2Y = interpolate(
    frame,
    [calloutFrame2, calloutFrame2 + 20],
    [20, 0],
    { extrapolateRight: 'clamp' }
  );

  // 脉冲效果
  const pulse = Math.sin((frame / 15) * Math.PI);
  const pulseScale = 1 + Math.max(0, pulse) * 0.05;

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
          top: 80,
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
          站点列表管理
        </div>
      </div>

      {/* 界面截图容器 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, calc(-50% + ${interfaceY}px)) scale(${Math.min(1, interfaceScale * 0.9)})`,
          opacity: interfaceOpacity,
          width: 1600,
          height: 900,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          border: `2px solid ${COLORS.accent}`,
        }}
      >
        {/* 界面截图 */}
        <Img
          src={staticFile('image-4.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* 高亮框1 - 站点列表区域 */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            left: '15%',
            width: '70%',
            height: '12%',
            border: `4px solid ${COLORS.accent}`,
            borderRadius: 8,
            opacity: highlight1Opacity,
            boxShadow: `0 0 30px ${COLORS.accent}, inset 0 0 30px ${COLORS.accent}44`,
            transform: `scale(${pulseScale})`,
            pointerEvents: 'none',
          }}
        />

        {/* 高亮框2 - 服务信息列 */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            right: '8%',
            width: '20%',
            height: '60%',
            border: `4px solid ${COLORS.accentLight}`,
            borderRadius: 8,
            opacity: highlight2Opacity,
            boxShadow: `0 0 30px ${COLORS.accentLight}, inset 0 0 30px ${COLORS.accentLight}44`,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 标注1 - 站点信息 */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '8%',
          opacity: callout1Opacity,
          transform: `translateY(${callout1Y}px)`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.accent}ee 0%, ${COLORS.accent}dd 100%)`,
            padding: '20px 30px',
            borderRadius: 16,
            boxShadow: `0 8px 32px ${COLORS.accent}88`,
            maxWidth: 400,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: COLORS.text,
              marginBottom: 10,
            }}
          >
            📍 多站点管理
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#FFFFFF',
              opacity: 0.9,
              lineHeight: 1.5,
            }}
          >
            为每个地区创建专属站点
            <br />
            统一管理，一目了然
          </div>
        </div>

        {/* 指示线 */}
        <svg
          width="200"
          height="100"
          style={{
            position: 'absolute',
            top: '50%',
            left: '100%',
            transform: 'translateY(-50%)',
          }}
        >
          <path
            d="M 0 50 Q 100 50 200 20"
            stroke={COLORS.accent}
            strokeWidth="3"
            fill="none"
            strokeDasharray="5 5"
            opacity={0.8}
          />
          <circle cx="200" cy="20" r="8" fill={COLORS.accent} />
        </svg>
      </div>

      {/* 标注2 - 备份站点 */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          right: '5%',
          opacity: callout2Opacity,
          transform: `translateY(${callout2Y}px)`,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.accentLight}ee 0%, ${COLORS.accentLight}dd 100%)`,
            padding: '20px 30px',
            borderRadius: 16,
            boxShadow: `0 8px 32px ${COLORS.accentLight}88`,
            maxWidth: 420,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: COLORS.text,
              marginBottom: 10,
            }}
          >
            🛡️ 自动备份容错
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#FFFFFF',
              opacity: 0.9,
              lineHeight: 1.5,
            }}
          >
            主站点故障？备份站点
            <br />
            自动接管，会议不中断
          </div>
        </div>
      </div>

      {/* 底部文案 */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [300, 330], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 'bold',
            color: COLORS.text,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
          }}
        >
          绑定呼叫、录制、点播服务，资源灵活分配
        </div>
      </div>

      {/* 淡出效果 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: COLORS.background,
          opacity: interpolate(frame, [420, 450], [0, 0.3], { extrapolateRight: 'clamp' }),
        }}
      />
    </AbsoluteFill>
  );
};
