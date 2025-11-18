import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const COLORS = {
  primary: '#0052D9',
  accent: '#0066FF',
  accentLight: '#85A5FF',
  background: '#0D1117',
  success: '#00C853',
  text: '#FFFFFF',
};

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 标题弹性进入
  const titleScale = spring({
    fps,
    frame,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 地图过渡动画
  const mapScale = interpolate(frame, [30, 60], [1.5, 1], { extrapolateRight: 'clamp' });
  const mapOpacity = interpolate(frame, [30, 50], [0, 0.4], { extrapolateRight: 'clamp' });

  // 节点动画
  const nodes = [
    { id: 'beijing', x: 54, y: 28, label: '北京', delay: 0 },
    { id: 'shanghai', x: 65, y: 45, label: '上海', delay: 5 },
    { id: 'guangzhou', x: 55, y: 75, label: '广州', delay: 10 },
    { id: 'chengdu', x: 35, y: 65, label: '成都', delay: 15 },
    { id: 'wuhan', x: 50, y: 55, label: '武汉', delay: 20 },
  ];

  // 粒子效果
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (Math.random() * 100),
    y: (Math.random() * 100),
    speed: Math.random() * 2 + 0.5,
    size: Math.random() * 3 + 2,
  }));

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
          backgroundPosition: `${interpolate(frame, [0, 150], [0, 50])}px ${interpolate(frame, [0, 150], [0, 50])}px`,
          opacity: 0.5,
        }}
      />

      {/* 光效粒子 */}
      {particles.map((particle) => {
        const particleY = interpolate(
          frame,
          [0, 150],
          [particle.y, particle.y - 30 * particle.speed],
          { extrapolateRight: 'extend' }
        );

        const particleOpacity = interpolate(
          frame,
          [60, 90],
          [0, 0.6],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particleY % 100}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: COLORS.success,
              boxShadow: `0 0 10px ${COLORS.success}`,
              opacity: particleOpacity,
            }}
          />
        );
      })}

      {/* 中国地图 - 从红色到绿色 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: mapOpacity,
          transform: `scale(${mapScale})`,
        }}
      >
        <img
          src="/china.svg"
          alt="China Map"
          style={{
            width: '70%',
            height: '70%',
            objectFit: 'contain',
            filter: `hue-rotate(${interpolate(frame, [30, 80], [0, 120], { extrapolateRight: 'clamp' })}deg)`,
          }}
        />
      </div>

      {/* 服务器节点 */}
      <svg width={width} height={height} style={{ position: 'absolute' }}>
        <defs>
          <filter id="glow-green">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {nodes.map((node, index) => {
          const nodeStartFrame = 70 + node.delay;
          const nodeScale = spring({
            fps,
            frame: Math.max(0, frame - nodeStartFrame),
            config: {
              damping: 15,
              stiffness: 150,
            },
          });

          const nodeOpacity = interpolate(
            frame,
            [nodeStartFrame, nodeStartFrame + 10],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          // 脉冲效果
          const pulse = Math.sin(((frame - nodeStartFrame) / 10) * Math.PI);
          const pulseScale = 1 + Math.max(0, pulse) * 0.3;

          return (
            <g key={node.id} opacity={nodeOpacity}>
              {/* 外圈脉冲 */}
              <circle
                cx={(node.x / 100) * width}
                cy={(node.y / 100) * height}
                r={25 * pulseScale * Math.min(1, nodeScale)}
                fill={COLORS.success}
                opacity={0.3}
                filter="url(#glow-green)"
              />
              {/* 主节点 */}
              <circle
                cx={(node.x / 100) * width}
                cy={(node.y / 100) * height}
                r={15 * Math.min(1, nodeScale)}
                fill={COLORS.success}
                filter="url(#glow-green)"
              />
              {/* 内圈 */}
              <circle
                cx={(node.x / 100) * width}
                cy={(node.y / 100) * height}
                r={8 * Math.min(1, nodeScale)}
                fill="#FFFFFF"
              />
            </g>
          );
        })}

        {/* 节点之间的连接线 */}
        {nodes.slice(1).map((node, index) => {
          const lineStartFrame = 100 + index * 5;
          const lineOpacity = interpolate(
            frame,
            [lineStartFrame, lineStartFrame + 15],
            [0, 0.5],
            { extrapolateRight: 'clamp' }
          );

          return (
            <line
              key={`line-${node.id}`}
              x1={(nodes[0].x / 100) * width}
              y1={(nodes[0].y / 100) * height}
              x2={(node.x / 100) * width}
              y2={(node.y / 100) * height}
              stroke={COLORS.accentLight}
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity={lineOpacity}
            />
          );
        })}
      </svg>

      {/* 节点标签 */}
      {nodes.map((node) => {
        const labelStartFrame = 70 + node.delay + 10;
        const labelOpacity = interpolate(
          frame,
          [labelStartFrame, labelStartFrame + 10],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={`label-${node.id}`}
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, calc(-100% - 50px))',
              background: `linear-gradient(135deg, ${COLORS.success}dd 0%, ${COLORS.success}aa 100%)`,
              color: COLORS.text,
              padding: '10px 20px',
              borderRadius: '12px',
              fontSize: 28,
              fontWeight: 'bold',
              opacity: labelOpacity,
              boxShadow: `0 4px 16px ${COLORS.success}88`,
              whiteSpace: 'nowrap',
            }}
          >
            {node.label}站点
          </div>
        );
      })}

      {/* 主标题 */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: 0,
          right: 0,
          textAlign: 'center',
          transform: `scale(${Math.min(1, titleScale)})`,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 'bold',
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 20px rgba(0, 82, 217, 0.6))',
          }}
        >
          站点管理
        </div>
      </div>

      {/* 副标题 */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `translateY(${interpolate(frame, [20, 40], [30, 0], { extrapolateRight: 'clamp' })}px)`,
        }}
      >
        <div
          style={{
            fontSize: 52,
            color: COLORS.accentLight,
            textShadow: `0 0 20px ${COLORS.accent}`,
          }}
        >
          分布式架构 · 智能就近接入
        </div>
      </div>

      {/* 底部文案 */}
      <div
        style={{
          position: 'absolute',
          bottom: 150,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: interpolate(frame, [110, 130], [0, 1], { extrapolateRight: 'clamp' }),
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
          每个地区都有本地服务器
        </div>
      </div>
    </AbsoluteFill>
  );
};
