import { selector as recoilSelector, atom as recoilAtom } from 'recoil';

// Array of selectors / atoms available for import
export const selectors = [];
export const atoms = [];

// selector wrapper to be imported by app / store
export const selector = (config) => {
  // Track selector "get" calls
  // Object is used (vs. num primitive) to persist reference across functions and files
  const calls = { count: 0 };

  // Extract properties from config object passed to in-app selector call
  const { key, get, set } = config;

  // Inject code to "get" method of selector
  const getter = (...args) => {
    // Update calls object each time function fires
    calls.count += 1;
    return get(...args);
  };

  // Inject code to "set" method of selector (if defined)
  const setter = set ? (...args) => set(...args) : null;

  // Create Recoil selector with injected properties
  const newSelector = recoilSelector({ key, get: getter, set: setter });

  // Add tracking data for created selector to selectors array
  selectors.push({ calls, key, newSelector });

  // Return the normal selector out to the app
  return newSelector;
};

// atom wrapper to be imported by app / store
export const atom = (config) => {
  const newAtom = recoilAtom(config);
  atoms.push(newAtom);
  return newAtom;
};
