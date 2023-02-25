import React, { useState } from 'react';

const RecordButton = (props): JSX.Element => {
  //hover
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  //recording
  const recordButtonShape: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: '252px',
    height: '48px',
    // left: '1482px',
    // top: '1081px',
    borderRadius: '42px',
    justifyContent: 'center',
    padding: '14px 24px',
    columnGap: '16px',
    background: '#181818',
    border: '1px solid rgba(243, 246, 248, 0.1)',
    boxShadow:
      '0px 18px 24px rgba(0, 0, 0, 0.16), 0px 12px 16px rgba(6, 9, 11, 0.1), 0px 6px 12px rgba(0, 0, 0, 0.18), 0px 1px 20px rgba(0, 0, 0, 0.12)',
    cursor: 'pointer',
    bottom: '20px',
  };

  const recordIcon: React.CSSProperties = {
    width: '20px',
    height: '20px',
    background: '#D75959',
    opacity: '0.8',
    boxShadow:
      '0px 2px 6px rgba(215, 89, 89, 0.24), 0px 6px 10px rgba(215, 89, 89, 0.2), 0px 1px 16px rgba(215, 89, 89, 0.06)',
    borderRadius: '30px',
    flex: 'none',
    order: '0',
    flexGrow: '0',
    animation: !isHover ? 'glowing 1500ms infinite' : 'none',
  };

  const glowingAnimation = `
  @keyframes glowing {
    0% { background-color: #D75959; box-shadow: 0 0 3px #D75959; }
    50% { background-color: #ce4949; box-shadow: 0 0 30px #D75959; }
    100% { background-color: #D75959; box-shadow: 0 0 3px #D75959; }
  }

  .glowing {
    animation: glowing 1500ms infinite;
  }
  `;

  const recordText: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: '16px',
    color: '#CB4F4F',
    opacity: '0.8',
    flex: 'none',
    order: '1',
    flexGrow: '0',
  };

  //stop
  const stopButtonShape: React.CSSProperties = {
    display: 'flex',
    fontSize: '14px',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    width: '252px',
    height: '48px',
    // left: '1482px',
    // top: '1081px',
    borderRadius: '42px',
    padding: '14px 24px',
    columnGap: '16px',
    background: '#212121',
    border: '1px solid rgba(243, 246, 248, 0.1)',
    boxShadow:
      '0px 18px 24px rgba(0, 0, 0, 0.16), 0px 12px 16px rgba(6, 9, 11, 0.1), 0px 6px 12px rgba(0, 0, 0, 0.18), 0px 1px 20px rgba(0, 0, 0, 0.12)',
    cursor: 'pointer',
    bottom: '20px',
  };

  const stopIcon: React.CSSProperties = {
    width: '14px',
    height: '16px',
    background: 'rgba(243, 246, 248, 0.9)',
    // opacity: '0.8',
    // boxShadow: '0px 2px 6px rgba(215, 89, 89, 0.24), 0px 6px 10px rgba(215, 89, 89, 0.2), 0px 1px 16px rgba(215, 89, 89, 0.06)',
    borderRadius: '1px',
    flex: 'none',
    order: '0',
    flexGrow: '0',
  };

  const stopText: React.CSSProperties = {
    height: '16px',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#F3F6F8',
    opacity: '0.8',
    flex: 'none',
    order: '1',
    flexGrow: '0',
  };

  return (
    <>
      <style>{glowingAnimation}</style>
      <button
        style={isHover ? stopButtonShape : recordButtonShape}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={props.handleClick}
      >
        <div style={isHover ? stopIcon : recordIcon} />

        <div style={isHover ? stopText : recordText}>
          {isHover ? 'Stop recording' : 'Recording in progress'}
        </div>
      </button>
    </>
  );
};

export default RecordButton;
