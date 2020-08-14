import React, { useState, useEffect } from 'react';
import Recorder from './Recorder.jsx';

const App = () => {
  useEffect(() => {
    // Create a connection to the background page
    const backgroundPageConnection = chrome.runtime.connect({
      name: 'panel',
    });
    // send tab ID to background page
    backgroundPageConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  }, []);
  return (
    <div>
      <Recorder />
    </div>
  );
};

export default App;
