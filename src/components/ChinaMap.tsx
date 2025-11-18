import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface City {
  name: string;
  x: number;
  y: number;
}

const cities: City[] = [
  { name: '北京', x: 520, y: 180 },
  { name: '上海', x: 620, y: 280 },
  { name: '广州', x: 520, y: 420 },
  { name: '成都', x: 380, y: 320 },
  { name: '深圳', x: 530, y: 450 },
  { name: '杭州', x: 630, y: 270 },
];

export const ChinaMapSVG: React.FC = () => {
  return (
    <svg width="800" height="600" viewBox="0 0 800 600" style={{ position: 'absolute', left: '10%', top: '25%' }}>
      {/* Simplified China outline */}
      <path
        d="M 300 150 Q 350 120 420 150 L 500 140 L 580 160 L 650 180 L 680 220 L 700 280 L 680 350 L 650 400 L 600 450 L 520 480 L 450 470 L 400 430 L 350 380 L 320 320 L 280 250 Z"
        fill="rgba(30, 144, 255, 0.1)"
        stroke="#1E90FF"
        strokeWidth="3"
      />
    </svg>
  );
};

interface CityMarkerProps {
  name: string;
  x: number;
  y: number;
  index: number;
}

export const CityMarker: React.FC<CityMarkerProps> = ({ name, x, y, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - index * 5,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });

  const adjustedX = x + (typeof window !== 'undefined' ? window.innerWidth * 0.1 : 192);
  const adjustedY = y + (typeof window !== 'undefined' ? window.innerHeight * 0.25 : 270);

  return (
    <div
      style={{
        position: 'absolute',
        left: adjustedX,
        top: adjustedY,
        transform: `scale(${scale}) translate(-50%, -50%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: scale,
      }}
    >
      <FaMapMarkerAlt size={30} color="#F7131C" />
      <div
        style={{
          fontSize: 16,
          color: '#fff',
          marginTop: 5,
          backgroundColor: 'rgba(0,0,0,0.6)',
          padding: '2px 8px',
          borderRadius: 4,
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </div>
    </div>
  );
};

export const ChinaMapWithCities: React.FC = () => {
  return (
    <>
      <ChinaMapSVG />
      {cities.map((city, index) => (
        <CityMarker key={city.name} {...city} index={index} />
      ))}
    </>
  );
};
