//potentially a component to track state changes of user App

/*Flow of Chromgen 2.0
- Use regex to determine whether user is using Recoil or React hooks (can only be one or the other, not testing for both, for now)
1. user imports Chromogen useState and useReducer
2. user performs state changing events
 a)hooks obersver stores every change of state
 b)tracking state changes to make sure their hooks are updating state
3. user stops recording
  a)on-click generate tests for useState and useReducer
    i) user current state should not equal previous state
    ii) user current state should not equal undefined or null
4. export the generated test file in output
5. import test file into modal.ts
6. In Modal.ts, render a modal with test file
7. User decides whether to keep the file or not
  a) on-click of download button, send the file to the user
  b) on-click of cancel button, close modal
8. Make sure Chrome dev tool is reading from package correctly as well
Look into React.createContext and useContext for hook obersver logic */

/* eslint-disable */
import type { CSSProperties } from 'react';
// import React, { useState, useEffect, useRef } from 'react';

import { hooksLedger as ledger } from '../utils/hooks-ledger';
import { hooksOutput as output } from '../output/hooks-output';
// import { Ledger } from '../types';

/* eslint-enable */

// Create buttonStyles and divStyles here
const hooksButtonStyle: CSSProperties = {
  display: 'inline-block',
  margin: '8px',
  padding: '0px',
  height: '25px',
  width: '65px',
  borderRadius: '4px',
  justifyContent: 'space-evenly',
  border: '1px',
  cursor: 'pointer',
  color: '#90d1f0',
  fontSize: '10px',
};

const hooksDivStyle: CSSProperties = {
  display: 'inline-block',
  position: 'absolute',
  bottom: '16px',
  left: '16px',
  backgroundColor: '#aaa',
  borderRadius: '4px',
  margin: 0,
  padding: 0,
  zIndex: 999999,
};

const hooksPlayStyle: CSSProperties = {
  boxSizing: 'border-box',
  marginLeft: '25px',
  borderStyle: 'solid',
  borderWidth: '7px 0px 7px 14px',
};

const hooksPauseStyle: CSSProperties = {
  width: '14px',
  height: '14px',
  borderWidth: '0px 0px 0px 10px',
  borderStyle: 'double',
  marginLeft: '27px',
};

export const hookStyles = { hooksButtonStyle, hooksDivStyle, hooksPlayStyle, hooksPauseStyle };


// Export generateFile as a function (which takes in a setFile function and storeMap) that deconstructs state/transactions and sets to the ledger*, along with a finalLedger that will check whether the mapped store size > 0, if truthy, return a new ledger with both state and transaction arrays containing the user input ("key"). Else, return ledger*.
  // generateFile will return setHooksFile passing in the URL Blob as an argument (downloadable file)
  // generateFile is used as an onClick function inside hooks ChromogenObserver = meaning that this function is only invoked once download file hass started for user. This keeps performance cost low, since it never interacts with the main application.

export const generateHooksFile = (setHooksFile: Function): void => {
  // const { transaction } = ledger;


  return setHooksFile(URL.createObjectURL(new Blob([output(ledger)])));
}