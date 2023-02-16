import React, { useState } from 'react';

const StartButton = (props): JSX.Element => {

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
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  width: '252px',
  height: '48px',
  // left: '1482px',
  // top: '1081px',
  borderRadius: '42px',
  padding: '14px 24px',
  gap: '16px',
  background: '#181818',
  border: '1px solid rgba(243, 246, 248, 0.1)',
  boxShadow: '0px 18px 24px rgba(0, 0, 0, 0.16), 0px 12px 16px rgba(6, 9, 11, 0.1), 0px 6px 12px rgba(0, 0, 0, 0.18), 0px 1px 20px rgba(0, 0, 0, 0.12)',
  cursor: 'pointer',
  bottom: '20px'
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
  gap: '16px',
  background: '#212121',
  border: '1px solid rgba(243, 246, 248, 0.1)',
  boxShadow: '0px 18px 24px rgba(0, 0, 0, 0.16), 0px 12px 16px rgba(6, 9, 11, 0.1), 0px 6px 12px rgba(0, 0, 0, 0.18), 0px 1px 20px rgba(0, 0, 0, 0.12)',
  cursor: 'pointer',
  bottom: '20px'
};

const startIcon: React.CSSProperties = {
  width: '0',
  height: '0',
  borderTop: '8px solid transparent',
  borderBottom: '8px solid transparent',
  borderLeft: '16px solid rgba(243, 246, 248, 0.9)',
  flex: 'none',
  order: '0',
  flexGrow: '0'
}

const startText: React.CSSProperties = {
  width: '168px',
  height: '16px',
  fontSize: '16px',
  lineHeight: '16px',
  color: '#F3F6F8',
  opacity: '0.8',
  flex: 'none',
  order: '1',
  flexGrow: '0',
}


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


export default StartButton;