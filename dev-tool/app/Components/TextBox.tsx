import React, { useState, useEffect } from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';

const TextBox: React.FC = () => {
  
  // const [test, setTest] = useState(false);
  
  // useEffect(() => {
  //   // Create a connection to the background page
  //   const backgroundConnection = chrome.runtime.connect();
  //   // Send tab ID to background.js
  //   backgroundConnection.postMessage({
  //     action: 'connectChromogen',
  //     tabId: chrome.devtools.inspectedWindow.tabId,
  //   });
  //   // Listen for messages from background.js
  //   backgroundConnection.onMessage.addListener((message) => {
  //     if (message.action === 'editFileBack'){
  //       //read file and render in textbox
  //       console.log('editFileString has been set back')
  //       setTest(true);
  //     }
  //   });
  // }, [test]);
  
  
  //connect to background
  const backgroundConnection = chrome.runtime.connect();

   const sendMessage = (action: string) => {
      backgroundConnection.postMessage({
        action,
        tabId: chrome.devtools.inspectedWindow.tabId,
      });
    };
  
   return (
    <div className = "textBoxComp">
       {/* <p>I am in a paragraph</p> */}
      {/* when user clicks the button, file will be automatically downloaded */}
      {/* <button id="recorderBtn" type="submit" onClick={() => sendMessage('downloadFile')}>
        <GetAppIcon style={{ fontSize: '38px' }} />
      </button> */}

      <div id="textBoxEdit">
        <textarea>
           here is where we need to read file
        </textarea>
      </div>
      {/* read from file and make it editable */}
    </div>
 ) 
}

export default TextBox;