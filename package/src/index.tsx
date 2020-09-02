/* eslint-disable */
import type {
  RecoilState,
  RecoilValueReadOnly,
  AtomOptions,
  Snapshot,
  ReadWriteSelectorOptions,
  ReadOnlySelectorOptions,
  SerializableParam,
  AtomFamilyOptions,
  ReadWriteSelectorFamilyOptions,
  ReadOnlySelectorFamilyOptions,
} from 'recoil';
import type { CSSProperties } from 'react';
import type { Ledger, SelectorConfig, SelectorFamilyConfig, AtomFamilyState } from './types/types';

import {
  selector as recoilSelector,
  atom as recoilAtom,
  atomFamily as recoilAtomFamily,
  selectorFamily as recoilSelectorFamily,
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilState,
} from 'recoil';
import React, { useState, useEffect } from 'react';

import { output } from './test_string/testString';

import { debounce, convertFamilyTrackerKeys, dummyParam } from './utils/utils';
/* eslint-enable */

// ----- SETUP -----
// Used to compose test string
export const ledger: Ledger<RecoilState<any>, any, SerializableParam> = {
  atoms: [],
  selectors: [],
  atomFamilies: {},
  selectorFamilies: {},
  setters: [],
  initialRender: [],
  initialRenderFamilies: [],
  transactions: [],
  setTransactions: [],
};

// State for recording toggle
const recordingState: RecoilState<boolean> = recoilAtom<boolean>({
  key: 'recordingState',
  default: true,
});

//For selector get call debouncing
const DEBOUNCE_MS = 200;

