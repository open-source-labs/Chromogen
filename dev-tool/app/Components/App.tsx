/* eslint-disable */
import React, { useState, useEffect } from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import Recorder from './Recorder';
import StateTree from './StateTree';
import TextBox from './TextBox';
/* eslint-enable */

const App: React.FC = () => {
  const [status, setStatus] = useState(true);
  const [connected, setConnected] = useState(false);
  const [fileRecieved, setFileRecieved] = useState(false);

  // const blobreader = new FileReader();

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
      console.log('inside app.tsx, message received from background', message)
      if (message.action === 'moduleConnected') {
        setConnected(true);
      }
      if (message.action === 'setStatus') {
        setStatus(!status);
      }
      if (message.action === 'editFileReceived') {
        if (message.data) {
          console.log('this is app.tsx and message is', message)
          setFileRecieved(true);
          const testAsArray = message.data;
          const blob = new Blob(testAsArray)
          console.log('WHAT DOES BLOB LOOK LIKE', blob);
          //console.log('we are now in devtool app.tsx and our blob is:', fileBlob)
          const blobreader = new FileReader();
          blobreader.readAsDataURL(blob);
          // load event fires when a file has been read successfully
          const readFile = blobreader.addEventListener("load", function () {
            //console.log('FILE I WANT TO RENDER', fileToBeRendered)
            return blobreader.result;
          })
          console.log('WHAT IS READFILE', readFile)
          console.log('setFileRieved should be', fileRecieved)
        }
        // FileReader.readAsDataURL(fileBlob)
        // Blob.text(fileBlob);
      }
    });
  }, [connected, status, fileRecieved]);

  return connected ? (
    // Render extension if Chromogen is installed
    <div className="App">
      <div className="header">chromogen</div>
      <Recorder status={status} />
      <StateTree />

      <TextBox />
    </div>
  ) : (
    // Otherwise, render 'please install' message along with Github Icon
    <div id="installContainer">
      <div />

      <div id="installMessage">
        <div>Please </div>
        <code>npm install chromogen </code>
        <div>in your app before using this extension. </div>
        <div>
          <GitHubIcon /> <span>github.com/oslabs-beta/Chromogen</span>
        </div>
      </div>

      <div />
    </div>
  );
};

export default App;
