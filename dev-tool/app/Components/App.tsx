/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Recorder from './Recorder';
import StateTree from './StateTree';
import TextBox from './TextBox';
import type { CSSProperties } from 'react';
/* eslint-enable */

const App: React.FC = () => {
  const [status, setStatus] = useState(true);
  const [connected, setConnected] = useState(false);
  const [fileReceived, setFileReceived] = useState(false);
  const [stateChange, setStateChange] = useState({});
  const [test, setTest] = useState('');

  useEffect(() => {
    // Create a connection to the background page
    const backgroundConnection = chrome.runtime.connect();
    // Send tab ID to background.js
    backgroundConnection.postMessage({
      action: 'connectChromogen',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    // Listen for messages from background.js
    backgroundConnection.onMessage.addListener((message) => {
      if (message.action === 'moduleConnected') {
        setConnected(true);
      }
      if (message.action === 'setStatus') {
        setStatus(!status);
      }
      if (message.action === 'editFileReceived') {
        if (message.data) {
          console.log('this is app.tsx and message is', message);
          setFileReceived(true);
          const testAsArray = message.data;
          const blob = new Blob(testAsArray);
          const blobreader = new FileReader();
          blobreader.readAsText(blob);
          // load event fires when a file has been read successfully
          const readFile = blobreader.addEventListener('loadend', function () {
            setTest(String(blobreader.result));
            return blobreader.result;
          });
        }
      }
      if (message.action === 'stateChange') {
        setStateChange(message.stateObj);
      }
    });
  }, [connected, status, fileReceived]);

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

  const reset = () => {
    setStatus(true);
    setConnected(false);
    setFileReceived(false);
    setStateChange({});
    setTest('');
    return
  }

  return connected ? (
    // Render extension if Chromogen is installed
    <div className="App">
      <div id="header">chromogen</div>
      <button id="refreshBtn"
        style={{ ...hooksButtonStyle, backgroundColor: '#7f7f7f' }}
        onMouseEnter={() => document.getElementById("refreshBtn")!.style.color = '#f6f071'}
        onMouseLeave={() => document.getElementById("refreshBtn")!.style.color = '#90d1f0'}
        onClick={() => reset()}>
        Refresh
      </button>
      <Recorder status={status} />
      <StateTree state={stateChange} />
      <TextBox test={test} />
    </div>
  ) : (
    // Otherwise, render 'please install' message along with Github Icon
    <div id="installContainer">
      <div />

      <div id="installMessage">
        <div>Please </div>
        <code>npm install chromogen </code>
        <div>in your app before using this extension. </div>
        <span>github.com/oslabs-beta/Chromogen</span>
      </div>

      <div />
    </div>
  );
};

export default App;
