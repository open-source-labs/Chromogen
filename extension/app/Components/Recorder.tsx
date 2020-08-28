import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import GetAppIcon from '@material-ui/icons/GetApp';

interface RecorderProps {
  status: boolean;
}

const Recorder: React.FC<RecorderProps> = ({ status }) => {
  // Connect to background.js
  const backgroundConnection = chrome.runtime.connect();
  // REFACTOR: generalize to a 'sendmessage' function
  const downloadFile = () => {
    // Send message to background.js
    backgroundConnection.postMessage({
      action: 'downloadFile',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  };

  const toggleRecord = () => {
    // Send message to background.js
    backgroundConnection.postMessage({
      action: 'toggleRecord',
      tabId: chrome.devtools.inspectedWindow.tabId,
    });
  };
  const styles = {
    largeIcon: {
      height: 20,
      width: 20,
    },
  };
  return (
    <div className="recorder-div">
      <button id="recorderBtn" type="submit" onClick={toggleRecord}>
        {status ? (
          <StopIcon style={{ color: '#FCE3A3', fontSize: '40px' }} />
        ) : (
          <PlayArrowIcon style={{ color: '#C74B5A', fontSize: '40px' }} />
        )}
      </button>
      <button id="recorderBtn" type="submit" onClick={downloadFile}>
        <GetAppIcon style={{ fontSize: '38px' }}/>
      </button>
    </div>
  );
};

export default Recorder;
