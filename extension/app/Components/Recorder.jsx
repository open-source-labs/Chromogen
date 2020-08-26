import React from 'react';

const Recorder = () => {
  // send Message to content.js to teel Chromogen to download file
  const backgroundConnection = chrome.runtime.connect();
  const downloadFile = () => {
    // send message to background.js
    backgroundConnection.postMessage({
      action: 'downloadFile',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  };

  const toggleRecord = () => {
    backgroundConnection.postMessage({
      action: 'toggleRecord',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  }

  return (
    <div className="recorder-div">
      <button id="recorderBtn" type="submit" onClick={toggleRecord}>
        Start Recording!
      </button>
      <button id="recorderBtn" type="submit" onClick={downloadFile}>
        Download!
      </button>
    </div>
  );
};

export default Recorder;
