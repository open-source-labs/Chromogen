/*
export all types and interfaces
*/



// Declare non-importable Dispatch function
// type Dispatch<A> = A => void;

// Ledger
// export interface Ledger<T, S, P> {
//     state: ,
//     transactions:
// }

export type BasicStateAction<S> = (S => S) | S;
export type Dispatch<A> = A => void;
export interface Transaction {
  initialState: [],//1
  prevState: [], //2
  currState: [],//1  2  3
  setStateCallback: [], 
  count: number =  0,//2
}

