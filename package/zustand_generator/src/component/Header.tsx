import React from 'react';

const toolBar: React.CSSProperties = {
  display: 'flex',
  height: '56px',
  width: '100%',
  padding: '8px 16px',
  alignItems: 'center',
  gap: '8px',
};

const toolBarLogoBox: React.CSSProperties = {
  height: '40px',
  width: '40px',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const toolBarLogo: React.CSSProperties = {
  // insert image
};

const toolBarTitleContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  color: '#C6C6C6',
  lineHeight: '16px',
  opacity: 0.9,
  marginLeft: '4px',
  flexGrow: 1,
};

const toolBarTitle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 500,
  fontFamily: 'Inter !important',
};

const toolBarDescription: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 400,
};

const downloadButton: React.CSSProperties = {
  height: '32px',
  width: '138px',
  backgroundColor: 'rgb(243, 246, 248, 0.03)',
  border: '1px solid rgba(243, 246, 248, 0.05)',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '6px 6px 6px 12px',
  gap: '4px',
};

const downloadTitleContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const downloadIconBox: React.CSSProperties = {
  backgroundColor: 'white',
  height: '20px',
  width: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const downloadIcon: React.CSSProperties = {
  // insert image
};

const downloadTitleText: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '16px',
  color: 'rgba(243, 246, 248, 0.7)',
};

const downloadLine: React.CSSProperties = {
  width: '0px',
  height: '20px',
  border: '1px solid rgba(243, 246, 248, 0.05)',
};

export const downloadArrow: React.CSSProperties = {
  width: '20px',
  height: '20px',
  backgroundColor: 'red',
};

export const copyButton: React.CSSProperties = {
  height: '32px',
  width: '32px',
  backgroundColor: 'rgb(243, 246, 248, 0.03)',
  border: '1px solid rgba(243, 246, 248, 0.05)',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  padding: '6px',
};

export const minimizeButton: React.CSSProperties = {
  height: '24px',
  width: '24px',
  backgroundColor: 'white',
  marginLeft: '10px',
  padding: 0,
  cursor: 'pointer',
};

export const minimizeIcon: React.CSSProperties = {};

export const copyIcon: React.CSSProperties = {
  // add icon here
};

export const Header = ({ isHidden, setIsHidden }) => {
  return (
    <div style={toolBar}>
      <div style={toolBarLogoBox}>
        <div style={toolBarLogo} />
      </div>
      <div style={toolBarTitleContainer}>
        <div style={toolBarTitle}>Chromogen Tests</div>
        <div style={toolBarDescription}>Interact with the app to generate tests</div>
      </div>
      <button type="button" style={downloadButton}>
        <div style={downloadTitleContainer}>
          <div style={downloadIconBox}>
            <div style={downloadIcon} />
          </div>
          <div style={downloadTitleText}>Download</div>
        </div>
        <div style={downloadLine}></div>
        <div style={downloadArrow}></div>
      </button>
      <button type="button" style={copyButton}>
        <div style={copyIcon} />
      </button>
      <button type="button" style={minimizeButton} onClick={() => setIsHidden(!isHidden)}>
        <div style={minimizeIcon} />
      </button>
    </div>
  );
};
