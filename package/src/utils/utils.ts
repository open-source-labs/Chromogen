/* eslint-disable */
import type { SerializableParam } from 'recoil';
import type { AtomFamilies, SelectorFamilies } from '../types';
/* eslint-enable */

// Debouncing for selector transaction updates
export const debounce = (func: (...args: any[]) => any, wait: number) => {
  let timeout: any;

  return (...args: any[]) => {
    const timeoutCallback = () => {
      timeout = null;
      console.log('in debounced callback, args are', args);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(timeoutCallback, wait);
  };
};

// Used in key-to-variable name mapping in generateFile
export function convertFamilyTrackerKeys(
  familyTracker: AtomFamilies,
  storeMap: Map<string, string>,
): AtomFamilies;
export function convertFamilyTrackerKeys<T, P extends SerializableParam>(
  familyTracker: SelectorFamilies<T, P>,
  storeMap: Map<string, string>,
): SelectorFamilies<T, P>;

export function convertFamilyTrackerKeys(
  familyTracker: AtomFamilies | SelectorFamilies<any, SerializableParam>,
  storeMap: Map<string, string>,
) {
  const refactoredTracker: AtomFamilies | SelectorFamilies<any, SerializableParam> = {};

  Object.keys(familyTracker).forEach((key) => {
    const newKey: string = storeMap.get(key) || key;
    refactoredTracker[newKey] = familyTracker[key];
  });

  return refactoredTracker;
}

// Dummy param for use in various checks (most notably the key-to-variable name mapping)
export const dummyParam = 'chromogenDummyParam';
