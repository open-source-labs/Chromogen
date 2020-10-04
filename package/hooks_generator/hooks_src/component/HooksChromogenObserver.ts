/* eslint-disable */
import React, { useState, useEffect, useRef, useReducer } from 'react';
/* eslint-enable */
//Toggle for manually toggling between react hooks or recoil (?)

//create similar function like ChromogenObserver's useReactTransactionObserver
//define a function that records previous and current state using useEffect and useRef

type store = {
    
}

// Export hooksChromogenObserver
export const hooksChromogenObserver: React.FC<store> = ({ store }) => {
  // Initializing as undefined over null to match React typing for AnchorHTML attributes
  const [file, setFile] = useState<undefined | string>(undefined);
  const [storeMap, setStoreMap] = useState<Map<string, string>>(new Map());
  const [recording, setRecording] = useState<boolean>(recordingState);
  const [devtool, setDevtool] = useState<boolean>(false);

  // DevTool message handling
    // We want the user to manually toggle between Hooks or Recoil on both DevTool & main app (ADD IN FUNCTIONALITY)
  const receiveMessage = (message: any) => {
    switch (message.data.action) {
      case 'connectChromogen':
        setDevtool(true);
        window.postMessage({ action: 'moduleConnected' }, '*');
        break;
      case 'downloadFile':
        generateFile(setFile, storeMap);
        break;
      case 'toggleRecord':
        setRecording(!recording);
        window.postMessage({ action: 'setStatus' }, '*');
        break;
      default:
      // Do nothing
    }
  };

  // Add DevTool event listeners
  useEffect(() => {
      window.addEventListener('message', receiveMessage);

      return () => window.removeEventListener('message', receiveMessage);
  })

  // Auto-click download link when a new file is generated (via button click)
  useEffect(() => document.getElementById('chromogen-download')!.click(), [file]);

  // Update storeMap with src variable names if store prop passed
  useEffect(() => {

  })

  // useReactTransactionObserver

  // Render toggle functionality first, then depending on what user selects, render corresponding ChromogenObserver (may need to edit ChromogenObserver file for Recoil)
  return (
      {

      }
  )
};
