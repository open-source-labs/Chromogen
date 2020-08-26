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
import { output } from './test_string/testString';
/* eslint-enable */

// ----- SETUP -----
// Arrays used to compose test string
export const ledger: Ledger<RecoilState<any>> = {
  atoms: [],
  selectors: [],
  setters: [],
  initialRender: [],
  transactions: [],
  setTransactions: [],
};

// State for recording toggle
const recordingState: RecoilState<boolean> = recoilAtom<boolean>({
  key: 'recordingState',
  default: true,
});

// ['key', 'variable name']
const mapStateNames: RecoilState<Map<string, string>> = recoilAtom<Map<string, string>>({
  key: 'mapStateNames',
  default: new Map(),
});

// ----- SHADOW CONSTRUCTORS for SELECTOR / ATOM -----
// Using function declaration for TS (easiest workaround for <T> generic tag being recognized as JSX)
// Hardcoding function overloads as correct function types were not being recognized on import
export function selector<T>(options: ReadWriteSelectorOptions<T>): RecoilState<T>;
export function selector<T>(options: ReadOnlySelectorOptions<T>): RecoilValueReadOnly<T>;
export function selector(config: ReadWriteSelectorOptions<any> | ReadOnlySelectorOptions<any>) {
  const { key, get } = config;
  const { transactions, initialRender, selectors } = ledger;

  let returnedPromise: boolean = false;

  /**
   * If transactions.length is greater than 1, the selector is being created after the initial render
   * (i.e. a dynamically generated selector) and will not be tracked. Doing so would break the imports
   * and assertions within the output test file. Same logic is applied to new atoms.
   *
   * If get is undefined, native Async, or Babel-transpiled generator-based async (id'd via RegEx),
   * we don't do any injecting or tracking. Selector just gets created & returned back out.
   *
   * Otherwise, we attempt to wrap get & set methods with custom functions that log the return
   * value on each transaction to the corresponding ledger array.
   *
   * If get returns a promise on page load, we delete selector from the selectors array
   * and do not track it on subsequent calls (using "returnedPromise" flag, since we can't "un-inject").
   */

  if (
    transactions.length > 0
    || !get
    || get.constructor.name === 'AsyncFunction'
    || get.toString().match(/^\s*return\s*_.*\.apply\(this, arguments\);$/m)
  ) {
    return recoilSelector(config);
  }

  // Wrap get method with tracking logic
  const getter = (utils: any) => {
    // Run user-defined get method & capture its return value
    const newValue = get(utils);
    // Only capture selector data if currently recording
    if (utils.get(recordingState)) {
      if (transactions.length === 0) {
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
        // allow TransactionObserver to push to array first
        // Length must be computed after timeout to correctly find last transaction
        setTimeout(() => transactions[transactions.length - 1].updates.push({ key, newValue }), 0);
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
        // allow TransactionObserver to push to array first
        // Length must be computed after timeout to correctly find last transaction
        setTimeout(() => {
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

export function atom<T>(config: AtomOptions<T>): RecoilState<T> {
  const { transactions, atoms } = ledger;
  const newAtom = recoilAtom(config);

  if (transactions.length > 0) return newAtom;

  // Can't use key b/c transactions needs to pass atoms to getLoadable during transaction iteration
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

export const ChromogenObserver: React.FC<{ store?: Array<object> | object }> = ({ store }) => {
  // File stores URL for generated test file Blob containing output() string
  // Initializing file as undefined over null to match typing for AnchorHTML attributes from React
  const [file, setFile] = useState<undefined | string>(undefined);
  const [recording, setRecording] = useRecoilState<boolean>(recordingState);
  const [storeMap, setStoreMap] = useRecoilState<Map<string, string>>(mapStateNames);

  // Update Recoil atom that maps keys to variable names if store was provided as prop on page load
  useEffect(() => {
    if (store !== undefined) {
      // If single store was passed, convert to array
      const storeArr = Array.isArray(store) ? store : [store];
      const newStore: Map<string, string> = new Map();
      storeArr.forEach((storeModule) => {
        Object.entries(storeModule).forEach(([variable, { key }]) => {
          newStore.set(key, variable);
        });
      });
      setStoreMap(newStore);
    }
  }, []);

  /**
   * onclick function that generates test file & sets download URL
   *
   * Key-to-Variable name mapping is applied if storeMap has any contents
   * (meaning atom / selector nodes were passed as props)
   * Applying only at point-of-download keeps performance cost low for users who
   * don't need to pass nodes while creating a moderate performance hit for others
   * only while downloading, never while interacting with their app.
   */
  const generateFile = (): void => {
    const { atoms, selectors, setters, initialRender, transactions, setTransactions } = ledger;
    const finalLedger: Ledger<string> =
      storeMap.size > 0
        ? {
            atoms: atoms.map(({ key }) => storeMap.get(key) || key),
            selectors: selectors.map((key) => storeMap.get(key) || key),
            setters: setters.map((key) => storeMap.get(key) || key),
            initialRender: initialRender.map(({ key, newValue }) => {
              const newKey = storeMap.get(key) || key;
              return { key: newKey, newValue };
            }),
            transactions: transactions.map(({ state, updates }) => {
              const newState = state.map((eachAtom) => {
                const key = storeMap.get(eachAtom.key) || eachAtom.key;
                return { ...eachAtom, key };
              });
              const newUpdates = updates.map((eachSelector) => {
                const key = storeMap.get(eachSelector.key) || eachSelector.key;
                const { newValue } = eachSelector;
                return { key, newValue };
              });
              return { state: newState, updates: newUpdates };
            }),
            setTransactions: setTransactions.map(({ state, setter }) => {
              const newState = state.map((eachAtom) => {
                const key = storeMap.get(eachAtom.key) || eachAtom.key;
                return { ...eachAtom, key };
              });
              const newSetter = setter;
              if (newSetter) {
                const { key } = newSetter;
                newSetter.key = storeMap.get(key) || key;
              }
              return { state: newState, setter: newSetter };
            }),
          }
        : { ...ledger, atoms: atoms.map(({ key }) => key) };

    return setFile(URL.createObjectURL(new Blob([output(finalLedger)])));
  };

  // Auto-click download link when a new file is generated (via button click)
  // ! to get around strict null check in tsconfig
  useEffect(() => document.getElementById('chromogen-download')!.click(), [file]);

  useRecoilTransactionObserver_UNSTABLE(
    ({ previousSnapshot, snapshot }: { previousSnapshot: Snapshot; snapshot: Snapshot }): void => {
      // Map current snapshot to array of atom states
      // Can't directly check recording hook b/c TransactionObserver runs before state update
      if (snapshot.getLoadable(recordingState).contents) {
        const { transactions, setTransactions, atoms } = ledger;

        const state = atoms.map((item) => {
          const { key } = item;
          const value = snapshot.getLoadable(item).contents;
          const previous = previousSnapshot.getLoadable(item).contents;
          const updated = value !== previous;
          return { key, value, previous, updated };
        });

        // Add current transaction snapshot to transactions array
        transactions.push({ state, updates: [] });
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
        onClick={generateFile}
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
