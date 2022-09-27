import zustandCreate from 'zustand';
import { ledger } from '../utils/ledger';

const debug = true;
const initialState = {};

export function create(creatorFunction) {

  const initialStateEntries = Object.entries(creatorFunction()).filter(([, v]) => typeof v !== 'function');
  for (const [k, v] of initialStateEntries) {
    initialState[k] = v;
  }

  ledger.initialRender = initialState;

  if (debug) console.log({ initialState })

  const log = (config) => (set, get, api) =>
    config(
      (...args) => {
        console.log('  applying', args)
        set(...args)
        console.log('  new state', get())
      },
      get,
      api
    );

  return zustandCreate(log(creatorFunction));
}


// Get the initial value of all properties inside the store
// Upon any change, compare before and after and add it to some sort of transaction list