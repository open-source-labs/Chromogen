import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ResizerStyle = styled.div`
  position: absolute;
  cursor: ew-resize;
  width: 2px;
  height: 100%;
  z-index: 1;
  left: -1;
  top: 0;
  &:hover {
    background: #4848be;
  }
`;

interface ResizerProps {
  onResize: Function;
}

const Resizer: React.FC<ResizerProps> = ({ onResize }) => {
  const [direction, setDirection] = useState('');
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!direction) return;
      onResize(direction, e.movementX, e.movementY);
    };

    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseDown, direction, onResize]);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);
    window.addEventListener('mouseup', handleMouseUp);

    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseDown = (direction) => {
    setDirection(direction);
    setMouseDown(true);
  };

  return <ResizerStyle className="left" onMouseDown={() => handleMouseDown('left')}></ResizerStyle>;
};

export default Resizer;
