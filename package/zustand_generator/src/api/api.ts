import zustandCreate from 'zustand';
import { ledger } from '../utils/ledger';

const debug = true;
const initialRender = {};
// const storeFunctions = {};

export function create(creatorFunction) {


  const log = (config) => (set, get, api) => {
    const initialStateEntries = Object.entries(config(api.setState, get, api));
    for (const [k, v] of initialStateEntries) {
      if (typeof v !== 'function') initialRender[k] = v;
    }
    ledger.initialRender = initialRender;
    if (debug) console.log({ initialRender })
    return config(
      (...args) => {
        console.log('  applying', args)
        console.log('function name is ', args[2]);
        set(...args)
        console.log('  new state', get())
      },
      get,
      api
    );
  }

  return zustandCreate(log(creatorFunction));
}


// Get the initial value of all properties inside the store
// Upon any change, compare before and after and add it to some sort of transaction list