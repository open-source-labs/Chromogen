import type { SerializableParam } from 'recoil';
import type { AtomFamilies, SelectorFamilies } from '../types/types';

//Debouncing for selector transaction updates
export const debounce = (func: (...args: any[]) => any, wait: number) => {
  let timeout: any;

  return function (...args: any[]) {
    const timeoutCallback = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(timeoutCallback, wait);
  };
};

//Used in key-to-variable name mapping in generateFile
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

  for (const familyName in familyTracker) {
    const newKey: string = storeMap.get(familyName) || familyName;
    refactoredTracker[newKey] = familyTracker[familyName];
  }
  return refactoredTracker;
}

export const dummyParam = 'chromogenDummyParam';
