import React, { useState, useEffect } from 'react';
import Recorder from './Recorder';

const App: React.FC = () => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    // Create a connection to the background page
    const backgroundConnection = chrome.runtime.connect();
    // Send tab ID to background.js
    backgroundConnection.postMessage({
      action: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
    // Listen for messages from background.js
    backgroundConnection.onMessage.addListener((message) => {
      if (message.action === 'setStatus') {
        setStatus(!status);
      }
    });
  });

  return (
    <div className="App">
      <div className="row">chromogen</div>
      <Recorder status={status} />
    </div>
  );
};

export default App;
