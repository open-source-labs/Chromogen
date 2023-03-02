import React, { useState } from 'react';

const Start = (props): JSX.Element => {
  //hover
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const startButtonShape: React.CSSProperties = {
    display: 'flex',
    width: '252px',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    height: '48px',
    // left: '1482px',
    // top: '1081px',
    borderRadius: '42px',
    padding: '14px 24px',
    columnGap: '16px',
    background: '#212121',
    border: '1px solid rgba(243, 246, 248, 0.1)',
    cursor: 'pointer',
    bottom: '20px',
  };

  const startButtonHover: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: '252px',
    height: '48px',
    borderRadius: '42px',
    padding: '14px 24px',
    columnGap: '16px',
    justifyContent: 'center',
    background: '#1C1C1C',
    border: '1px solid rgba(243, 246, 248, 0.1)',
    cursor: 'pointer',
    bottom: '20px',
  };

  const startIcon: React.CSSProperties = {
    width: '0',
    height: '0',
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    borderLeft: '16px solid rgba(243, 246, 248, 0.8)',
    flex: 'none',
    order: '0',
    flexGrow: '0',
    borderRadius: '2px',
  };

  const startText: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: '16px',
    color: '#F3F6F8',
    opacity: '0.8',
    flex: 'none',
    order: '1',
    flexGrow: '0',
  };

  return (
    <button
      style={isHover ? startButtonShape : startButtonHover}
      onClick={props.handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={startIcon} />
      <div style={startText}>Start recording</div>
    </button>
  );
};

export default Start;
