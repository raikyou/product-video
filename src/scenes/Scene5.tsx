import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/NotoSansSC';
import { FaDoorOpen, FaVideo, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const { fontFamily } = loadFont();

interface ChannelFlowProps {
  type: string;
  color: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  frame: number;
}

const ChannelFlow: React.FC<ChannelFlowProps> = ({ type, color, icon: Icon, frame }) => {
  const { fps } = useVideoConfig();

  const iconScale = spring({
    frame,
    fps,
    config: { damping: 80 },
  });

  // Particle flow animation
  const particleProgress = (frame % 60) / 60;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40,
      }}
    >
      {/* Meeting room */}
      <div
        style={{
          transform: `scale(${iconScale})`,
          opacity: iconScale,
        }}
      >
        <div
          style={{
            backgroundColor: '#2C2C2C',
            borderRadius: 12,
            padding: 30,
            border: `3px solid ${color}`,
          }}
        >
          <Icon size={60} color={color} />
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
          {type}会议室
        </div>
      </div>

      {/* Arrow with particles */}
      <div style={{ position: 'relative', height: 200 }}>
        <FaArrowRight size={60} color={color} style={{ opacity: 0.6 }} />

        {/* Flowing particles */}
        {[0, 1, 2].map((i) => {
          const offset = (i * 0.33 + particleProgress) % 1;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: offset * 150 - 20,
                top: 15,
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: color,
                opacity: 0.8,
              }}
            />
          );
        })}
      </div>

      {/* Site node */}
      <div
        style={{
          transform: `scale(${iconScale})`,
          opacity: iconScale,
        }}
      >
        <div
          style={{
            backgroundColor: color,
            borderRadius: 12,
            padding: 30,
          }}
        >
          <FaCheckCircle size={60} color="#fff" />
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
          {type === 'VIP' ? '专属' : '共享'}站点
        </div>
      </div>
    </div>
  );
};

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const configY = interpolate(frame, [0, 60], [-200, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dividerScale = spring({
    frame: frame - 120,
    fps,
    config: { damping: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(to bottom, #fff 0%, #f5f5f5 100%)',
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
          textAlign: 'center',
        }}
      >
        VIP 会议专属资源,普通会议共享资源,再也不会相互影响
      </div>

      {/* Top config interface mockup */}
      <div
        style={{
          height: '30%',
          transform: `translateY(${configY}px)`,
          padding: '20px 60px',
          backgroundColor: '#fff',
          borderBottom: '2px solid #e0e0e0',
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 }}>
          接入规则配置
        </div>
        <div
          style={{
            display: 'flex',
            gap: 20,
            backgroundColor: '#f5f5f5',
            padding: 20,
            borderRadius: 8,
          }}
        >
          <div style={{ fontSize: 20, color: '#666' }}>规则类型: </div>
          <div style={{ fontSize: 20, color: '#1E90FF', fontWeight: 'bold' }}>会议室</div>
        </div>
      </div>

      {/* Channel demonstration */}
      <div
        style={{
          height: '70%',
          display: 'flex',
          gap: 100,
          padding: '60px 100px',
          justifyContent: 'center',
        }}
      >
        {/* VIP Channel */}
        <ChannelFlow
          type="VIP"
          color="#FFD700"
          icon={FaDoorOpen}
          frame={frame - 60}
        />

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${dividerScale})`,
            opacity: dividerScale,
          }}
        >
          <div
            style={{
              width: 4,
              height: 400,
              backgroundColor: '#00C853',
              borderRadius: 2,
            }}
          />
          <div
            style={{
              marginTop: 20,
              fontSize: 28,
              color: '#00C853',
              fontWeight: 'bold',
              backgroundColor: '#fff',
              padding: '10px 20px',
              borderRadius: 8,
              border: '2px solid #00C853',
            }}
          >
            ✓ 互不干扰
          </div>
        </div>

        {/* Normal Channel */}
        <ChannelFlow
          type="普通"
          color="#1E90FF"
          icon={FaVideo}
          frame={frame - 60}
        />
      </div>
    </AbsoluteFill>
  );
};
