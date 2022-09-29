import { ledger } from '../utils/ledger';

const debug = true;
let initialRender = {};

const filterOutFuncs = (store) => {
  const result = {};
  for (const [k, v] of Object.entries(store)) {
    if (typeof v !== 'function') result[k] = v;
  }
  return result;
};

const diffStateObjects = (oldStore, newStore) => {
  const changedValues = {};
  for (const [k, v] of Object.entries(newStore)) {
    if (JSON.stringify(oldStore[k]) !== JSON.stringify(v)) changedValues[k] = v;
  }
  return changedValues;
}

export function chromogen(creatorFunction) {
  return (set, get, api) => {

    //get initial render and save it to ledger
    const initialStateEntries = creatorFunction(api.setState, get, api);
    initialRender = filterOutFuncs(initialStateEntries);
    ledger.initialRender = initialRender;

    //log if debug mode is enabled
    if (debug) console.log({ initialRender });

    //return wrapped creatorFunction
    return creatorFunction(
      (...args) => {
        const action = args[2];
        const oldStore = filterOutFuncs(get());
        const funcArguments = args.slice(3);

        set(...args);
        const newStore = filterOutFuncs(get());
        const changedValues = diffStateObjects(oldStore, newStore)

        const newAction = {
          action,
          changedValues,
          arguments: funcArguments
        }

        ledger.transactions.push(newAction);
      },
      get,
      api,
    );
  };
}

