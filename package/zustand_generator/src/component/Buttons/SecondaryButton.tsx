import React, { useState } from 'react';
import {
  icon_arrow,
  icon_copy,
  icon_download,
  icon_retract,
  icon_expand,
  icon_check,
} from '../Icons';

const downloadButton: React.CSSProperties = {
  font: `-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen", "Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue", sans-serif`,
  color: 'rgba(243, 246, 248, 0.7)',
  backgroundColor: 'rgb(243, 246, 248, 0.03)',
  height: '32px',
  border: '1px solid rgba(243, 246, 248, 0.05)',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '6px',
  gap: '4px',
};

const downloadHover: React.CSSProperties = {
  font: `-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen", "Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue", sans-serif`,
  color: 'rgba(243, 246, 248, 0.7)',
  backgroundColor: 'rgb(243, 246, 248, 0.1)',
  height: '32px',
  border: '1px solid rgba(243, 246, 248, 0.05)',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '6px',
  gap: '4px',
};

const downloadTitleContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const downloadIconBox: React.CSSProperties = {
  height: '20px',
  width: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const downloadTitleText: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '16px',
  color: 'rgba(243, 246, 248, 0.7)',
  marginRight: '12px',
};

const downloadLine: React.CSSProperties = {
  width: '1px',
  height: '20px',
  background: 'rgba(243, 246, 248, 0.05)',
};

export const downloadArrow: React.CSSProperties = {
  width: '20px',
  height: '20px',
};

type Icon = 'download' | 'expand' | 'retract' | 'copy' | 'arrow' | 'check';

interface Props {
  icon: Icon;
  handleClick?: any;
  value?: string;
  arrow?: boolean;
}

const arrowIcons = (key: Icon): JSX.Element => {
  if (key == 'download') return icon_download;
  if (key == 'expand') return icon_expand;
  if (key == 'retract') return icon_retract;
  if (key == 'copy') return icon_copy;
  if (key == 'arrow') return icon_arrow;
  if (key == 'check') return icon_check;
  else return icon_arrow;
};

const ArrowSection: React.FC = () => {
  return (
    <>
      <div style={downloadLine}></div>
      <div style={downloadArrow}>{icon_arrow}</div>
    </>
  );
};

const SecondaryButton: React.FC<Props> = ({ value, arrow, icon, handleClick }) => {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <button
      type="button"
      style={isHover ? downloadHover : downloadButton}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={downloadTitleContainer}>
        <div style={downloadIconBox}>{arrowIcons(icon)}</div>
        {value && <div style={downloadTitleText}>{value}</div>}
      </div>
      {arrow && <ArrowSection />}
    </button>
  );
};

export default SecondaryButton;
