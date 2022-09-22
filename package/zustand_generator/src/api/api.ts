import {
  create as zustandCreate,
} from 'zustand';
// import zustand shallow next
export function create(creatorFunction) {

  console.log("we are inside chromogen create");
  const newStore = zustandCreate(creatorFunction);

  return newStore;
}


// function creatorFunction(state=undefined){
//   return {}
// }