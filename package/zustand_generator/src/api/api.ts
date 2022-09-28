import zustandCreate from 'zustand';
import { ledger } from '../utils/ledger';

const debug = true;
const initialRender = {};
// const storeFunctions = {};

export function create(creatorFunction) {
  const initialStateEntries = Object.entries(creatorFunction());
  for (const [k, v] of initialStateEntries) {
    // if (typeof v === 'function') storeFunctions[k] = [v];
    initialRender[k] = v;
  }

  ledger.initialRender = initialRender;

  // const modifiedFunctions = Object.entries(storeFunctions).map(([k, v]: [any, any]) => {
  //   const wrappedFunction = (...args) => {
  //     console.log('my function name is ', k);
  //     return v(...args);
  //   }
  //   return [k, wrappedFunction];
  // });


  if (debug) console.log({ initialRender })

  const log = (config) => (set, get, api) =>
    config(
      (...args) => {
        console.log('  applying', args)
        console.log('function name is ', args[2]);
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