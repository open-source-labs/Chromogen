/* eslint-disable */
import React, { useState, useEffect, useRef, useReducer } from 'react';
/* eslint-enable */
//Toggle for manually toggling between react hooks or recoil (?)

//create similar function like ChromogenObserver's useReactTransactionObserver
//define a function that records previous and current state using useEffect and useRef

type store = {};

// Export hooksChromogenObserver
export const hooksChromogenObserver: React.FC<store> = ({ store }) => {
  // Initializing as undefined over null to match React typing for AnchorHTML attributes
  // File will be string
  const [file, setFile] = useState<undefined | string>(undefined);
  // StoreMap will be an Map (object) with string keys and string values
  const [storeMap, setStoreMap] = useState<Map<string, string>>(new Map());
  // RecordingState is imported from hooks-store
  const [recording, setRecording] = useState<boolean>(recordingState);
  // DevTool will be default false unless user opens up devTool (=> true)
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
  });

  // Auto-click download link when a new file is generated (via button click)
  useEffect(() => document.getElementById('chromogen-download')!.click(), [file]);

  // Update storeMap with src variable names if store prop passed
  //   useEffect(() => {
  //     if (store !== undefined)
  //   })

  // usePrevious custom hook for grabbing the previous state value
  function usePrevious(value) {
    // Current state value is stored inside ref
    // useRef will return a mutable ref object with a current property initialized to the current passed in argument. This object will persist for full lifetime of the component
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes

    return ref.current; // Previous value (happens before update in useEffect)
  }

  // useReactTransactionObserver
  const useReactTransactionObserver = (previousSnapshot, snapshot) => {
    // For [state, setState], when setState is invoked, we want to push the prevState and currState to our transactions state array. Else => nothing is done (void function)
    if (transactions[state] > 0) {
      const { transactions } = ledger;

      // newState

      // prevState
      const prevState = usePrevious()
    }
  };
  // Render toggle functionality first, then depending on what user selects, render corresponding ChromogenObserver (may need to edit ChromogenObserver file for Recoil)
  // Button download: onClick for generateHooksFile
  // Button record: onClick for setRecording
  return {};
};
