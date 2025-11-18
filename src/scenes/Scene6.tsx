import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/NotoSansSC';
import { FaVideo, FaFileAlt, FaFolderOpen, FaUser, FaSmile } from 'react-icons/fa';

const { fontFamily } = loadFont();

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // File flow animation
  const fileProgress = interpolate(frame, [60, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fileX = interpolate(fileProgress, [0, 1], [200, 1200], {
    extrapolateRight: 'clamp',
  });

  const fileY = 100 - Math.sin(fileProgress * Math.PI) * 80;

  const fileScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 80 },
  });

  // Admin interaction
  const adminOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const smileScale = spring({
    frame: frame - 240,
    fps,
    config: { damping: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#fff',
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
        录制文件存在本地站点,分支管理员自己就能找,不用再催总部
      </div>

      {/* Site detail panel mockup */}
      <div
        style={{
          margin: '60px 60px 0',
          padding: 30,
          backgroundColor: '#f5f5f5',
          borderRadius: 12,
          opacity: panelOpacity,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20 }}>
          站点详情 - 广州站点
        </div>
        <div style={{ display: 'flex', gap: 30 }}>
          <div
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: '#E8F5E9',
              borderRadius: 8,
              border: '2px solid #00C853',
            }}
          >
            <div style={{ fontSize: 20, color: '#333', fontWeight: 'bold' }}>录制服务</div>
            <div style={{ fontSize: 18, color: '#666', marginTop: 10 }}>状态: 运行中</div>
          </div>
          <div
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: '#E3F2FD',
              borderRadius: 8,
            }}
          >
            <div style={{ fontSize: 20, color: '#333', fontWeight: 'bold' }}>呼叫服务</div>
            <div style={{ fontSize: 18, color: '#666', marginTop: 10 }}>状态: 运行中</div>
          </div>
          <div
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: '#FFF3E0',
              borderRadius: 8,
            }}
          >
            <div style={{ fontSize: 20, color: '#333', fontWeight: 'bold' }}>点播服务</div>
            <div style={{ fontSize: 18, color: '#666', marginTop: 10 }}>状态: 运行中</div>
          </div>
        </div>
      </div>

      {/* File flow demonstration */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          width: '100%',
          padding: '0 100px',
        }}
      >
        {/* Meeting icon */}
        <div
          style={{
            position: 'absolute',
            left: 200,
            top: 100,
          }}
        >
          <div
            style={{
              backgroundColor: '#1E90FF',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <FaVideo size={50} color="#fff" />
          </div>
          <div style={{ fontSize: 20, color: '#333', marginTop: 10, textAlign: 'center' }}>
            广州会议
          </div>
          {frame > 60 && (
            <div
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: '#F7131C',
                animation: 'pulse 1s infinite',
              }}
            />
          )}
        </div>

        {/* Flying file */}
        {fileProgress > 0 && (
          <div
            style={{
              position: 'absolute',
              left: fileX,
              top: fileY,
              transform: `scale(${fileScale}) translate(-50%, -50%)`,
            }}
          >
            <FaFileAlt size={60} color="#4CAF50" />
          </div>
        )}

        {/* Server/Folder */}
        <div
          style={{
            position: 'absolute',
            left: 1200,
            top: 100,
          }}
        >
          <div
            style={{
              backgroundColor: '#4CAF50',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <FaFolderOpen size={50} color="#fff" />
          </div>
          <div style={{ fontSize: 20, color: '#333', marginTop: 10, textAlign: 'center' }}>
            广州服务器
          </div>
        </div>

        {/* Admin character */}
        {frame > 180 && (
          <div
            style={{
              position: 'absolute',
              left: 1400,
              top: 100,
              opacity: adminOpacity,
            }}
          >
            <div
              style={{
                backgroundColor: '#FFD700',
                borderRadius: '50%',
                padding: 20,
              }}
            >
              <FaUser size={50} color="#fff" />
            </div>
            <div style={{ fontSize: 20, color: '#333', marginTop: 10, textAlign: 'center' }}>
              广州管理员
            </div>

            {frame > 240 && (
              <div
                style={{
                  position: 'absolute',
                  top: -30,
                  right: -30,
                  transform: `scale(${smileScale})`,
                }}
              >
                <FaSmile size={40} color="#FFD700" />
              </div>
            )}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
