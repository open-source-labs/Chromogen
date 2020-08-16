import React, { useState, useEffect } from 'react';
import {
  // eslint-disable-next-line camelcase
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilState,
  selector as recoilSelector,
  atom as recoilAtom,
} from 'recoil';
import output from './testString';

// ----- TESTING -----
// Arrays used to compose test string
const writeables = [];
const readables = [];
const snapshots = [];
const initialRender = [];

const recordingState = recoilAtom({ key: 'recordingState', default: true });

// ----- SHADOW CONSTRUCTORS for SELECTOR / ATOM -----
export const selector = (config) => {
  const { key, get, set } = config;

  // Inject code to "get" method of selector
  const getter = get
    ? (arg) => {
        const newValue = get(arg);
        if (arg.get(recordingState)) {
          const len = snapshots.length;
          if (len === 0) {
            initialRender.push({ key, newValue });
          } else {
            snapshots[len - 1].selectors.push({ key, newValue });
          }
        }
        return newValue;
      }
    : null;

  // Create new config object with injected getter
  const newConfig = { key, get: getter };

  // Inject code to "set" method of selector (if defined)
  if (set) {
    newConfig.set = (...args) => set(...args);
  }

  // Create Recoil selector with injected properties
  const newSelector = recoilSelector(newConfig);

  // Add selector object to "readables" array
  readables.push(newSelector);

  // Return the normal selector out to the app
  return newSelector;
};

export const atom = (config) => {
  const newAtom = recoilAtom(config);
  newAtom.default = config.default; // can't destructure default from config?
  writeables.push(newAtom);
  return newAtom;
};

// ----- TRANSACTION PROVIDER -----
const buttonStyle = {
  display: 'block',
  position: 'absolute',
  top: '10px',
  left: '10px',
  margin: '0px',
  padding: '0px',
  height: '10px',
  width: '10px',
};

// TODO: size div correctly to content
// Used to ensure appropriate button contrast for varying page backgrounds
const divStyle = {
  display: 'inline-block',
  position: 'absolute',
  backgroundColor: 'grey',
  margin: 0,
};

// Provider component used to access state snapshots
export const ChromogenObserver = () => {
  // File stores URL for generated test file Blob containing output() string
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useRecoilState(recordingState);

  // Auto-click download link when a new file is generated (via button click)
  useEffect(() => document.getElementById('chromogen-download').click(), [file]);

  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    let addToHistory = false;
    // Map current snapshot to array of atom states
    if (snapshot.getLoadable(recordingState).contents && recording) { // Snapshot fires before with updated state BEFORE updating atom state
      const state = writeables.map((item, i) => {
        const { key } = item;
        const value = snapshot.getLoadable(item).contents;
        const history = snapshots.length;
        // Check whether value is updated from last snapshot
        const updated = (history === 0) ? item.default !== value : snapshots[history - 1].state.find((el) => el.key === key).value !== value;
        if (updated) addToHistory = true;
        return { key, value, updated };
      });

      // Add current transaction snapshot to snapshots array
      if (addToHistory) snapshots.push({ state, selectors: [] });

    }
  });


  // Render button to DOM for capturing test output, and creates invisible download link for test file
  return (
    <div style={divStyle}>
      <button
        aria-label="capture test"
        style={{ ...buttonStyle, backgroundColor: 'green' }}
        type="button"
        onClick={() =>
          setFile(
            URL.createObjectURL(
              new Blob([output(writeables, readables, snapshots, initialRender)]),
            ),
          )
        }
      />
      <button
        aria-label={recording ? 'pause' : 'record'}
        style={{ ...buttonStyle, backgroundColor: recording ? 'red' : 'yellow', left: '30px' }}
        type="button"
        onClick={() => {
          setRecording(!recording);
        }}
      />
      <a
        download="chromogen.test.js"
        href={file}
        id="chromogen-download"
        style={{ display: 'none' }}
      >
        Download Test
      </a>
    </div>
  );
};
