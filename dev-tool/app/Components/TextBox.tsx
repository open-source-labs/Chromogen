import { SettingsEthernetTwoTone } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

const TextBox: React.FC<{test: string}> = ({test}) => {

  useEffect(() => {
    const editBox = document.getElementById('editBoxPost') as HTMLInputElement;
    console.log('editBoxPost plsssssss', editBox.value);
    if (editBox) editBox.value = test;
    
  }, [test]);

  let text = 'here is where we need to read file'

  const backgroundConnection = chrome.runtime.connect();

  // Send messages to background.js
  const sendMessage = (action: string) => {
    backgroundConnection.postMessage({
      action,
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  };

  return (
    <div id="textBox">
      <div id="label">Tests</div>
      <button onClick={() => sendMessage('downloadFile')}>Download</button>
      <div id="textBoxEdit">
          <textarea id='editBoxPost' defaultValue={text}>
          </textarea>
      </div>
    </div>
  );
};




export default TextBox;