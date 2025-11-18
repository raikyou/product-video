import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const COLORS = {
  primary: '#0052D9',
  accent: '#0066FF',
  background: '#0D1117',
  danger: '#FF4D4F',
  success: '#00C853',
  text: '#FFFFFF',
};

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 分屏动画
  const dividerX = interpolate(
    frame,
    [0, 40],
    [width / 2, width / 2],
    { extrapolateRight: 'clamp' }
  );

  // 左侧（之前）动画
  const beforeOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  // 右侧（之后）动画
  const afterOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' });

  // 数字滚动动画
  const delay1Number = Math.floor(
    interpolate(frame, [100, 150], [1200, 80], { extrapolateRight: 'clamp' })
  );

  const delay2Number = Math.floor(
    interpolate(frame, [100, 150], [1200, 80], { extrapolateRight: 'clamp' })
  );

  const percentNumber = Math.floor(
    interpolate(frame, [120, 170], [0, 93], { extrapolateRight: 'clamp' })
  );

  const pressureNumber = Math.floor(
    interpolate(frame, [120, 170], [0, 80], { extrapolateRight: 'clamp' })
  );

  // 数据标签弹性进入
  const dataLabelScale1 = spring({
    fps,
    frame: Math.max(0, frame - 100),
    config: { damping: 15, stiffness: 100 },
  });

  const dataLabelScale2 = spring({
    fps,
    frame: Math.max(0, frame - 120),
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
          zIndex: 10,
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
          效果对比
        </div>
      </div>

      {/* 左侧 - 之前（拥堵状态） */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '50%',
          height: '100%',
          opacity: beforeOpacity,
        }}
      >
        {/* 背景 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, #2a0a0a 0%, ${COLORS.background} 100%)`,
          }}
        />

        {/* 标签 */}
        <div
          style={{
            position: 'absolute',
            top: 200,
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: COLORS.danger,
              color: COLORS.text,
              padding: '15px 40px',
              borderRadius: 12,
              fontSize: 48,
              fontWeight: 'bold',
            }}
          >
            ❌ 之前
          </div>
        </div>

        {/* 地图 - 集中式 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '60%',
          }}
        >
          <img
            src="/china.svg"
            alt="China Map"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: 0.2,
            }}
          />

          {/* SVG 连接线 */}
          <svg
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {[
              { x1: '35%', y1: '65%' },
              { x1: '50%', y1: '55%' },
              { x1: '55%', y1: '75%' },
              { x1: '65%', y1: '45%' },
            ].map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2="54%"
                y2="28%"
                stroke={COLORS.danger}
                strokeWidth="4"
                strokeDasharray="10 5"
                opacity={0.8}
              />
            ))}
          </svg>
        </div>

        {/* 延迟数据 */}
        <div
          style={{
            position: 'absolute',
            bottom: 200,
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: COLORS.danger,
              textShadow: `0 0 30px ${COLORS.danger}`,
            }}
          >
            {delay1Number}ms
          </div>
          <div
            style={{
              fontSize: 36,
              color: COLORS.textSecondary,
              marginTop: 10,
            }}
          >
            视频延迟
          </div>
        </div>
      </div>

      {/* 右侧 - 之后（分布式状态） */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '50%',
          height: '100%',
          opacity: afterOpacity,
        }}
      >
        {/* 背景 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, #0a2a0a 0%, ${COLORS.background} 100%)`,
          }}
        />

        {/* 标签 */}
        <div
          style={{
            position: 'absolute',
            top: 200,
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: COLORS.success,
              color: COLORS.text,
              padding: '15px 40px',
              borderRadius: 12,
              fontSize: 48,
              fontWeight: 'bold',
            }}
          >
            ✓ 之后
          </div>
        </div>

        {/* 地图 - 分布式 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '60%',
          }}
        >
          <img
            src="/china.svg"
            alt="China Map"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: 0.2,
              filter: 'hue-rotate(120deg)',
            }}
          />

          {/* 节点 */}
          <svg
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <defs>
              <filter id="glow-success">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {[
              { cx: '54%', cy: '28%' },
              { cx: '35%', cy: '65%' },
              { cx: '50%', cy: '55%' },
              { cx: '55%', cy: '75%' },
              { cx: '65%', cy: '45%' },
            ].map((node, i) => (
              <circle
                key={i}
                cx={node.cx}
                cy={node.cy}
                r="15"
                fill={COLORS.success}
                filter="url(#glow-success)"
              />
            ))}
          </svg>
        </div>

        {/* 延迟数据 */}
        <div
          style={{
            position: 'absolute',
            bottom: 200,
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: COLORS.success,
              textShadow: `0 0 30px ${COLORS.success}`,
            }}
          >
            {delay2Number}ms
          </div>
          <div
            style={{
              fontSize: 36,
              color: COLORS.textSecondary,
              marginTop: 10,
            }}
          >
            视频延迟
          </div>
        </div>
      </div>

      {/* 中间分隔线 */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 4,
          background: `linear-gradient(180deg, transparent, ${COLORS.accent}, transparent)`,
          transform: 'translateX(-50%)',
        }}
      />

      {/* 数据对比卡片 */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: '50%',
          transform: `translate(-50%, 0) scale(${Math.min(1, dataLabelScale1)})`,
          display: 'flex',
          gap: 40,
          opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        {/* 延迟降低 */}
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.accent}ee 0%, ${COLORS.accent}dd 100%)`,
            padding: '30px 50px',
            borderRadius: 16,
            boxShadow: `0 8px 32px ${COLORS.accent}88`,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: COLORS.text,
            }}
          >
            {percentNumber}%
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#FFFFFF',
              opacity: 0.9,
            }}
          >
            延迟降低
          </div>
        </div>

        {/* 压力减少 */}
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.success}ee 0%, ${COLORS.success}dd 100%)`,
            padding: '30px 50px',
            borderRadius: 16,
            boxShadow: `0 8px 32px ${COLORS.success}88`,
            transform: `scale(${Math.min(1, dataLabelScale2)})`,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: COLORS.text,
            }}
          >
            {pressureNumber}%
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#FFFFFF',
              opacity: 0.9,
            }}
          >
            总部压力减少
          </div>
        </div>
      </div>

      {/* 底部文案 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          opacity: interpolate(frame, [200, 230], [0, 1], { extrapolateRight: 'clamp' }),
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: COLORS.text,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
            background: `${COLORS.background}dd`,
            padding: '30px 60px',
            borderRadius: 16,
          }}
        >
          每个地区的会议都快人一步
        </div>
      </div>
    </AbsoluteFill>
  );
};
