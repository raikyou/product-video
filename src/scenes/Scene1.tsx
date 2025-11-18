import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { random } from 'remotion';

// 腾讯会议风格配色
const COLORS = {
  primary: '#0052D9',
  accent: '#0066FF',
  background: '#0D1117',
  danger: '#FF4D4F',
  text: '#FFFFFF',
};

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 地图从模糊到清晰
  const mapBlur = interpolate(frame, [0, 30], [8, 0], { extrapolateRight: 'clamp' });
  const mapOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  // 延迟线条出现的时间
  const linesStartFrame = 30;
  const linesOpacity = interpolate(
    frame,
    [linesStartFrame, linesStartFrame + 20],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // 创建从各地到北京的连接线（确定性随机）
  const connections = [
    { id: 1, from: { x: 35, y: 65 }, label: '成都', delay: 1200 },
    { id: 2, from: { x: 50, y: 55 }, label: '武汉', delay: 800 },
    { id: 3, from: { x: 55, y: 75 }, label: '广州', delay: 1100 },
    { id: 4, from: { x: 65, y: 45 }, label: '上海', delay: 900 },
    { id: 5, from: { x: 45, y: 35 }, label: '西安', delay: 1000 },
  ];

  const beijingPos = { x: 54, y: 28 }; // 北京位置

  // 脉冲动画
  const pulse = Math.sin((frame / 10) * Math.PI);
  const pulseScale = 1 + pulse * 0.1;

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
            linear-gradient(0deg, rgba(0, 82, 217, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 82, 217, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: `${interpolate(frame, [0, 150], [0, 40])}px ${interpolate(frame, [0, 150], [0, 40])}px`,
          opacity: 0.4,
        }}
      />

      {/* 中国地图容器 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: mapOpacity,
          filter: `blur(${mapBlur}px)`,
        }}
      >
        <img
          src="/china.svg"
          alt="China Map"
          style={{
            width: '70%',
            height: '70%',
            objectFit: 'contain',
            opacity: 0.3,
          }}
        />
      </div>

      {/* 连接线和延迟标注 */}
      <svg
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: linesOpacity,
        }}
      >
        <defs>
          {/* 定义发光滤镜 */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 定义渐变 */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: COLORS.danger, stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: COLORS.danger, stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {connections.map((conn, index) => {
          const fromX = (conn.from.x / 100) * width;
          const fromY = (conn.from.y / 100) * height;
          const toX = (beijingPos.x / 100) * width;
          const toY = (beijingPos.y / 100) * height;

          // 线条绘制动画
          const lineProgress = interpolate(
            frame,
            [linesStartFrame + index * 5, linesStartFrame + index * 5 + 20],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          // 计算曲线路径
          const controlX = (fromX + toX) / 2;
          const controlY = Math.min(fromY, toY) - 100;

          return (
            <g key={conn.id}>
              {/* 曲线 */}
              <path
                d={`M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`}
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10 5"
                strokeDashoffset={interpolate(frame, [linesStartFrame, 150], [0, -1000], {
                  extrapolateRight: 'extend',
                })}
                filter="url(#glow)"
                opacity={lineProgress}
              />
            </g>
          );
        })}

        {/* 北京节点 - 拥堵的服务器 */}
        <circle
          cx={(beijingPos.x / 100) * width}
          cy={(beijingPos.y / 100) * height}
          r={20 * pulseScale}
          fill={COLORS.danger}
          opacity={0.8}
          filter="url(#glow)"
        />
        <circle
          cx={(beijingPos.x / 100) * width}
          cy={(beijingPos.y / 100) * height}
          r={10}
          fill="#FFFFFF"
        />

        {/* 各地区节点 */}
        {connections.map((conn) => {
          const nodeScale = interpolate(
            frame,
            [linesStartFrame, linesStartFrame + 30],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          return (
            <circle
              key={`node-${conn.id}`}
              cx={(conn.from.x / 100) * width}
              cy={(conn.from.y / 100) * height}
              r={8 * nodeScale}
              fill={COLORS.accent}
              opacity={0.9}
            />
          );
        })}
      </svg>

      {/* 延迟标注 */}
      {connections.slice(0, 3).map((conn, index) => {
        const labelOpacity = interpolate(
          frame,
          [linesStartFrame + 40 + index * 5, linesStartFrame + 50 + index * 5],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );

        const labelY = interpolate(
          frame,
          [linesStartFrame + 40 + index * 5, linesStartFrame + 50 + index * 5],
          [10, 0],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={`label-${conn.id}`}
            style={{
              position: 'absolute',
              left: `${conn.from.x}%`,
              top: `${conn.from.y}%`,
              transform: `translate(-50%, calc(-100% + ${labelY}px - 30px))`,
              background: 'rgba(255, 77, 79, 0.9)',
              color: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: 28,
              fontWeight: 'bold',
              opacity: labelOpacity,
              boxShadow: '0 4px 12px rgba(255, 77, 79, 0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            {conn.delay}ms
          </div>
        );
      })}

      {/* 文案 - 从下方滑入 */}
      <div
        style={{
          position: 'absolute',
          bottom: 150,
          left: 0,
          right: 0,
          textAlign: 'center',
          transform: `translateY(${interpolate(frame, [70, 100], [100, 0], { extrapolateRight: 'clamp' })}px)`,
          opacity: interpolate(frame, [70, 100], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: COLORS.text,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
            lineHeight: 1.4,
          }}
        >
          多地区部署时，所有终端
          <br />
          都挤进总部服务器...
        </div>
      </div>

      {/* 淡出效果 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: COLORS.background,
          opacity: interpolate(frame, [130, 150], [0, 0.3], { extrapolateRight: 'clamp' }),
        }}
      />
    </AbsoluteFill>
  );
};
