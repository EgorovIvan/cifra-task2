import React from 'react';
import './icon.scss';

interface IconProps {
  src: string;
  size?: string | number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ src, size = 24, color = 'currentColor', className = '' }) => {

  const iconStyle = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    fill: color,
  };

  return (
    <img
      src={src}
      alt="icon"
      style={iconStyle}
      className={`icon ${className}`}
    />
  );
};

export default Icon;
