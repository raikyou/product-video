import React from 'react';
import { interpolate, spring, useVideoConfig } from 'remotion';
import { FaArrowDown } from 'react-icons/fa';

interface DataMetricProps {
  label: string;
  value: number;
  unit: string;
  icon: string;
  frame: number;
  delay: number;
}

export const DataMetric: React.FC<DataMetricProps> = ({
  label,
  value,
  unit,
  frame,
  delay,
}) => {
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 80,
    },
  });

  const displayValue = Math.floor(
    interpolate(adjustedFrame, [0, 60], [0, value], {
      extrapolateRight: 'clamp',
    })
  );

  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <FaArrowDown size={32} color="#00C853" />
      <div
        style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: '#00C853',
          fontFamily: 'monospace',
        }}
      >
        {displayValue}{unit}
      </div>
      <div
        style={{
          fontSize: 20,
          color: '#fff',
          textAlign: 'center',
        }}
      >
        {label}
      </div>
    </div>
  );
};
