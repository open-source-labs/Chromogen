/* eslint-disable */
import React from 'react';
import type { CSSProperties } from 'react';
import { useState, useEffect } from 'react';
import '../../build/styles/styles.css';

const Recorder: React.FC<{ status: boolean }> = ({ status }) => {
  // Connect to background.js
  const backgroundConnection = chrome.runtime.connect();

  // Send messages to background.js
  const sendMessage = (action: string) => {
    backgroundConnection.postMessage({
      action,
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  };

  // Create buttonStyles and divStyles here
  const hooksButtonStyle: CSSProperties = {
    display: 'inline-block',
    margin: '8px',
    marginLeft: '13px',
    padding: '0px',
    height: '25px',
    width: '65px',
    borderRadius: '4px',
    justifyContent: 'space-evenly',
    border: '1px',
    cursor: 'pointer',
    color: '#90d1f0',
    fontSize: '10px',
  };

  const hooksDivStyle: CSSProperties = {
    display: 'flex',
    position: 'absolute',
    bottom: '100px',
    left: '100px',
    backgroundColor: '#aaa',
    borderRadius: '4px',
    margin: 0,
    padding: 0,
    zIndex: 999999,
  };

  const hooksPlayStyle: CSSProperties = {
    boxSizing: 'border-box',
    marginLeft: '25px',
    borderStyle: 'solid',
    borderWidth: '7px 0px 7px 14px',
  };

  const hooksPauseStyle: CSSProperties = {
    width: '14px',
    height: '14px',
    borderWidth: '0px 0px 0px 10px',
    borderStyle: 'double',
    marginLeft: '27px',
  };

  const [pauseColor, setPauseColor] = useState('#90d1f0');
  const pauseBorderStyle = {
    borderColor: `${pauseColor}`,
  };

  const [playColor, setPlayColor] = useState('transparent transparent transparent #90d1f0');
  const playBorderStyle = {
    borderColor: `${playColor}`,
  };

  return (
    <div id="buttons">
      <button
        id="recorderBtn"
        //type="submit"
        aria-label={status ? 'pause' : 'record'}
        onClick={() => sendMessage('toggleRecord')}
        style={{ ...hooksButtonStyle, backgroundColor: '#7f7f7f' }}
        onMouseEnter={() =>
          status
            ? setPauseColor('#f6f071')
            : setPlayColor('transparent transparent transparent #f6f071')
        }
        onMouseLeave={() =>
          status
            ? setPauseColor('#90d1f0')
            : setPlayColor('transparent transparent transparent #90d1f0')
        }
      >
        <a>
          {status ? (
            <div style={{ ...hooksPauseStyle, ...pauseBorderStyle }}></div>
          ) : (
            <div style={{ ...hooksPlayStyle, ...playBorderStyle }}></div>
          )}
        </a>
      </button>
      <button
        id="testBtn"
        type="submit"
        onClick={() => sendMessage('editFile')}
        style={{ ...hooksButtonStyle, backgroundColor: '#7f7f7f' }}
        onMouseEnter={() => (document.getElementById('testBtn')!.style.color = '#f6f071')}
        onMouseLeave={() => (document.getElementById('testBtn')!.style.color = '#90d1f0')}
      >
        Show Test
      </button>
      <button
        id="downloadBtn"
        style={{ ...hooksButtonStyle, backgroundColor: '#7f7f7f' }}
        onMouseEnter={() => (document.getElementById('downloadBtn')!.style.color = '#f6f071')}
        onMouseLeave={() => (document.getElementById('downloadBtn')!.style.color = '#90d1f0')}
        onClick={() => sendMessage('downloadFile')}
      >
        Download
      </button>
    </div>
  );
};

export default Recorder;
