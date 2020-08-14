import React, { useState, useEffect } from 'react';
import {
  selector as recoilSelector,
  atom as recoilAtom,
  // eslint-disable-next-line camelcase
  useRecoilTransactionObserver_UNSTABLE,
} from 'recoil';
import output from './testString';

// ----- TESTING -----
// Arrays used to compose test string
const writeables = [];
const readables = [];
const snapshots = [];
const initialRender = [];

// ----- SHADOW CONSTRUCTORS for SELECTOR / ATOM -----
export const selector = (config) => {
  const { key, get, set } = config;

  // Inject code to "get" method of selector
  const getter = get
    ? (...args) => {
        const newValue = get(...args);
        const len = snapshots.length;
        if (len === 0) {
          initialRender.push({ key, newValue });
        } else {
          snapshots[len - 1].selectors.push({ key, newValue });
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
  writeables.push(newAtom);
  return newAtom;
};

// ----- TRANSACTION PROVIDER -----
const style = {
  display: 'block',
  position: 'absolute',
  top: '10px',
  left: '10px',
  margin: '0px',
  padding: '0px',
  height: '10px',
  width: '10px',
  backgroundColor: 'red',
};

// Provider component used to access state snapshots
export const ChromogenObserver = () => {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    // Map current snapshot to array of atom states
    const state = writeables.map((item) => {
      const { key } = item;
      const value = snapshot.getLoadable(item).contents;
      return { key, value };
    });

    // Add current transaction snapshot to snapshots array
    snapshots.push({ state, selectors: [] });
  });

  // File stores URL for generated test file Blob containing output() string
  const [file, setFile] = useState(null);

  // Auto-click download link when a new file is generated (via button click)
  useEffect(() => document.getElementById('chromogen-download').click(), [file]);

  // Render button to DOM for capturing test output, and creates invisible download link for test file
  return (
    <div>
      <button
        aria-label="capture test"
        style={style}
        type="button"
        onClick={() =>
          setFile(
            URL.createObjectURL(
              new Blob([output(writeables, readables, snapshots, initialRender)]),
            ),
          )
        }
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
