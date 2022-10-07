/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { dummyParam } from '../utils/utils';
import { useStore } from '../utils/store';
import { styles, generateFile, generateTests } from './component-utils';
/* eslint-enable */

const selector = (state) => ({
  recording: state.recording,
  toggleRecording: state.toggleRecording,
});

export const ChromogenZustandObserver: React.FC<{ store?: object }> = ({ store }) => {
  // Initializing as undefined over null to match React typing for AnchorHTML attributes
  const [file, setFile] = useState<undefined | string>(undefined);
  const [storeMap, setStoreMap] = useState<Map<string, string>>(new Map());
  const { recording, toggleRecording } = useStore<{
    recording: boolean;
    toggleRecording: Function;
  }>(selector);
  const [devtool, setDevtool] = useState<boolean>(false);
  const [, setEditFile] = useState<undefined | string>(undefined);

  // DevTool message handling
  const receiveMessage = (message: any) => {
    switch (message.data.action) {
      case 'connectChromogen':
        setDevtool(true);
        window.postMessage({ action: 'moduleConnected' }, '*');
        break;
      case 'downloadFile':
        generateFile(setFile, storeMap);
        break;
      case 'editFile':
        const array = generateFile(setEditFile, storeMap);
        window.postMessage({ action: 'editFileReceived', data: array }, '*');
        break;
      case 'toggleRecord':
        toggleRecording();
        window.postMessage({ action: 'setStatus' }, '*');
        break;
      default:
      // Do nothing
    }
  };

  // Add/remove DevTool event listeners
  useEffect(() => {
    window.addEventListener('message', receiveMessage);

    return () => window.removeEventListener('message', receiveMessage);
  });

  // Auto-click download link when a new file is generated (via button click)
  useEffect(() => document.getElementById('chromogen-download')!.click(), [file]);
  // ! to get around strict null check in tsconfig

  // Update storeMap with src variable names if store prop passed
  useEffect(() => {
    if (store !== undefined) {
      const storeArr = Array.isArray(store) ? store : [store];
      const newStore: Map<string, string> = new Map();

      storeArr.forEach((storeModule) => {
        Object.entries(storeModule).forEach(([variable, imported]: [any, any]) => {
          let key;
          /** Relevant imports will be either an object (for vanilla atoms or selectors)
           * or functions (for atom or selector families). If we are examining a family function,
           * we will need to invoke it to create an atom/selector in order to pull the
           * original family key out from the generated atom or selector's individual key.
           * */
          if (typeof imported === 'function') {
            // Extended atom fam key will follow format of `[key]__"chromogenDummyParam"__withFallback`
            // Extended selector fam key will follow format of `[key]__selectorFamily/"chromogenDummyParam"/1`
            const extendedKey = imported(dummyParam).key;
            key = extendedKey.includes('selectorFamily')
              ? extendedKey.substring(0, extendedKey.indexOf('selectorFamily') - 2)
              : extendedKey.substring(0, extendedKey.indexOf(`"${dummyParam}"`) - 2);
          } else {
            key = imported.key;
          }
          newStore.set(key, variable);
        });
      });
      setStoreMap(newStore);
    }
  }, []);

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
        // Render button div only if DevTool not connected
        !devtool && (
          <div>
            <div style={styles.divStyle}>
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
        )
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
