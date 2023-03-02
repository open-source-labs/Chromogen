/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useStore } from '../utils/store';
import { styles, generateFile, generateTests } from './component-utils';
/* eslint-enable */

/* using a zustand store to keep track of recording state */
const selector = (state) => ({
  recording: state.recording,
  toggleRecording: state.toggleRecording,
});

export const Panel: React.FC = () => {
  // Initializing as undefined over null to match React typing for AnchorHTML attributes
  const [file, setFile] = useState<undefined | string>(undefined);
  const [storeMap] = useState<Map<string, string>>(new Map());
  const { recording, toggleRecording } = useStore<{
    recording: boolean;
    toggleRecording: Function;
  }>(selector);

  // Auto-click download link when a new file is generated (via button click)
  useEffect(() => document.getElementById('chromogen-download')!.click(), [file]);
  // ! to get around strict null check in tsconfig

  const [pauseColor, setPauseColor] = useState('#90d1f0');
  const pauseBorderStyle = {
    borderColor: `${pauseColor}`,
  };

  const [playColor, setPlayColor] = useState('transparent transparent transparent #90d1f0');
  const playBorderStyle = {
    borderColor: `${playColor}`,
  };

  return (
    <>
      {
        <div>
          <div style={styles.divStyle}>
            <h1>Testing!</h1>
            <button
              aria-label={recording ? 'pause' : 'record'}
              id="chromogen-toggle-record"
              style={{ ...styles.buttonStyle, backgroundColor: '#7f7f7f' }}
              type="button"
              onClick={() => {
                toggleRecording();
                // if (!recording) return true;
                // return false;
              }}
              onMouseEnter={() =>
                recording
                  ? setPauseColor('#f6f071')
                  : setPlayColor('transparent transparent transparent #f6f071')
              }
              onMouseLeave={() =>
                recording
                  ? setPauseColor('#90d1f0')
                  : setPlayColor('transparent transparent transparent #90d1f0')
              }
            >
              <a>
                {recording ? (
                  <div style={{ ...styles.pauseStyle, ...pauseBorderStyle }}></div>
                ) : (
                  <div style={{ ...styles.playStyle, ...playBorderStyle }}></div>
                )}
              </a>
            </button>
            <button
              aria-label="capture test"
              id="chromogen-generate-file"
              style={{
                ...styles.buttonStyle,
                backgroundColor: '#7f7f7f',
                marginLeft: '-2px',
                marginRight: '13px',
              }}
              type="button"
              onClick={() => generateFile(setFile, storeMap)}
              onMouseEnter={() =>
                (document.getElementById('chromogen-generate-file')!.style.color = '#f6f071')
              }
              onMouseLeave={() =>
                (document.getElementById('chromogen-generate-file')!.style.color = '#90d1f0')
              }
            >
              <a>{'Download'}</a>
            </button>
            <button
              aria-label="copy test"
              id="chromogen-copy-test"
              style={{
                ...styles.buttonStyle,
                backgroundColor: '#7f7f7f',
                marginLeft: '-2px',
                marginRight: '13px',
              }}
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(generateTests(storeMap)[0]);
              }}
              onMouseEnter={() =>
                (document.getElementById('chromogen-copy-test')!.style.color = '#f6f071')
              }
              onMouseLeave={() =>
                (document.getElementById('chromogen-copy-test')!.style.color = '#90d1f0')
              }
            >
              <a>{'Copy To Clipboard'}</a>
            </button>
          </div>
        </div>
      }
      <a
        download="chromogen.test.js"
        href={file}
        id="chromogen-download"
        style={{ display: 'none' }}
      >
        Download Test
      </a>
    </>
  );
};
