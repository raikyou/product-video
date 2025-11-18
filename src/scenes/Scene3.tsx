import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/NotoSansSC';
import { FaServer } from 'react-icons/fa';

const { fontFamily } = loadFont();

const NetworkTopology: React.FC<{ frame: number }> = ({ frame }) => {
  const nodes = [
    { x: 960, y: 300, label: '总部' },
    { x: 600, y: 600, label: '上海' },
    { x: 1320, y: 600, label: '广州' },
    { x: 400, y: 800, label: '成都' },
    { x: 1520, y: 800, label: '深圳' },
  ];

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.3 }}>
      <svg width="1920" height="1080" style={{ position: 'absolute' }}>
        {/* Connection lines */}
        {nodes.slice(1).map((node, i) => {
          const progress = interpolate(
            frame,
            [i * 10, i * 10 + 40],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          const pathLength = Math.sqrt(
            Math.pow(nodes[0].x - node.x, 2) + Math.pow(nodes[0].y - node.y, 2)
          );

          return (
            <line
              key={i}
              x1={nodes[0].x}
              y1={nodes[0].y}
              x2={node.x}
              y2={node.y}
              stroke="#00C853"
              strokeWidth="2"
              strokeDasharray="10,5"
              strokeDashoffset={pathLength - pathLength * progress}
              opacity={0.6}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const scale = spring({
          frame: frame - i * 15,
          fps: 30,
          config: { damping: 100 },
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: node.x,
              top: node.y,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: scale,
            }}
          >
            <div
              style={{
                backgroundColor: '#1e3c72',
                padding: 15,
                borderRadius: '50%',
                border: '2px solid #00C853',
              }}
            >
              <FaServer size={30} color="#00C853" />
            </div>
            <div
              style={{
                fontSize: 16,
                color: '#fff',
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              {node.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Light burst effect
  const lightRadius = spring({
    frame,
    fps,
    config: {
      damping: 60,
      stiffness: 100,
    },
  });

  const lightOpacity = interpolate(frame, [0, 60], [0, 0.1], {
    extrapolateRight: 'clamp',
  });

  // Title scale and fade in
  const titleScale = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 100,
      stiffness: 150,
    },
  });

  const titleOpacity = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtitle fade in
  const subtitleOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at center, rgba(255,255,255,${lightOpacity}) 0%, #0F1419 50%)`,
        fontFamily,
      }}
    >
      {/* Light burst effect */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: lightRadius * 800,
          height: lightRadius * 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Background network topology */}
      <NetworkTopology frame={Math.max(0, frame - 60)} />

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <h1
          style={{
            fontSize: 96,
            fontWeight: 'bold',
            color: '#fff',
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            textAlign: 'center',
          }}
        >
          站点管理系统
        </h1>
        <p
          style={{
            fontSize: 36,
            color: '#A0A0A0',
            opacity: subtitleOpacity,
            textAlign: 'center',
          }}
        >
          让每个地区都有自己的资源
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
