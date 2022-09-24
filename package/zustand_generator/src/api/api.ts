import zustandCreate from 'zustand';

// import zustand shallow next
export function create(creatorFunction) {

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

  const newStore = zustandCreate(log(creatorFunction));
  const initialState = newStore();
  console.log({ initialState });
  return newStore;
}


// Get the initial value of all properties inside the store
// Upon any change, compare before and after and add it to some sort of transaction list