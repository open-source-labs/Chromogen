import React, { useState, useEffect } from 'react';

const TextBox: React.FC<{ test: any }> = ({ test }) => {
  // Connect to background.js
   const backgroundConnection = chrome.runtime.connect();

   const sendMessage = (action: string) => {
      backgroundConnection.postMessage({
        action,
        tabId: chrome.devtools.inspectedWindow.tabId,
      });
   };  
   console.log('test in textbox', test);
   console.log('test leNGTH', test.length);
   console.log('type OF TEST', typeof test);

 return (
   <div id="textBox">
      <div id="label">Tests</div>
      <div id="textBoxEdit">
       {test.length ? (
        <textarea>
         {test}
        </textarea>
       ) : (
        <textarea>
          'here is where we need to read file'
        </textarea>
        )}
      </div>
   </div>
 );
}

export default TextBox;