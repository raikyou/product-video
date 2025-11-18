import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  random,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/NotoSansSC';

const { fontFamily } = loadFont();

const LightParticle: React.FC<{ x: number; y: number; scale: number; index: number }> = ({
  x,
  y,
  scale,
  index,
}) => {
  const frame = useCurrentFrame();
  const opacity = 0.5 + Math.sin(frame * 0.05 + index) * 0.5;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '#fff',
        transform: `scale(${scale})`,
        opacity: opacity * scale,
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
      }}
    />
  );
};

const MainInterfacePreview: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        padding: 40,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: '#333',
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: 20,
        }}
      >
        站点管理系统
      </div>

      {/* Content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, flex: 1 }}>
        {[
          { label: '北京总部', color: '#1E90FF' },
          { label: '上海站点', color: '#00C853' },
          { label: '广州站点', color: '#FFD700' },
          { label: '成都站点', color: '#FF6B35' },
          { label: '深圳站点', color: '#9C27B0' },
          { label: '杭州站点', color: '#00BCD4' },
        ].map((site, i) => (
          <div
            key={i}
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 20,
              border: `3px solid ${site.color}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                backgroundColor: site.color,
                marginBottom: 15,
              }}
            />
            <div style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>{site.label}</div>
            <div style={{ fontSize: 16, color: '#666', marginTop: 5 }}>运行中</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const interfaceScale = interpolate(frame, [0, 60], [1, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shadowOpacity = interpolate(frame, [0, 60], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaY = interpolate(frame, [60, 90], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Generate particles with deterministic positions
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    x: random(`particle-x-${i}`) * 1920,
    y: random(`particle-y-${i}`) * 1080,
    index: i,
  }));

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(circle at center, #1e3c72 0%, #000 100%)',
        fontFamily,
      }}
    >
      {/* Background light particles */}
      {particles.map((particle) => {
        const scale = spring({
          frame: frame - particle.index * 3,
          fps,
          config: { damping: 80 },
        });

        return (
          <LightParticle
            key={particle.index}
            x={particle.x}
            y={particle.y}
            scale={scale}
            index={particle.index}
          />
        );
      })}

      {/* Main interface */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${interfaceScale})`,
          width: '80%',
          height: '70%',
          boxShadow: `0 20px 60px rgba(0,0,0,${shadowOpacity})`,
        }}
      >
        <MainInterfacePreview />
      </div>

      {/* CTA text */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          width: '100%',
          textAlign: 'center',
          fontSize: 48,
          fontWeight: 'bold',
          color: '#fff',
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
        }}
      >
        站点管理,让多地部署不再是负担
      </div>
    </AbsoluteFill>
  );
};
