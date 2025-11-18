import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from 'remotion';
import React from 'react';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 对话框弹性缩放进入
  const dialogScale = spring({
    fps,
    frame: frame - 10,
    config: {
      damping: 150,
      stiffness: 100,
    },
  });

  const dialogOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 标题淡入
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 气泡提示依次显示
  const bubble1Opacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const bubble1Y = interpolate(frame, [50, 75], [20, 0], {
    extrapolateRight: 'clamp',
  });

  const bubble2Opacity = interpolate(frame, [80, 105], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const bubble2Y = interpolate(frame, [80, 105], [20, 0], {
    extrapolateRight: 'clamp',
  });

  const bubble3Opacity = interpolate(frame, [110, 135], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const bubble3Y = interpolate(frame, [110, 135], [20, 0], {
    extrapolateRight: 'clamp',
  });

  // 表单字段高亮
  const fieldHighlight1 = interpolate(frame, [150, 170, 190, 210], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fieldHighlight2 = interpolate(frame, [200, 220, 240, 260], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
      }}
    >
      {/* 背景装饰 - 网格 */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(#0083b0 1px, transparent 1px),
            linear-gradient(90deg, #0083b0 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: 56,
            fontWeight: 'bold',
            color: '#1a1a2e',
            margin: 0,
            opacity: titleOpacity,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          灵活的接入规则配置
        </h2>
      </div>

      {/* 对话框截图 */}
      <div
        style={{
          position: 'relative',
          width: 1000,
          transform: `scale(${dialogScale})`,
          opacity: dialogOpacity,
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.3)',
          borderRadius: 16,
          overflow: 'hidden',
        }}
      >
        <Img
          src={staticFile('image-7.png')}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />

        {/* 字段高亮1 - 规则类型 */}
        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: '8%',
            width: '84%',
            height: '12%',
            border: '3px solid #0083b0',
            borderRadius: 8,
            opacity: fieldHighlight1,
            boxShadow: '0 0 30px rgba(0, 131, 176, 0.8)',
            backgroundColor: 'rgba(0, 131, 176, 0.1)',
          }}
        />

        {/* 字段高亮2 - 应用场景 */}
        <div
          style={{
            position: 'absolute',
            top: '60%',
            left: '8%',
            width: '84%',
            height: '8%',
            border: '3px solid #4ade80',
            borderRadius: 8,
            opacity: fieldHighlight2,
            boxShadow: '0 0 30px rgba(74, 222, 128, 0.8)',
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
          }}
        />
      </div>

      {/* 功能说明气泡 */}
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: '30%',
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        {/* 气泡 1 */}
        <div
          style={{
            backgroundColor: 'rgba(0, 131, 176, 0.95)',
            padding: '20px 32px',
            borderRadius: 16,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            opacity: bubble1Opacity,
            transform: `translateY(${bubble1Y}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 28, color: '#ffffff' }}>→</span>
          <span style={{ fontSize: 26, color: '#ffffff', fontWeight: 500 }}>
            按 IP 地址/网段分配
          </span>
        </div>

        {/* 气泡 2 */}
        <div
          style={{
            backgroundColor: 'rgba(0, 131, 176, 0.95)',
            padding: '20px 32px',
            borderRadius: 16,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            opacity: bubble2Opacity,
            transform: `translateY(${bubble2Y}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 28, color: '#ffffff' }}>→</span>
          <span style={{ fontSize: 26, color: '#ffffff', fontWeight: 500 }}>
            按部门智能路由
          </span>
        </div>

        {/* 气泡 3 */}
        <div
          style={{
            backgroundColor: 'rgba(0, 131, 176, 0.95)',
            padding: '20px 32px',
            borderRadius: 16,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            opacity: bubble3Opacity,
            transform: `translateY(${bubble3Y}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 28, color: '#ffffff' }}>→</span>
          <span style={{ fontSize: 26, color: '#ffffff', fontWeight: 500 }}>
            按会议室专享资源
          </span>
        </div>
      </div>

      {/* 底部提示文字 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: interpolate(frame, [280, 310], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '16px 40px',
            borderRadius: 12,
            fontSize: 22,
            color: '#4b5563',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          支持会议室、IP地址、部门多维度规则配置
        </div>
      </div>
    </AbsoluteFill>
  );
};
