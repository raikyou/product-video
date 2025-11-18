import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/NotoSansSC';
import { FaExchangeAlt } from 'react-icons/fa';
import { ServerNode } from '../components/ServerNode';

const { fontFamily } = loadFont();

const Arrow: React.FC<{ from: { x: number; y: number }; to: { x: number; y: number }; progress: number }> = ({
  from,
  to,
  progress,
}) => {
  const length = to.x - from.x;
  const currentLength = length * Math.min(progress, 1);

  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#00C853" />
        </marker>
      </defs>
      <line
        x1={from.x}
        y1={from.y}
        x2={from.x + currentLength}
        y2={to.y}
        stroke="#00C853"
        strokeWidth="4"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
};

const MeetingStatusBar: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#00C853',
        padding: '15px 40px',
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        gap: 15,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: '#fff',
          animation: 'pulse 1s infinite',
        }}
      />
      <div style={{ fontSize: 28, color: '#fff', fontWeight: 'bold' }}>
        会议进行中 - 无中断
      </div>
    </div>
  );
};

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelX = interpolate(frame, [0, 60], [-400, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const chengduStatus = frame < 120 ? 'normal' : 'error';
  const chongqingStatus = frame > 180 ? 'active' : 'standby';

  const arrowProgress = spring({
    frame: frame - 120,
    fps,
    config: { damping: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1A1A1A',
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          width: '100%',
          textAlign: 'center',
          fontSize: 32,
          fontWeight: 'bold',
          color: '#fff',
          padding: '0 100px',
        }}
      >
        本地资源故障?自动切换备份站点,会议不中断
      </div>

      {/* Backup config panel */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 180,
          transform: `translateX(${panelX}px)`,
          backgroundColor: '#2C2C2C',
          padding: 30,
          borderRadius: 12,
          maxWidth: 400,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 }}>
          备份站点配置
        </div>
        <div style={{ fontSize: 18, color: '#aaa', marginBottom: 15 }}>
          呼叫备份站点:
        </div>
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: '#3C3C3C',
            borderRadius: 8,
            color: '#00C853',
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          1. 重庆站点
        </div>
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: '#3C3C3C',
            borderRadius: 8,
            color: '#666',
            fontSize: 18,
          }}
        >
          2. 北京总部
        </div>
      </div>

      {/* Failover demonstration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
        }}
      >
        {/* Chengdu node */}
        <ServerNode
          city="成都"
          status={chengduStatus}
          x={200}
          y={0}
          frame={frame}
        />

        {/* Arrow */}
        {frame > 120 && (
          <Arrow
            from={{ x: 300, y: 540 }}
            to={{ x: 700, y: 540 }}
            progress={arrowProgress}
          />
        )}

        {/* Failover icon */}
        {frame > 120 && frame < 180 && (
          <div
            style={{
              position: 'absolute',
              left: 500,
              top: -60,
              transform: 'translate(-50%, 0)',
            }}
          >
            <FaExchangeAlt
              size={60}
              color="#FFD700"
              style={{
                transform: `rotate(${frame * 3}deg)`,
              }}
            />
          </div>
        )}

        {/* Chongqing backup node */}
        <ServerNode
          city="重庆"
          status={chongqingStatus}
          x={800}
          y={0}
          frame={frame}
        />
      </div>

      {/* Meeting status bar */}
      <MeetingStatusBar />

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </AbsoluteFill>
  );
};
