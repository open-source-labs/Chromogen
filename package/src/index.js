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
// Arrays used to compose test strings
export const writeables = [];
export const snapshots = [];
export const initialRender = [];
export let readables = [];

// State for recording toggle
const recordingState = recoilAtom({ key: 'recordingState', default: true });

// ----- SHADOW CONSTRUCTORS for SELECTOR / ATOM -----
export const selector = (config) => {
  const { key, get, set } = config;
  let returnedPromise = false;

  /**
   * If get is undefined, native Async, or transpiled generator-based async from Babel (id'd via RegEx),
   * we don't do any injecting or tracking. It just gets created & returned back out.
   *
   * Otherwise, we attempt to wrap it with a custom getter that logs the return
   * value on each update to the corresponding snapshot in the snapshots array.
   *
   * If get returns a promise on page load, we delete it from the readables array
   * and do not track it on subsequent calls (via "returnedPromise" flag).
   */

  if (
    !get
    || get.constructor.name === 'AsyncFunction'
    || get.toString().match(/^\s*return\s*_get.*\.apply\(this, arguments\);$/m)
  ) {
    return recoilSelector(config);
  }

  // Wrap get method with tracking logic
  const getter = (arg) => {
    // Run user-defined get method & capture its return value
    const newValue = get(arg);

    // Only capture selector data if currently recording
    if (arg.get(recordingState)) {
      if (snapshots.length === 0) {
        // Promise-validation is expensive, so we only do it once, on initial load
        if (
          typeof newValue === 'object'
          && newValue !== null
          && Object.prototype.toString.call(newValue) === '[object Promise]'
        ) {
          readables = readables.filter((el) => el.key !== key);
          returnedPromise = true;
        } else {
          initialRender.push({ key, newValue });
        }
      } else if (!returnedPromise) {
        setTimeout(() => snapshots[snapshots.length - 1].selectors.push({ key, newValue }), 0);
      }
    }

    // Return out value from original get method
    return newValue;
  };

  // Create a new config object with updated properties
  const newConfig = { key, get: getter };
  if (set) {
    newConfig.set = (...args) => set(...args);
  }

  // Create selector & add to readables for test setup
  const trackedSelector = recoilSelector(newConfig);
  readables.push(trackedSelector);
  return trackedSelector;
};

// Track atoms for test setup via writeables array
export const atom = (config) => {
  const newAtom = recoilAtom(config);
  writeables.push(newAtom);
  return newAtom;
};

// ----- TRANSACTION PROVIDER -----
const buttonStyle = {
  display: 'inline-block',
  margin: '10px',
  padding: '0px',
  height: '10px',
  width: '10px',
};

// Used to ensure appropriate button contrast for varying page backgrounds
const divStyle = {
  display: 'inline-block',
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: 'grey',
  margin: 0,
  padding: 0,
  zIndex: 999999,
};

export const ChromogenObserver = () => {
  // File stores URL for generated test file Blob containing output() string
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useRecoilState(recordingState);

  // Auto-click download link when a new file is generated
  useEffect(() => document.getElementById('chromogen-download').click(), [file]);

  useRecoilTransactionObserver_UNSTABLE(({ previousSnapshot, snapshot }) => {
    // Map current snapshot to array of atom states
    // Can't directly check recording hook b/c TransactionObserver runs before state update
    if (snapshot.getLoadable(recordingState).contents) {
      const state = writeables.map((item) => {
        const { key } = item;
        const value = snapshot.getLoadable(item).contents;
        const previous = previousSnapshot.getLoadable(item).contents;
        const updated = value !== previous;
        return { key, value, updated };
      });

      // Add current transaction snapshot to snapshots array
      snapshots.push({ state, selectors: [] });
    }
  });

  // Invisible anchor tag needed for file download
  return (
    <div style={divStyle}>
      <button
        aria-label="capture test"
        className="buttons"
        style={{ ...buttonStyle, backgroundColor: 'limegreen' }}
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
        className="buttons"
        style={{ ...buttonStyle, backgroundColor: recording ? 'red' : 'yellow' }}
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
