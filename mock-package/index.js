import {
  selector as recoilSelector,
  atom as recoilAtom,
  // eslint-disable-next-line camelcase
  useRecoilTransactionObserver_UNSTABLE,
} from 'recoil';

// Snapshot arrays: updated by ChromogenObserver each transaction & accessed by injected getters
let previousState = null;
// let currentState = null;

// ----- TESTING EXPORTS -----
// Arrays of read/write or read-only atoms & selectors
export const writeables = [];
export const readables = [];

// ----- SHADOW SELECTOR / ATOM CONSTRUCTORS -----
// selector wrapper to be imported by app / store
export const selector = (config) => {
  // Extract properties from config object passed to in-app selector call
  const { key, get, set } = config;

  // Inject code to "get" method of selector
  const getter = get
    ? (...args) => {
        const message = `GET SELECTOR: ${key}\n\nPrevious state: ${JSON.stringify(previousState)}`;
        console.log(message);
        return get(...args);
      }
    : null;

  // Inject code to "set" method of selector (if defined)
  const setter = set
    ? (...args) => {
        const message = `SET SELECTOR: ${key}\n\nPrevious state: ${JSON.stringify(previousState)}`;
        console.log(message);
        return set(...args);
      }
    : null;

  // Create Recoil selector with injected properties
  const newSelector = recoilSelector({ key, get: getter, set: setter });

  // Add selector object to appropriate exportable array
  if (setter !== null) {
    writeables.push(newSelector);
  } else {
    readables.push(newSelector);
  }

  // Return the normal selector out to the app
  return newSelector;
};

// atom wrapper to be imported by app / store
export const atom = (config) => {
  const newAtom = recoilAtom(config);
  writeables.push(newAtom);
  return newAtom;
};

// ----- TRANSACTION PROVIDER -----
// Map function for creating transaction state arrays
const loadState = (snapshotVersion) => (item) => {
  const { key } = item;
  const value = snapshotVersion.getLoadable(item).contents;
  return { key, value };
};

// Provider component used to access state snapshots
export const ChromogenObserver = () => {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot, previousSnapshot }) => {
    console.log('\nTRANSACTION OCCURRED\n');
    const loadPrevious = loadState(previousSnapshot);
    // const loadCurrent = loadState(snapshot);
    previousState = writeables.map(loadPrevious).concat(readables.map(loadPrevious));
    // currentState = writeables.map(loadCurrent).concat(readables.map(loadCurrent));
  });

  // Nothing renders to DOM
  return null;
};