const debouncedAddToTransactions = debounce(
  (key, value, currentTransactionIdx, params) =>
    params !== undefined
      ? ledger.transactions[currentTransactionIdx].familyUpdates.push({ key, value, params })
      : ledger.transactions[currentTransactionIdx].updates.push({ key, value }),
  DEBOUNCE_MS,
);

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
    transactions.length > 0 ||
    !get ||
    get.constructor.name === 'AsyncFunction' ||
    get.toString().match(/^\s*return\s*_.*\.apply\(this, arguments\);$/m)
  ) {
    return recoilSelector(config);
  }

  // Wrap get method with tracking logic
  const getter = (utils: any) => {
    // Run user-defined get method & capture its return value
    const value = get(utils);

    // Only capture selector data if currently recording
    if (utils.get(recordingState)) {
      if (transactions.length === 0) {
        // Promise-validation is expensive, so we only do it once, on initial load
        if (typeof value === 'object' && value !== null && value.constructor.name === 'Promise') {
          ledger.selectors = selectors.filter((current) => current !== key);
          returnedPromise = true;
        } else {
          initialRender.push({ key, value });
        }
      } else if (!returnedPromise) {
        // Debouncing allows TransactionObserver to push to array first
        // Length must be computed before debounce to correctly find last transaction
        const currentTransactionIdx = transactions.length - 1;
        debouncedAddToTransactions(key, value, currentTransactionIdx);
      }
    }
    // Return out value from original get method
    return value;
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

// ----- SHADOW CONSTRUCTORS for SELECTOR / ATOM FAMILIES -----
export function atomFamily<T, P extends SerializableParam>(
  config: AtomFamilyOptions<T, P>,
): (params: P) => RecoilState<T> {
  const { atomFamilies } = ledger;
  const { key } = config;
  //Initialize new family in atomFamilies tracker
  atomFamilies[key] = {};

  return (params: P): RecoilState<T> => {
    const strParams = JSON.stringify(params);
    //If the atom has already been created, return from cache, otherwise we'll be creating a new
    //instance of an atom every time we invoke this func (which can lead to infinite re-render loop)
    const cachedAtom = atomFamilies[key][strParams];
    if (cachedAtom !== undefined) return cachedAtom;

    const newAtomFamilyMember = recoilAtomFamily(config)(params);
    //Storing every atom created except for dummy atom created by ChromogenObserver's onload useEffect hook
    if (strParams !== dummyParam) atomFamilies[key][strParams] = newAtomFamilyMember;
    return newAtomFamilyMember;
  };
}

export function selectorFamily<T, P extends SerializableParam>(
  options: ReadWriteSelectorFamilyOptions<T, P>,
): (param: P) => RecoilState<T>;

export function selectorFamily<T, P extends SerializableParam>(
  options: ReadOnlySelectorFamilyOptions<T, P>,
): (param: P) => RecoilValueReadOnly<T>;

export function selectorFamily<T>(
  config:
    | ReadWriteSelectorFamilyOptions<T, SerializableParam>
    | ReadOnlySelectorFamilyOptions<T, SerializableParam>,
) {
  const { key } = config;
  const configGet = config.get;
  const { transactions, selectorFamilies, initialRenderFamilies } = ledger;
  let returnedPromise = false;

  //Testing whether returned function from configGet is async
  if (
    !configGet ||
    configGet(dummyParam).constructor.name === 'AsyncFunction' ||
    configGet(dummyParam)
      .toString()
      .match(/^\s*return\s*_.*\.apply\(this, arguments\);$/m) ||
    transactions.length > 0
  ) {
    return recoilSelectorFamily(config);
  }

  const getter = (params: SerializableParam) => (utils: any) => {
    // Run user-defined get method & capture its return value
    const { get } = utils;
    const value = configGet(params)(utils);

    // Only capture selector data if currently recording
    if (get(recordingState)) {
      if (transactions.length === 0) {
        // Promise-validation is expensive, so we only do it once, on initial load
        if (
          typeof value === 'object' &&
          value !== null &&
          Object.prototype.toString.call(value) === '[object Promise]'
        ) {
          delete selectorFamilies[key];
          returnedPromise = true;
        } else {
          initialRenderFamilies.push({ key, params, value });
        }
      } else if (!returnedPromise) {
        //Track every new params
        if (!selectorFamilies[key].prevParams.has(params)) {
          selectorFamilies[key].prevParams.add(params);
        }
        // Debouncing allows TransactionObserver to push to array first
        // Length must be computed before debounce to correctly find last transaction
        // Excluding dummy selector created by ChromogenObserver's onload useEffect hook
        const currentTransactionIdx = transactions.length - 1;
        if (params !== dummyParam)
          debouncedAddToTransactions(key, value, currentTransactionIdx, params);
      }
    }
    // Return value from original get method
    return value;
  };

  // Create a new config object with updated properties
  const newConfig: SelectorFamilyConfig<any, SerializableParam> = { key, get: getter };

  let isSettable = false;

  if ('set' in config) {
    isSettable = true;
    const { set } = config;
    const { setTransactions } = ledger;

    const setter = (params: SerializableParam) => (utils: any, newValue: any) => {
      if (utils.get(recordingState) && setTransactions.length > 0) {
        // allow TransactionObserver to push to array first
        // Length must be computed after timeout to correctly find last transaction
        setTimeout(() => {
          setTransactions[setTransactions.length - 1].setter = { key, params, newValue };
        }, 0);
      }
      return set(params)(utils, newValue);
    };
    newConfig.set = setter;
  }
  // Create selector generator & add to selectorFamily for test setup
  const trackedSelectorFamily = recoilSelectorFamily(newConfig);
  selectorFamilies[key] = { trackedSelectorFamily, prevParams: new Set(), isSettable };
  return trackedSelectorFamily;
}

// ----- TRANSACTION PROVIDER -----
const buttonStyle: CSSProperties = {
  display: 'inline-block',
  margin: '8px',
  padding: '0px',
  height: '16px',
  width: '16px',
};

// Used to ensure appropriate button contrast for varying page backgrounds
const divStyle: CSSProperties = {
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

export const ChromogenObserver: React.FC<{ store?: Array<object> | object }> = ({ store }) => {
  // File stores URL for generated test file Blob containing output() string
  // Initializing file as undefined over null to match typing for AnchorHTML attributes from React
  const [file, setFile] = useState<undefined | string>(undefined);
  const [storeMap, setStoreMap] = useState<Map<string, string>>(new Map());
  const [recording, setRecording] = useRecoilState<boolean>(recordingState);
  const [devtool, setDevtool] = useState<boolean>(false);

  // Update Recoil atom that maps keys to variable names if store was provided as prop on page load
  useEffect(() => {
    if (store !== undefined) {
      // If single store was passed, convert to array
      const storeArr = Array.isArray(store) ? store : [store];

      const newStore: Map<string, string> = new Map();
      storeArr.forEach((storeModule) => {
        Object.entries(storeModule).forEach(([variable, imported]) => {
          let key;
          /**Relevant imports will be either an object (for vanilla atoms or selectors)
           * or functions (for atom or selector families). If we are examining a family function,
           * we will need to invoke it to create an atom/selector in order to pull the
           * original family key out from the generated atom or selector's individual key
           **/
          if (typeof imported === 'function') {
            //Extended atom fam key will follow format of `[key]__"chromogenDummyParam"__withFallback`
            //Extended selector fam key will follow format of `[key]__selectorFamily/"chromogenDummyParam"/1`
            const extendedKey = imported(dummyParam).key;
            key = extendedKey.split('__')[0];
          } else {
            key = imported.key;
          }
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
    const {
      atoms,
      selectors,
      setters,
      atomFamilies,
      selectorFamilies,
      initialRender,
      initialRenderFamilies,
      transactions,
      setTransactions,
    } = ledger;

    const finalLedger: Ledger<string, any, SerializableParam> =
      storeMap.size > 0
        ? {
            atoms: atoms.map(({ key }) => storeMap.get(key) || key),
            selectors: selectors.map((key) => storeMap.get(key) || key),
            atomFamilies: convertFamilyTrackerKeys(atomFamilies, storeMap),
            selectorFamilies: convertFamilyTrackerKeys(selectorFamilies, storeMap),
            setters: setters.map((key) => storeMap.get(key) || key),
            initialRender: initialRender.map(({ key, value }) => {
              const newKey = storeMap.get(key) || key;
              return { key: newKey, value };
            }),
            initialRenderFamilies: initialRenderFamilies.map(({ key, value, params }) => {
              const newKey = storeMap.get(key) || key;
              return { key: newKey, value, params };
            }),
            transactions: transactions.map(({ state, updates, atomFamilyState, familyUpdates }) => {
              const newState = state.map((eachAtom) => {
                const key = storeMap.get(eachAtom.key) || eachAtom.key;
                return { ...eachAtom, key };
              });
              const newUpdates = updates.map((eachSelector) => {
                const key = storeMap.get(eachSelector.key) || eachSelector.key;
                const { value } = eachSelector;
                return { key, value };
              });
              const newAtomFamilyState = atomFamilyState.map((eachFamAtom) => {
                const family = storeMap.get(eachFamAtom.family) || eachFamAtom.family;
                const oldKeyArr = eachFamAtom.key.split('__');
                oldKeyArr[0] = family;
                const key = oldKeyArr.join('__');
                return { ...eachFamAtom, family, key };
              });
              const newFamilyUpdates = familyUpdates.map((eachFamSelector) => {
                const oldKeyArr = eachFamSelector.key.split('__');
                oldKeyArr[0] = storeMap.get(oldKeyArr[0]) || oldKeyArr[0];
                const key = oldKeyArr.join('__');
                return { ...eachFamSelector, key };
              });
              return {
                state: newState,
                updates: newUpdates,
                atomFamilyState: newAtomFamilyState,
                familyUpdates: newFamilyUpdates,
              };
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

  // Handle incoming messages from content.ts
  const receiveMessage = (message: any) => {
    switch (message.data.action) {
      case 'connectChromogen':
        setDevtool(true);
        window.postMessage({ action: 'moduleConnected' }, '*');
        break;
      case 'downloadFile':
        generateFile();
        break;
      case 'toggleRecord':
        setRecording(!recording);
        window.postMessage({ action: 'setStatus' }, '*');
        break;
      default:
      // Do nothing
    }
  };

  // Add/remove event listeners for communication with content.ts
  useEffect(() => {
    window.addEventListener('message', receiveMessage);

    // Remove event listener on dismount
    return () => window.removeEventListener('message', receiveMessage);
  });

  useRecoilTransactionObserver_UNSTABLE(
    ({ previousSnapshot, snapshot }: { previousSnapshot: Snapshot; snapshot: Snapshot }): void => {
      // Map current snapshot to array of atom states
      // Can't directly check recording hook b/c TransactionObserver runs before state update
      if (snapshot.getLoadable(recordingState).contents) {
        const { transactions, setTransactions, atoms, atomFamilies } = ledger;

        const state = atoms.map((item) => {
          const { key } = item;
          const value = snapshot.getLoadable(item).contents;
          const previous = previousSnapshot.getLoadable(item).contents;
          const updated = value !== previous;
          return { key, value, previous, updated };
        });

        const atomFamilyState: AtomFamilyState[] = [];

        for (const family in atomFamilies) {
          const familyMembers = atomFamilies[family];
          for (const member in familyMembers) {
            const memberRecoilState = familyMembers[member];
            let { key } = memberRecoilState;
            /* Key will be auto-generated by recoil in the format of
             * [atomFamilyName] + "__" + [params] + "__withFallback".
             * Removing the "__withFallback" suffix to enhance readability\
             */
            key = key.substring(0, key.length - 14);
            const value = snapshot.getLoadable(memberRecoilState).contents;
            const previous = previousSnapshot.getLoadable(memberRecoilState).contents;
            const updated = value !== previous;
            if (!key.includes(dummyParam)) atomFamilyState.push({ family, key, value, updated });
          }
        }

        // Add current transaction snapshot to transactions array
        transactions.push({ state, updates: [], atomFamilyState, familyUpdates: [] });
        setTransactions.push({ state, setter: null });
      }
    },
  );

  // Render button to DOM for capturing test output, and creates invisible download link for test file
  return (
    <>
      {
        // Render button div only if DevTool not connected
        !devtool && (
          <div style={divStyle}>
            <button
              aria-label="capture test"
              style={{ ...buttonStyle, backgroundColor: '#12967a' }}
              type="button"
              onClick={generateFile}
            />
            <button
              aria-label={recording ? 'pause' : 'record'}
              style={{ ...buttonStyle, backgroundColor: recording ? '#d44b5a' : '#fce3a3' }}
              type="button"
              onClick={() => {
                setRecording(!recording);
              }}
            />
          </div>
        )
      }
      <a
        download="chromogen.test.js"
        href={file}
        id="chromogen-download"
        style={{ display: 'none' }}
      >
        Download Test
      </a>
    </>
  );
};
