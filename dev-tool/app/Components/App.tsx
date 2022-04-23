/* eslint-disable */
import React, { useState, useEffect } from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import Recorder from './Recorder';
import StateTree from './StateTree';
import TextBox from './TextBox';
import TreeChart from '../stateTree';
import { Message } from '@material-ui/icons';
/* eslint-enable */

const App: React.FC = () => {
  const [status, setStatus] = useState(true);
  const [connected, setConnected] = useState(false);
  const [fileReceived, setFileReceived] = useState(false);
  const [stateChange, setStateChange] = useState({});
  // state variable for chromogen's test
  const [test, setTest] = useState('');

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
          setFileReceived(true);
          const testAsArray = message.data;
          const blob = new Blob(testAsArray);
          // const blob = new Blob([JSON.stringify(testAsArray)]);
          console.log('WHAT DOES BLOB LOOK LIKE', blob);
          //console.log('we are now in devtool app.tsx and our blob is:', fileBlob)
          const blobreader = new FileReader();
          blobreader.readAsText(blob);
          // load event fires when a file has been read successfully
          const readFile = blobreader.addEventListener('loadend', function () {
            console.log('FILE I WANT TO RENDER', blobreader.result)
            setTest(String(blobreader.result));
            return blobreader.result;
          })
        }
      }
      if (message.action === 'stateChange'){
       // console.log('state has been changed', message.result)
       //if state has changed from HooksChromogenObserver, stringify the object to display
        // setStateChange(JSON.stringify(message.stateObj)); // need stateObj as object, not as string
        setStateChange(message.stateObj);
        //not sure if this can be sent back as an object. need to test on someone that can view console logs
      }
    });
  }, [connected, status, fileReceived]);

  return connected ? (
    // Render extension if Chromogen is installed
    <div className="App">
      <div className="header">chromogen</div>
      <Recorder status={status} />
      <StateTree state={stateChange} />
      <p>Here is the STATE as a string {stateChange}</p>
      <TextBox test={test}/>
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
