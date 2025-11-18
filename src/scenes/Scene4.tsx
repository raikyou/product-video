import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/NotoSansSC';
import { FaUser, FaServer, FaCheckCircle } from 'react-icons/fa';
import { ConnectionLine } from '../components/ConnectionLine';

const { fontFamily } = loadFont();

const SiteListTable: React.FC<{ frame: number }> = ({ frame }) => {
  const sites = ['北京总部', '上海站点', '广州站点', '成都站点', '深圳站点'];

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 30,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' }}>
        站点列表
      </div>
      {sites.map((site, i) => {
        const rowOpacity = interpolate(
          frame,
          [i * 10, i * 10 + 20],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );

        const isHighlight = site === '上海站点' && frame > 60;

        return (
          <div
            key={i}
            style={{
              padding: '15px 20px',
              marginBottom: 10,
              backgroundColor: isHighlight ? '#E3F2FD' : '#f5f5f5',
              borderRadius: 8,
              fontSize: 24,
              color: '#333',
              opacity: rowOpacity,
              border: isHighlight ? '2px solid #1E90FF' : 'none',
              fontWeight: isHighlight ? 'bold' : 'normal',
            }}
          >
            {site}
          </div>
        );
      })}
    </div>
  );
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // User avatar animation
  const userX = interpolate(frame, [60, 120], [100, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const userScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 80 },
  });

  // Connection line
  const connectionProgress = interpolate(frame, [120, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Latency counter
  const latency = Math.floor(
    interpolate(frame, [150, 210], [500, 20], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const latencyColor = latency > 250 ? '#F7131C' : '#00C853';

  // Load percentage
  const loadPercent = Math.floor(
    interpolate(frame, [150, 210], [95, 30], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F5F5F5',
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          padding: 40,
          fontSize: 32,
          color: '#333',
          fontWeight: 'bold',
        }}
      >
        按 IP 地址就近接入,上海开会用上海资源,延迟从 500 降到 20 毫秒
      </div>

      <div style={{ display: 'flex', gap: 40, padding: 40, marginTop: 40 }}>
        {/* Left - Site list */}
        <div style={{ flex: '0 0 40%' }}>
          <SiteListTable frame={frame} />
        </div>

        {/* Right - Demonstration */}
        <div style={{ flex: 1, position: 'relative', backgroundColor: '#fff', borderRadius: 12, padding: 40 }}>
          {/* User avatar */}
          <div
            style={{
              position: 'absolute',
              left: userX,
              top: 200,
              transform: `translate(-50%, -50%) scale(${userScale})`,
              backgroundColor: '#1E90FF',
              borderRadius: '50%',
              padding: 25,
              opacity: userScale,
            }}
          >
            <FaUser size={50} color="#fff" />
          </div>

          {/* Shanghai site */}
          <div
            style={{
              position: 'absolute',
              left: 700,
              top: 200,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              style={{
                backgroundColor: '#1E90FF',
                borderRadius: 12,
                padding: 25,
                border: '3px solid #1E90FF',
              }}
            >
              <FaServer size={60} color="#fff" />
            </div>
            <div
              style={{
                fontSize: 24,
                color: '#333',
                marginTop: 15,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              上海站点
            </div>
          </div>

          {/* Connection line */}
          {frame > 120 && (
            <ConnectionLine
              from={{ x: userX, y: 200 }}
              to={{ x: 700, y: 200 }}
              progress={connectionProgress}
              color="#00C853"
            />
          )}

          {/* Check mark */}
          {frame > 180 && (
            <div
              style={{
                position: 'absolute',
                left: 700,
                top: 150,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <FaCheckCircle size={40} color="#00C853" />
            </div>
          )}

          {/* Latency indicator */}
          <div
            style={{
              position: 'absolute',
              left: 450,
              top: 350,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 'bold',
                color: latencyColor,
                fontFamily: 'monospace',
              }}
            >
              {latency}ms
            </div>
            <div style={{ fontSize: 24, color: '#666' }}>网络延迟</div>

            <div
              style={{
                width: 300,
                height: 40,
                backgroundColor: '#e0e0e0',
                borderRadius: 20,
                overflow: 'hidden',
                marginTop: 20,
              }}
            >
              <div
                style={{
                  width: `${loadPercent}%`,
                  height: '100%',
                  backgroundColor: loadPercent > 70 ? '#F7131C' : '#00C853',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
              >
                {loadPercent}%
              </div>
            </div>
            <div style={{ fontSize: 24, color: '#666' }}>服务器负载</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
