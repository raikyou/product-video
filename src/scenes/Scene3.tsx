import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';
import React from 'react';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 界面从左侧滑入
  const slideX = interpolate(frame, [0, 35], [-400, 0], {
    extrapolateRight: 'clamp',
  });

  const imageOpacity = interpolate(frame, [0, 35], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 标题淡入
  const titleOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 说明文字逐行显示
  const desc1Opacity = interpolate(frame, [60, 85], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const desc2Opacity = interpolate(frame, [90, 115], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const desc3Opacity = interpolate(frame, [120, 145], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 高亮框动画
  const highlight1Opacity = interpolate(frame, [160, 180], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const highlight2Opacity = interpolate(frame, [200, 220], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const highlight3Opacity = interpolate(frame, [240, 260], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#f5f7fa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
      }}
    >
      {/* 标题区域 */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          全面的站点管理
        </h2>

        {/* 说明文字 */}
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 50,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: '#4b5563',
              opacity: desc1Opacity,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#0083b0', marginRight: 8, fontSize: 20 }}>●</span>
            查看所有站点状态
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#4b5563',
              opacity: desc2Opacity,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#0083b0', marginRight: 8, fontSize: 20 }}>●</span>
            筛选区域、网络配置
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#4b5563',
              opacity: desc3Opacity,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#0083b0', marginRight: 8, fontSize: 20 }}>●</span>
            管理呼叫、录制、点播服务
          </div>
        </div>
      </div>

      {/* 界面截图 */}
      <div
        style={{
          position: 'relative',
          width: 1600,
          marginTop: 220,
          transform: `translateX(${slideX}px)`,
          opacity: imageOpacity,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <Img
          src={staticFile('image-4.png')}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />

        {/* 高亮框 1 - 站点名称列 */}
        <div
          style={{
            position: 'absolute',
            top: '22%',
            left: '16%',
            width: '18%',
            height: '58%',
            border: '3px solid #0083b0',
            borderRadius: 8,
            opacity: highlight1Opacity,
            boxShadow: '0 0 20px rgba(0, 131, 176, 0.5)',
          }}
        />

        {/* 高亮框 2 - 服务列 */}
        <div
          style={{
            position: 'absolute',
            top: '22%',
            left: '56%',
            width: '20%',
            height: '58%',
            border: '3px solid #4ade80',
            borderRadius: 8,
            opacity: highlight2Opacity,
            boxShadow: '0 0 20px rgba(74, 222, 128, 0.5)',
          }}
        />

        {/* 高亮框 3 - 操作按钮 */}
        <div
          style={{
            position: 'absolute',
            top: '22%',
            right: '5%',
            width: '12%',
            height: '58%',
            border: '3px solid #fbbf24',
            borderRadius: 8,
            opacity: highlight3Opacity,
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
          }}
        />
      </div>

      {/* 底部装饰线 */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '10%',
          right: '10%',
          height: 4,
          background: 'linear-gradient(90deg, #0083b0 0%, #00b4db 50%, #0083b0 100%)',
          borderRadius: 2,
          opacity: interpolate(frame, [280, 300], [0, 0.3], { extrapolateRight: 'clamp' }),
        }}
      />
    </AbsoluteFill>
  );
};
