import React from 'react';
import { FaServer, FaCheckCircle, FaTimes } from 'react-icons/fa';

interface ServerNodeProps {
  city: string;
  status: 'normal' | 'error' | 'active' | 'standby';
  x: number;
  y: number;
  frame?: number;
}

export const ServerNode: React.FC<ServerNodeProps> = ({
  city,
  status,
  x,
  y,
  frame = 0,
}) => {
  const getColor = () => {
    switch (status) {
      case 'error':
        return '#F7131C';
      case 'active':
        return '#00C853';
      case 'standby':
        return '#666';
      default:
        return '#1E90FF';
    }
  };

  const getBoxShadow = () => {
    if (status === 'error') {
      const pulse = Math.sin(frame * 0.2) * 0.5 + 0.5;
      return `0 0 ${20 + pulse * 20}px ${getColor()}`;
    }
    return `0 0 20px ${getColor()}`;
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <div
        style={{
          position: 'relative',
          padding: 20,
          backgroundColor: '#2C2C2C',
          borderRadius: 12,
          border: `3px solid ${getColor()}`,
          boxShadow: getBoxShadow(),
        }}
      >
        <FaServer size={60} color={getColor()} />

        {status === 'error' && (
          <div
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
              backgroundColor: '#F7131C',
              borderRadius: '50%',
              padding: 8,
            }}
          >
            <FaTimes size={24} color="#fff" />
          </div>
        )}

        {status === 'active' && (
          <div
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
              backgroundColor: '#00C853',
              borderRadius: '50%',
              padding: 8,
            }}
          >
            <FaCheckCircle size={24} color="#fff" />
          </div>
        )}
      </div>

      <div
        style={{
          fontSize: 24,
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {city}站点
      </div>

      {status === 'standby' && (
        <div
          style={{
            fontSize: 18,
            color: '#999',
          }}
        >
          (备份)
        </div>
      )}
    </div>
  );
};
