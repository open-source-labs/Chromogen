import React, { useEffect, useState } from 'react';
import SecondaryButton from './Buttons/SecondaryButton';
import { generateFile, generateTests } from './component-utils';

const toolBar: React.CSSProperties = {
  display: 'flex',
  height: '56px',
  width: '100%',
  padding: '8px 16px',
  alignItems: 'center',
  gap: '8px',
  borderBottom: `1px solid rgba(243,246,248,.05)`,
};

const toolBarLogoBox: React.CSSProperties = {
  height: '40px',
  width: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const toolBarTitleContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  color: '#fff',
  lineHeight: '16px',
  opacity: 0.9,
  marginLeft: '8px',
  rowGap: '4px',
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

export const Header = ({ isHidden, setIsHidden }) => {
  const [file, setFile] = useState<undefined | string>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    copyOff();
  }, [copied]);

  function copyOff() {
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <div style={toolBar}>
      <div style={toolBarLogoBox}>
        <div>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="mask0_40_871" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
              <rect width="40" height="40" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_40_871)">
              <path
                d="M20 35C18.1947 35 16.514 34.5627 14.958 33.688C13.4027 32.8127 12.236 31.5833 11.458 30H6.667V27.208H10.375C10.2363 26.5413 10.16 25.8747 10.146 25.208C10.132 24.5413 10.125 23.861 10.125 23.167H6.625V20.375H10.125C10.125 19.653 10.132 18.9377 10.146 18.229C10.16 17.521 10.264 16.8197 10.458 16.125H6.667V13.333H11.542C11.9307 12.611 12.4237 11.9583 13.021 11.375C13.6183 10.7917 14.278 10.3057 15 9.917L11.958 6.875L13.875 5L17.667 8.792C18.4443 8.542 19.229 8.417 20.021 8.417C20.8123 8.417 21.597 8.542 22.375 8.792L26.208 5L28.125 6.875L25.083 9.917C25.8057 10.3057 26.4517 10.7917 27.021 11.375C27.5903 11.9583 28.0973 12.611 28.542 13.333H33.375V16.125H29.542C29.736 16.8197 29.833 17.521 29.833 18.229V20.375H33.375V23.167H29.833V25.208C29.833 25.8747 29.7637 26.5413 29.625 27.208H33.375V30H28.583C27.8057 31.6113 26.639 32.8473 25.083 33.708C23.5277 34.5693 21.8333 35 20 35ZM20 32.208C21.9447 32.208 23.6043 31.5277 24.979 30.167C26.3543 28.8057 27.042 27.1527 27.042 25.208V18.333C27.042 16.389 26.3543 14.7293 24.979 13.354C23.6043 11.9793 21.9447 11.292 20 11.292C18.0553 11.292 16.3957 11.9793 15.021 13.354C13.6457 14.7293 12.958 16.389 12.958 18.333V25.208C12.958 27.1527 13.6457 28.8057 15.021 30.167C16.3957 31.5277 18.0553 32.208 20 32.208ZM16.667 26.667H23.333V23.875H16.667V26.667ZM16.667 19.625H23.333V16.875H16.667V19.625Z"
                fill="#fff"
                fill-opacity="0.85"
              />
            </g>
          </svg>
        </div>
      </div>
      <div style={toolBarTitleContainer}>
        <div style={toolBarTitle}>Chromogen Tests</div>
        <div style={toolBarDescription}>Interact with the app to generate tests</div>
      </div>
      <a
        style={{ textDecoration: 'none' }}
        download="chromogen.test.js"
        href={file}
        id="chromogen-download"
      >
        <SecondaryButton
          arrow
          value={'Download'}
          icon="download"
          handleClick={() => generateFile(setFile, new Map())}
        />
      </a>
      <SecondaryButton
        icon={copied ? 'check' : 'copy'}
        handleClick={() => {
          navigator.clipboard.writeText(generateTests(new Map())[0]);
          setCopied(true);
        }}
      />
      <SecondaryButton icon="retract" handleClick={() => setIsHidden(!isHidden)} />
    </div>
  );
};
