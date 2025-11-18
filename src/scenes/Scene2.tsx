import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import React from 'react';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题弹性进入
  const titleScale = spring({
    fps,
    frame: frame - 10,
    config: {
      damping: 200,
      stiffness: 100,
    },
  });

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 卡片依次弹出
  const card1Scale = spring({
    fps,
    frame: frame - 40,
    config: { damping: 150 },
  });

  const card2Scale = spring({
    fps,
    frame: frame - 55,
    config: { damping: 150 },
  });

  const card3Scale = spring({
    fps,
    frame: frame - 70,
    config: { damping: 150 },
  });

  // 光圈扩散效果
  const rippleScale = interpolate(frame, [30, 120], [0, 3], {
    extrapolateRight: 'clamp',
  });

  const rippleOpacity = interpolate(frame, [30, 120], [0.8, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
      }}
    >
      {/* 中国地图 */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.3,
        }}
      >
        <Img
          src={staticFile('china.svg')}
          style={{
            width: '100%',
            height: '100%',
            filter: 'brightness(1.2) saturate(0.8)',
          }}
        />

        {/* 中心扩散光圈 */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '60%',
            width: 400,
            height: 400,
            marginLeft: -200,
            marginTop: -200,
            borderRadius: '50%',
            border: '3px solid #4ade80',
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />

        {/* 绿色标记点 - 北京 (中心) */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '60%',
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#4ade80',
            boxShadow: '0 0 30px #4ade80',
          }}
        />

        {/* 绿色标记点 - 上海 */}
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '68%',
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            boxShadow: '0 0 20px #22c55e',
          }}
        />

        {/* 绿色标记点 - 广州 */}
        <div
          style={{
            position: 'absolute',
            top: '70%',
            left: '58%',
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            boxShadow: '0 0 20px #22c55e',
          }}
        />

        {/* 绿色标记点 - 成都 */}
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '44%',
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            boxShadow: '0 0 20px #22c55e',
          }}
        />

        {/* 反向连线效果 */}
        <svg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {/* 北京到上海 (反向) */}
          <line
            x1="60%"
            y1="30%"
            x2="68%"
            y2="45%"
            stroke="#4ade80"
            strokeWidth="3"
            strokeDasharray="10,5"
            strokeDashoffset={-(frame % 90) * 2}
            opacity="0.8"
          />
          {/* 北京到广州 (反向) */}
          <line
            x1="60%"
            y1="30%"
            x2="58%"
            y2="70%"
            stroke="#4ade80"
            strokeWidth="3"
            strokeDasharray="10,5"
            strokeDashoffset={-(frame % 90) * 2}
            opacity="0.8"
          />
          {/* 北京到成都 (反向) */}
          <line
            x1="60%"
            y1="30%"
            x2="44%"
            y2="52%"
            stroke="#4ade80"
            strokeWidth="3"
            strokeDasharray="10,5"
            strokeDashoffset={-(frame % 90) * 2}
            opacity="0.8"
          />
        </svg>
      </div>

      {/* 文字内容 */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* 主标题 */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#ffffff',
            margin: 0,
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            textShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
          }}
        >
          站点管理，就近接入本地资源
        </h1>

        {/* 功能亮点卡片 */}
        <div
          style={{
            marginTop: 80,
            display: 'flex',
            gap: 40,
            justifyContent: 'center',
          }}
        >
          {/* 卡片 1 */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '30px 40px',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              transform: `scale(${card1Scale})`,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span style={{ fontSize: 40, color: '#4ade80' }}>✓</span>
            <span style={{ fontSize: 28, fontWeight: 600, color: '#1a1a2e' }}>
              按规则智能分配资源
            </span>
          </div>

          {/* 卡片 2 */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '30px 40px',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              transform: `scale(${card2Scale})`,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span style={{ fontSize: 40, color: '#4ade80' }}>✓</span>
            <span style={{ fontSize: 28, fontWeight: 600, color: '#1a1a2e' }}>
              低延迟，高质量保障
            </span>
          </div>

          {/* 卡片 3 */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '30px 40px',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              transform: `scale(${card3Scale})`,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span style={{ fontSize: 40, color: '#4ade80' }}>✓</span>
            <span style={{ fontSize: 28, fontWeight: 600, color: '#1a1a2e' }}>
              会议隔离，互不干扰
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
