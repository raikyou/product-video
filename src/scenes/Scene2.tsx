import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/NotoSansSC';
import { FaVideo, FaUserTie, FaPhoneAlt, FaFolderOpen } from 'react-icons/fa';

const { fontFamily } = loadFont();

interface GridCellProps {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  backgroundColor: string;
  index: number;
  extraContent?: React.ReactNode;
}

const GridCell: React.FC<GridCellProps> = ({
  icon: Icon,
  label,
  backgroundColor,
  index,
  extraContent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - index * 30,
    fps,
    config: {
      damping: 80,
      stiffness: 150,
    },
  });

  return (
    <div
      style={{
        backgroundColor,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        transform: `scale(${scale})`,
        opacity: scale,
        padding: 40,
      }}
    >
      <Icon size={80} color={index === 0 ? '#F7131C' : index === 1 ? '#FFD700' : index === 2 ? '#FF6B35' : '#999'} />
      {extraContent}
      <div
        style={{
          fontSize: 32,
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  // Latency jumping animation
  const latencyValues = [300, 500, 800];
  const latencyIndex = Math.floor((frame / 20) % latencyValues.length);
  const currentLatency = latencyValues[latencyIndex];

  // VIP warning blink
  const warningOpacity = 0.3 + Math.sin(frame * 0.2) * 0.7;

  // Bottom title fade in
  const titleOpacity = interpolate(frame, [200, 230], [0, 1], {
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 20,
          padding: 100,
          height: '80%',
        }}
      >
        {/* Cell 1 - Video lag */}
        <GridCell
          icon={FaVideo}
          label="视频卡顿"
          backgroundColor="#2C2C2C"
          index={0}
          extraContent={
            <div
              style={{
                fontSize: 48,
                color: '#F7131C',
                fontWeight: 'bold',
                fontFamily: 'monospace',
              }}
            >
              {currentLatency}ms
            </div>
          }
        />

        {/* Cell 2 - VIP meeting */}
        <GridCell
          icon={FaUserTie}
          label="VIP 会议"
          backgroundColor="#4A1F1F"
          index={1}
          extraContent={
            <div
              style={{
                fontSize: 36,
                color: '#F7131C',
                fontWeight: 'bold',
                opacity: warningOpacity,
              }}
            >
              资源不足
            </div>
          }
        />

        {/* Cell 3 - Phone calling */}
        <GridCell
          icon={FaPhoneAlt}
          label="催运维"
          backgroundColor="#1F2A4A"
          index={2}
          extraContent={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 80 + i * 30,
                    height: 80 + i * 30,
                    border: '3px solid rgba(255, 107, 53, 0.4)',
                    borderRadius: '50%',
                    opacity: interpolate(
                      frame % 60,
                      [i * 15, i * 15 + 30],
                      [1, 0],
                      { extrapolateRight: 'clamp' }
                    ),
                  }}
                />
              ))}
            </div>
          }
        />

        {/* Cell 4 - File not found */}
        <GridCell
          icon={FaFolderOpen}
          label="找不到文件"
          backgroundColor="#2A1F4A"
          index={3}
          extraContent={
            <div
              style={{
                fontSize: 64,
                color: '#F7131C',
                fontWeight: 'bold',
              }}
            >
              ✗
            </div>
          }
        />
      </div>

      {/* Bottom title */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          width: '100%',
          textAlign: 'center',
          fontSize: 40,
          color: '#fff',
          opacity: titleOpacity,
          padding: '0 100px',
        }}
      >
        视频卡顿、领导会议被挤、录制文件到处找、天天催总部运维...
      </div>
    </AbsoluteFill>
  );
};
