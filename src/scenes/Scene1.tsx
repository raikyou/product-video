import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/NotoSansSC';
import { FaServer } from 'react-icons/fa';
import { ChinaMapWithCities } from '../components/ChinaMap';
import { ConnectionLine } from '../components/ConnectionLine';

const { fontFamily } = loadFont();

const cities = [
  { name: '上海', x: 300, y: 300 },
  { name: '广州', x: 250, y: 450 },
  { name: '成都', x: 150, y: 350 },
  { name: '深圳', x: 270, y: 480 },
  { name: '杭州', x: 330, y: 320 },
];

const serverPos = { x: 1400, y: 400 };

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();

  // Title fade in
  const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const serverGlow = 20 + Math.sin(frame * 0.1) * 10;

  // Warning stats fade in
  const statsOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const statsY = interpolate(frame, [150, 180], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Counter animation for latency
  const latency = Math.floor(
    interpolate(frame, [150, 200], [0, 500], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
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
          fontSize: 48,
          fontWeight: 'bold',
          color: '#fff',
          opacity: titleOpacity,
          padding: '0 100px',
        }}
      >
        全国分支机构都连总部开会,服务器撑不住了!
      </div>

      {/* Left side - China Map */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: '50%',
          height: '100%',
        }}
      >
        <ChinaMapWithCities />
      </div>

      {/* Connection lines from cities to server */}
      {cities.map((city, i) => {
        const cityScreenPos = {
          x: city.x + 200,
          y: city.y + 250,
        };

        const progress = interpolate(
          frame,
          [60 + i * 5, 120 + i * 5],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        return (
          <ConnectionLine
            key={i}
            from={cityScreenPos}
            to={serverPos}
            progress={progress}
            color="#F7131C"
          />
        );
      })}

      {/* Right side - Server */}
      <div
        style={{
          position: 'absolute',
          right: '25%',
          top: '40%',
          transform: 'translate(50%, -50%)',
        }}
      >
        <FaServer
          size={120}
          color="#F7131C"
          style={{
            filter: `drop-shadow(0 0 ${serverGlow}px #F7131C)`,
            transform: `scale(${1 + Math.sin(frame * 0.2) * 0.05})`,
          }}
        />

        {/* Smoke effect */}
        {frame > 100 && (
          <div
            style={{
              position: 'absolute',
              top: -60,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 60,
              opacity: 0.6 + Math.sin(frame * 0.1) * 0.2,
            }}
          >
            💨
          </div>
        )}
      </div>

      {/* Warning stats */}
      <div
        style={{
          position: 'absolute',
          bottom: 150,
          right: 200,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          opacity: statsOpacity,
          transform: `translateY(${statsY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 36,
            color: '#FF6B35',
            fontWeight: 'bold',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '10px 20px',
            borderRadius: 8,
          }}
        >
          {latency}ms 延迟
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#F7131C',
            fontWeight: 'bold',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '10px 20px',
            borderRadius: 8,
          }}
        >
          资源占用 95%
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#FFD700',
            fontWeight: 'bold',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '10px 20px',
            borderRadius: 8,
          }}
        >
          排队中...
        </div>
      </div>
    </AbsoluteFill>
  );
};
