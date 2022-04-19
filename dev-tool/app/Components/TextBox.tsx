import React, { useState, useEffect } from 'react';

const TextBox: React.FC = () => {
   const backgroundConnection = chrome.runtime.connect();

   const sendMessage = (action: string) => {
      backgroundConnection.postMessage({
        action,
        tabId: chrome.devtools.inspectedWindow.tabId,
      });
    };  
 return (
   <div id="textBox">
      <div id="label">Tests</div>
      <div id="textBoxEdit">
        <textarea>
         here is where we need to read file
         {}
        </textarea>
      </div>
   </div>
 );
}

export default TextBox;