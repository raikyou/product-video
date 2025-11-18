import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import React from 'react';

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 地图旋转和缩放
  const mapRotate = interpolate(frame, [0, 60], [0, 15], {
    extrapolateRight: 'clamp',
  });

  const mapScale = interpolate(frame, [0, 60], [1, 1.1], {
    extrapolateRight: 'clamp',
  });

  const mapOpacity = interpolate(frame, [0, 30], [0, 0.4], {
    extrapolateRight: 'clamp',
  });

  // 节点脉动效果
  const nodePulse = Math.sin((frame / 15) * Math.PI) * 0.2 + 1;

  // 主标题弹性进入
  const titleScale = spring({
    fps,
    frame: frame - 20,
    config: {
      damping: 180,
      stiffness: 100,
    },
  });

  const titleOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 副标题淡入
  const subtitleOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // CTA 按钮弹性进入
  const ctaScale = spring({
    fps,
    frame: frame - 100,
    config: {
      damping: 150,
      stiffness: 120,
    },
  });

  const ctaOpacity = interpolate(frame, [100, 125], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 按钮悬浮动画
  const ctaHoverY = Math.sin((frame / 30) * Math.PI * 2) * 5;

  // 粒子效果
  const particleOpacity = interpolate(frame, [80, 120], [0, 0.6], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        overflow: 'hidden',
      }}
    >
      {/* 背景地图 */}
      <div
        style={{
          position: 'absolute',
          width: 1200,
          height: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: mapOpacity,
          transform: `rotate(${mapRotate}deg) scale(${mapScale})`,
        }}
      >
        <Img
          src={staticFile('china.svg')}
          style={{
            width: '100%',
            height: '100%',
            filter: 'brightness(0.8) saturate(1.5)',
          }}
        />

        {/* 网状连接线 */}
        <svg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {/* 水平连线 */}
          <line
            x1="44%"
            y1="52%"
            x2="68%"
            y2="45%"
            stroke="#4ade80"
            strokeWidth="2"
            strokeDasharray="5,5"
            strokeDashoffset={-(frame % 60) * 2}
            opacity="0.6"
          />
          <line
            x1="58%"
            y1="70%"
            x2="68%"
            y2="45%"
            stroke="#4ade80"
            strokeWidth="2"
            strokeDasharray="5,5"
            strokeDashoffset={-(frame % 60) * 2}
            opacity="0.6"
          />
          <line
            x1="44%"
            y1="52%"
            x2="58%"
            y2="70%"
            stroke="#4ade80"
            strokeWidth="2"
            strokeDasharray="5,5"
            strokeDashoffset={-(frame % 60) * 2}
            opacity="0.6"
          />
        </svg>

        {/* 节点 - 北京 */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '60%',
            width: 30,
            height: 30,
            borderRadius: '50%',
            backgroundColor: '#4ade80',
            transform: `scale(${nodePulse})`,
            boxShadow: '0 0 40px #4ade80, 0 0 80px rgba(74, 222, 128, 0.5)',
          }}
        />

        {/* 节点 - 上海 */}
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '68%',
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            transform: `scale(${nodePulse})`,
            boxShadow: '0 0 30px #22c55e',
          }}
        />

        {/* 节点 - 广州 */}
        <div
          style={{
            position: 'absolute',
            top: '70%',
            left: '58%',
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            transform: `scale(${nodePulse})`,
            boxShadow: '0 0 30px #22c55e',
          }}
        />

        {/* 节点 - 成都 */}
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '44%',
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            transform: `scale(${nodePulse})`,
            boxShadow: '0 0 30px #22c55e',
          }}
        />
      </div>

      {/* 粒子效果装饰 */}
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 300 + Math.sin(frame / 20 + i) * 50;
        const x = Math.cos(angle + frame / 100) * radius;
        const y = Math.sin(angle + frame / 100) * radius;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: '#4ade80',
              transform: `translate(${x}px, ${y}px)`,
              opacity: particleOpacity * (0.3 + Math.sin(frame / 10 + i) * 0.3),
              boxShadow: '0 0 10px #4ade80',
            }}
          />
        );
      })}

      {/* 文字内容 */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
      >
        {/* 主标题 */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#ffffff',
            margin: 0,
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            textAlign: 'center',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            lineHeight: 1.2,
          }}
        >
          站点管理，让多地区部署更智能
        </h1>

        {/* 副标题 */}
        <p
          style={{
            fontSize: 36,
            color: '#cbd5e1',
            margin: 0,
            opacity: subtitleOpacity,
            textAlign: 'center',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
          }}
        >
          录制文件本地管理，再也不用到处找运维
        </p>

        {/* CTA 按钮 */}
        <div
          style={{
            marginTop: 40,
            transform: `scale(${ctaScale}) translateY(${ctaHoverY}px)`,
            opacity: ctaOpacity,
          }}
        >
          <button
            style={{
              backgroundColor: '#4ade80',
              color: '#1a1a2e',
              fontSize: 32,
              fontWeight: 'bold',
              padding: '24px 64px',
              border: 'none',
              borderRadius: 16,
              cursor: 'pointer',
              boxShadow: '0 12px 40px rgba(74, 222, 128, 0.4), 0 0 60px rgba(74, 222, 128, 0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            立即体验
          </button>
        </div>
      </div>

      {/* 底部装饰条 */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: 'linear-gradient(90deg, transparent 0%, #4ade80 50%, transparent 100%)',
          opacity: interpolate(frame, [140, 170], [0, 0.8], { extrapolateRight: 'clamp' }),
        }}
      />
    </AbsoluteFill>
  );
};
