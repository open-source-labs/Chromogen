/* eslint-disable */
import type { SerializableParam } from 'recoil';

import { ledger } from '../utils/ledger';
import { dummyParam } from '../utils/utils';
import { recordingState } from '../utils/store';
import { debouncedAddToTransactions } from './core-utils';
/* eslint-enable */

const { transactions, selectorFamilies, initialRenderFamilies, setTransactions } = ledger;

export const wrapFamilyGetter = (key: string, configGet: Function) => {
  let returnedPromise = false;

  return (params: SerializableParam) => (utils: any) => {
    const { get } = utils;
    const value = configGet(params)(utils);
    // Only capture selector data if currently recording

    if (get(recordingState)) {
      if (transactions.length === 0) {
        // Promise-validation is expensive, so we only do it once, on initial load
        if (
          typeof value === 'object'
          && value !== null
          && Object.prototype.toString.call(value) === '[object Promise]'
        ) {
          delete selectorFamilies[key];
          returnedPromise = true;
        } else {
          initialRenderFamilies.push({ key, params, value });
        }
      } else if (!returnedPromise) {
        // Track every new params
        if (!selectorFamilies[key].prevParams.has(params)) {
          selectorFamilies[key].prevParams.add(params);
        }
        // Debouncing allows TransactionObserver to push to array first
        // Length must be computed within debounce to correctly find last transaction
        // Excluding dummy selector created by ChromogenObserver's onload useEffect hook
        if (params !== dummyParam) debouncedAddToTransactions(key, value, params);
      }
    }

    // Return value from original get method
    return value;
  };
};

export const wrapFamilySetter = (key: string, set: Function) => (params: SerializableParam) => (
  utils: any,
  newValue: any,
) => {
  if (utils.get(recordingState) && setTransactions.length > 0) {
    // allow TransactionObserver to push to array first
    // Length must be computed after timeout to correctly find last transaction
    setTimeout(() => {
      setTransactions[setTransactions.length - 1].setter = { key, params, newValue };
    }, 0);
  }
  return set(params)(utils, newValue);
};
