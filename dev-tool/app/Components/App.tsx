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
  const [stateChange, setStateChange] = useState('');

  useEffect(() => {
    console.log('testing use effect')
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
        const fileBlob = message.file;
        setFileRecieved(true);
        console.log('we are now in devtool app.tsx and our blob is:', fileBlob)
        const blobreader = new FileReader();
        const fileAfterRead = blobreader.readAsDataURL(fileBlob);
        //console.log('setFileRieved should be', fileRecieved)
        console.log(fileAfterRead);
        // FileReader.readAsDataURL(fileBlob)
        // Blob.text(fileBlob);
      }
      if (message.action === 'stateChange'){
       // console.log('state has been changed', message.result)
       //if state has changed from HooksChromogenObserver, stringify the object to display
        setStateChange(JSON.stringify(message.result));
        //not sure if this can be sent back as an object. need to test on someone that can view console logs
      }
    });
  }, [connected, status]);

  return connected ? (
    // Render extension if Chromogen is installed
    <div className="App">
      <div className="header">chromogen</div>
      <Recorder status={status} />
      <StateTree />
      <p>Here is the STATE as a string {stateChange}</p>
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
