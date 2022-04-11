/* eslint-disable */
import { debounce } from '../utils/utils';
import { ledger } from '../utils/ledger';
import { recordingState } from '../utils/store';
/* eslint-enable */

const { transactions, initialRender, selectors, setTransactions } = ledger;

const DEBOUNCE_MS = 250;

// Set timeout for selector get calls
export const debouncedAddToTransactions = debounce(
  (key, value, params) =>
    params !== undefined
      ? transactions[transactions.length - 1].familyUpdates.push({ key, value, params })
      : transactions[transactions.length - 1].updates.push({ key, value }),
  DEBOUNCE_MS,
);

// the logic for recording selectors only when they fire
// whenever get method is fired, chromogen records
export const wrapGetter = (key: string, get: Function) => {
  let returnedPromise: boolean = false;

  return (utils: any) => {
    //will return what normal recoil selector will return aka regular selector method
    const value = get(utils);

    //Checking whether value is async
    // Only capture selector data if currently recording (if record button has been hit)
    if (utils.get(recordingState)) {
      //making sure no transactions have been fired
      if (transactions.length === 0) {
        // Promise-validation is expensive, so we only do it once, on initial load
        if (typeof value === 'object' && value !== null && value.constructor.name === 'Promise') {
          ledger.selectors = selectors.filter((current) => current !== key);
          returnedPromise = true;
        } else {
          initialRender.push({ key, value });
        }
      } else if (!returnedPromise) {
        // Debouncing (throttling) allows TransactionObserver to push to array first
        // Length must be computed within debounce to correctly find last transaction
        // only capture meaningful function calls
        // when called, timer starts; if x amount of time passes and function isnt called again, it fires; if called, resets timer
        debouncedAddToTransactions(key, value);
      }
    }

    return value;
  };
};

export const wrapSetter = (key: string, set: Function) => (utils: any, newValue: any) => {
  if (utils.get(recordingState) && setTransactions.length > 0) {
    // allow TransactionObserver to push to array first
    // Length must be computed after timeout to correctly find last transaction
    // this is here b/c of async stuff with useRecoilTransactionObserver
    setTimeout(() => {
      setTransactions[setTransactions.length - 1].setter = { key, newValue };
    }, 0);
  }
  // returns what regular selector would return (?)
  return set(utils, newValue);
};
