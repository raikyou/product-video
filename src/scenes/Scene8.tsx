import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/NotoSansSC';
import { FaServer, FaSmile, FaFrown } from 'react-icons/fa';
import { DataMetric } from '../components/DataMetric';

const { fontFamily } = loadFont();

const BeforeScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        padding: 40,
      }}
    >
      <div style={{ fontSize: 36, color: '#F7131C', fontWeight: 'bold' }}>使用前</div>

      <div
        style={{
          position: 'relative',
        }}
      >
        <FaServer
          size={100}
          color="#F7131C"
          style={{
            filter: 'drop-shadow(0 0 20px #F7131C)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 50,
            opacity: 0.6 + Math.sin(frame * 0.1) * 0.2,
          }}
        >
          💨
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
          fontSize: 28,
          color: '#fff',
        }}
      >
        <div>⚠️ 延迟: 500ms</div>
        <div>⚠️ 总部负载: 95%</div>
        <div>⚠️ 运维工单: 爆满</div>
      </div>

      <FaFrown size={60} color="#F7131C" style={{ marginTop: 20 }} />
    </div>
  );
};

const AfterScene: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
        padding: 40,
      }}
    >
      <div style={{ fontSize: 36, color: '#00C853', fontWeight: 'bold' }}>使用后</div>

      <div style={{ display: 'flex', gap: 30 }}>
        <FaServer size={70} color="#00C853" style={{ filter: 'drop-shadow(0 0 10px #00C853)' }} />
        <FaServer size={70} color="#1E90FF" style={{ filter: 'drop-shadow(0 0 10px #1E90FF)' }} />
        <FaServer size={70} color="#FFD700" style={{ filter: 'drop-shadow(0 0 10px #FFD700)' }} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
          fontSize: 28,
          color: '#fff',
        }}
      >
        <div>✓ 延迟: 20ms</div>
        <div>✓ 总部负载: 30%</div>
        <div>✓ 运维工单: 轻松</div>
      </div>

      <FaSmile size={60} color="#00C853" style={{ marginTop: 20 }} />
    </div>
  );
};

export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();

  const leftX = interpolate(frame, [0, 60], [-1000, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rightX = interpolate(frame, [0, 60], [1000, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
        fontFamily,
      }}
    >
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Left - Before */}
        <div
          style={{
            flex: '0 0 45%',
            transform: `translateX(${leftX}px)`,
            background: 'linear-gradient(to right, #4A1F1F 0%, transparent 100%)',
          }}
        >
          <BeforeScene />
        </div>

        {/* Middle - Data comparison */}
        <div
          style={{
            flex: '0 0 10%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 40,
            paddingTop: 100,
          }}
        >
          <DataMetric
            label="延迟"
            value={95}
            unit="%"
            icon="↓"
            frame={frame - 60}
            delay={0}
          />
          <DataMetric
            label="总部负载"
            value={70}
            unit="%"
            icon="↓"
            frame={frame - 60}
            delay={30}
          />
          <DataMetric
            label="运维工单"
            value={80}
            unit="%"
            icon="↓"
            frame={frame - 60}
            delay={60}
          />
        </div>

        {/* Right - After */}
        <div
          style={{
            flex: '0 0 45%',
            transform: `translateX(${rightX}px)`,
            background: 'linear-gradient(to left, #1F4A1F 0%, transparent 100%)',
          }}
        >
          <AfterScene />
        </div>
      </div>

      {/* Bottom title */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          width: '100%',
          textAlign: 'center',
          fontSize: 40,
          fontWeight: 'bold',
          color: '#fff',
          opacity: titleOpacity,
        }}
      >
        延迟降 95%,总部减负 70%,运维不再天天被催
      </div>
    </AbsoluteFill>
  );
};
