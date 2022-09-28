import { ledger } from '../utils/ledger';

const debug = true;
let initialRender = {};
// const storeFunctions = {};
const filterFuncStore = (store) => {
  const result = {};
  for (const [k, v] of Object.entries(store)) {
    if (typeof v !== 'function') result[k] = v;
  }
  return result;
};

export function chromogen(creatorFunction) {
  return (set, get, api) => {
    const initialStateEntries = creatorFunction(api.setState, get, api);
    initialRender = filterFuncStore(initialStateEntries);
    ledger.initialRender = initialRender;
    if (debug) console.log({ initialRender });
    return creatorFunction(
      (...args) => {
        const newAction = { action: args[2], before: filterFuncStore(get()) };
        console.log(args[2]);
        set(...args);
        newAction['after'] = get();
        ledger.transactions.push(newAction);
        console.log(ledger);
      },
      get,
      api,
    );
  };
}

// Get the initial value of all properties inside the store
// Upon any change, compare before and after and add it to some sort of transaction list
