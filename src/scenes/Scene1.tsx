import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from 'remotion';
import React from 'react';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 地图淡入动画
  const mapOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 标题淡入
  const titleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 副标题逐行淡入
  const subtitle1Opacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const subtitle2Opacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const subtitle3Opacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 标记点脉动效果
  const pulseScale = interpolate(
    frame % 60,
    [0, 30, 60],
    [1, 1.2, 1],
    { extrapolateRight: 'clamp' }
  );

  // 连线流动效果
  const lineAnimation = (frame % 120) / 120;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
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
          opacity: mapOpacity,
        }}
      >
        <Img
          src={staticFile('china.svg')}
          style={{
            width: '100%',
            height: '100%',
            filter: 'brightness(0.6) saturate(1.2)',
          }}
        />

        {/* 标记点 - 北京 (中心) */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '60%',
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            transform: `scale(${pulseScale})`,
            boxShadow: '0 0 20px #ef4444',
          }}
        />

        {/* 标记点 - 上海 */}
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '68%',
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: '#f87171',
            animation: `pulse 2s ease-in-out ${frame * 0.02}s infinite`,
          }}
        />

        {/* 标记点 - 广州 */}
        <div
          style={{
            position: 'absolute',
            top: '70%',
            left: '58%',
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: '#f87171',
            animation: `pulse 2s ease-in-out ${frame * 0.03}s infinite`,
          }}
        />

        {/* 标记点 - 成都 */}
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '44%',
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: '#f87171',
            animation: `pulse 2s ease-in-out ${frame * 0.025}s infinite`,
          }}
        />

        {/* 连线效果 - SVG */}
        <svg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          {/* 上海到北京 */}
          <line
            x1="68%"
            y1="45%"
            x2="60%"
            y2="30%"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="10,5"
            strokeDashoffset={-lineAnimation * 100}
            opacity="0.6"
          />
          {/* 广州到北京 */}
          <line
            x1="58%"
            y1="70%"
            x2="60%"
            y2="30%"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="10,5"
            strokeDashoffset={-lineAnimation * 100}
            opacity="0.6"
          />
          {/* 成都到北京 */}
          <line
            x1="44%"
            y1="52%"
            x2="60%"
            y2="30%"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="10,5"
            strokeDashoffset={-lineAnimation * 100}
            opacity="0.6"
          />
        </svg>
      </div>

      {/* 文字内容 */}
      <div
        style={{
          position: 'absolute',
          top: 120,
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
            opacity: titleOpacity,
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          }}
        >
          多地区部署，资源压力山大？
        </h1>

        {/* 副标题列表 */}
        <div
          style={{
            marginTop: 60,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: '#e5e7eb',
              opacity: subtitle1Opacity,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#ef4444', marginRight: 12, fontSize: 24 }}>●</span>
            视频延迟高，用户体验差
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#e5e7eb',
              opacity: subtitle2Opacity,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#ef4444', marginRight: 12, fontSize: 24 }}>●</span>
            总部资源吃紧，网络负载重
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#e5e7eb',
              opacity: subtitle3Opacity,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#ef4444', marginRight: 12, fontSize: 24 }}>●</span>
            下级会议影响总部稳定性
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
