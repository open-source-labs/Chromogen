/* eslint-disable */
import React, { useState, useEffect, CSSProperties } from 'react';
import {
  selector as recoilSelector,
  atom as recoilAtom,
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilState,
  RecoilState,
  RecoilValueReadOnly,
  AtomOptions,
  Snapshot,
  ReadWriteSelectorOptions,
  ReadOnlySelectorOptions,
} from 'recoil';
import { Ledger, SelectorConfig } from './types/types';
import output from './test_strings/testString';
/* eslint-enable */

// ----- TESTING -----
// Arrays used to compose test string
export const ledger: Ledger = {
  atoms: [],
  selectors: [],
  setters: [],
  initialRender: [],
  snapshots: [],
  setTransactions: [],
};

// State for recording toggle
const recordingState: RecoilState<boolean> = recoilAtom<boolean>({
  key: 'recordingState',
  default: true,
});

// ----- SHADOW CONSTRUCTORS for SELECTOR / ATOM -----
// Wwitching to function declaration for TS (easiest workaround for <T> generic tag being recognized as JSX)
// Hardcoding function overloads as correct function types were not being recognized on import
export function selector<T>(options: ReadWriteSelectorOptions<T>): RecoilState<T>;
export function selector<T>(options: ReadOnlySelectorOptions<T>): RecoilValueReadOnly<T>;
export function selector(config: ReadWriteSelectorOptions<any> | ReadOnlySelectorOptions<any>) {
  const { key, get } = config;
  const { snapshots, initialRender, selectors } = ledger;

  let returnedPromise: boolean = false;

  /**
   * If get is undefined, native Async, or transpiled generator-based async from Babel (id'd via RegEx),
   * we don't do any injecting or tracking. It just gets created & returned back out.
   
   * If snapshots.length is greater than 1, the selector is being created following the initial render
   * (i.e. a dynamically generated selector) and will not be tracked - otherwise 
   * will break the imports within test file output. Same logic is being applied to 
   * new atoms as well.
   *
   * Otherwise, we attempt to wrap it with a custom getter that logs the return
   * value on each update to the corresponding snapshot in the snapshots array.
   *
   * If get returns a promise on page load, we delete it from the selectors array
   * and do not track it on subsequent calls (via "returnedPromise" flag).
   * 
   */

  if (
    snapshots.length > 0
    || !get
    || get.constructor.name === 'AsyncFunction'
    || get.toString().match(/^\s*return\s*_.*\.apply\(this, arguments\);$/m)
  ) {
    return recoilSelector(config);
  }

  // Wrap get method with tracking logic
  const getter = (arg: any) => {
    // Run user-defined get method & capture its return value
    const newValue = get(arg);
    // Only capture selector data if currently recording
    if (arg.get(recordingState)) {
      if (snapshots.length === 0) {
        // Promise-validation is expensive, so we only do it once, on initial load
        if (
          typeof newValue === 'object'
          && newValue !== null
          && newValue.constructor.name === 'Promise'
        ) {
          ledger.selectors = selectors.filter((current) => current !== key);
          returnedPromise = true;
        } else {
          initialRender.push({ key, newValue });
        }
      } else if (!returnedPromise) {
        setTimeout(() => snapshots[snapshots.length - 1].updates.push({ key, newValue }), 0);
      }
    }

    // Return out value from original get method
    return newValue;
  };

  // Create a new config object with updated properties
  const newConfig: SelectorConfig<any> = { key, get: getter };

  if ('set' in config) {
    const { set } = config;
    const { setTransactions, setters } = ledger;

    const setter = (utils: any, newValue: any) => {
      if (utils.get(recordingState) && setTransactions.length > 0) {
        // setTimeout is required to allow TransactionObserver to run first
        setTimeout(() => {
          // Length must be computed after timeout to correctly find last transaction
          setTransactions[setTransactions.length - 1].setter = { key, newValue };
        }, 0);
      }
      return set(utils, newValue);
    };

    newConfig.set = setter;
    setters.push(key);
  }

  // Create selector & add to selectors for test setup
  const trackedSelector = recoilSelector(newConfig);
  selectors.push(trackedSelector.key);
  return trackedSelector;
}

// switching to function declaration
export function atom<T>(config: AtomOptions<T>): RecoilState<T> {
  const { snapshots, atoms } = ledger;
  const newAtom = recoilAtom(config);

  if (snapshots.length > 0) return newAtom;

  // Can't use key b/c snapshots needs to pass atoms getLoadable during transaction iteration
  atoms.push(newAtom);
  return newAtom;
}

// ----- TRANSACTION PROVIDER -----
const buttonStyle: CSSProperties = {
  display: 'inline-block',
  margin: '10px',
  padding: '0px',
  height: '10px',
  width: '10px',
};

// Used to ensure appropriate button contrast for varying page backgrounds
const divStyle: CSSProperties = {
  display: 'inline-block',
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: 'grey',
  margin: 0,
  padding: 0,
  zIndex: 999999,
};

export const ChromogenObserver: React.FC = () => {
  // File stores URL for generated test file Blob containing output() string
  // Initializing file as undefined over null to match typing for AnchorHTML attributes from React
  const [file, setFile] = useState<undefined | string>(undefined);
  const [recording, setRecording] = useRecoilState<boolean>(recordingState);

  // Auto-click download link when a new file is generated (via button click)
  // ! to get around strict null check in tsconfig
  useEffect(() => document.getElementById('chromogen-download')!.click(), [file]);

  useRecoilTransactionObserver_UNSTABLE(
    ({ previousSnapshot, snapshot }: { previousSnapshot: Snapshot; snapshot: Snapshot }): void => {
      // Map current snapshot to array of atom states
      // Can't directly check recording hook b/c TransactionObserver runs before state update
      if (snapshot.getLoadable(recordingState).contents) {
        const { snapshots, setTransactions, atoms } = ledger;

        const state = atoms.map((item) => {
          const { key } = item;
          const value = snapshot.getLoadable(item).contents;
          const previous = previousSnapshot.getLoadable(item).contents;
          const updated = value !== previous;
          return { key, value, previous, updated };
        });

        // Add current transaction snapshot to snapshots array
        snapshots.push({ state, updates: [] });
        setTransactions.push({ state, setter: null });
      }
    },
  );

  // Render button to DOM for capturing test output, and creates invisible download link for test file
  return (
    <div style={divStyle}>
      <button
        aria-label="capture test"
        style={{ ...buttonStyle, backgroundColor: 'limegreen' }}
        type="button"
        onClick={() => setFile(URL.createObjectURL(new Blob([output(ledger)])))}
      />
      <button
        aria-label={recording ? 'pause' : 'record'}
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
