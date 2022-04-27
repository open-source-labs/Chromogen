/* eslint-disable */
import React, { useState, useEffect } from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
// import { GitHub } from '../../build/imgs/github'
import Recorder from './Recorder';
import StateTree from './StateTree';
import TextBox from './TextBox';
import { Message } from '@material-ui/icons'; // -> remove?
/* eslint-enable */

const App: React.FC = () => {
  const [status, setStatus] = useState(true);
  const [connected, setConnected] = useState(false);
  const [fileReceived, setFileReceived] = useState(false);
  const [stateChange, setStateChange] = useState({});
  // state variable for chromogen's test
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
      // console.log('inside app.tsx, message received from background', message)
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
          //console.log('we are now in devtool app.tsx and our blob is:', fileBlob)
          const blobreader = new FileReader();
          blobreader.readAsText(blob);
          // load event fires when a file has been read successfully
          const readFile = blobreader.addEventListener('loadend', function () {
            setTest(String(blobreader.result));
            return blobreader.result;
          })
        }
      }
      if (message.action === 'stateChange'){
       // console.log('state has been changed', message.result)
      //  if state has changed from HooksChromogenObserver, stringify the object to display
        // setStateChange(JSON.stringify(message.stateObj)); // need stateObj as object, not as string
        setStateChange(message.stateObj);
        //not sure if this can be sent back as an object. need to test on someone that can view console logs
      }
    });
  }, [connected, status, fileReceived]);

  // const d3testState = {
  //   name: 'Sung',
  //   children: [
  //     {
  //       name: 'Dani', 
  //       children: [
  //         {name: 'Lina',
  //         children: [
  //           {name: 'Bruno'}, 
  //           {name: 'Olive'},
  //         ]}, 
  //         { name: 'Marcellies', 
  //           children: [
  //             {name: 'Michael'}, 
  //             {name: 'Caitlin'},
  //             {name: 'Kai'}
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }

  // const d3testState = {
  //   name: 'Chromogen Observer',
  //   children: [
  //     { stateChange }
  //   ]
  // }

  return connected ? (
    // Render extension if Chromogen is installed
    <div className="App">
      <p className="header">chromogen</p>
      <span>
        <Recorder status={status} />
      </span>
      <StateTree state={stateChange}/>
      <TextBox test={test}/>
    </div>
  ) : (
    // Otherwise, render 'please install' message along with Github Icon
    <div id="installContainer">
      <div />

      <div id="installMessage">

        <div>Please </div>
        <code>npm install team mslead </code>
        <div>in your app before using this extension. </div>
        <div>
            <GitHubIcon />
            {/* {GitHub()} */}
            {/* <img src="" alt="" /> */}
        </div>
            <span>github.com/oslabs-beta/Chromogen</span>
      </div>

      <div />
    </div>
  );
};

export default App;
