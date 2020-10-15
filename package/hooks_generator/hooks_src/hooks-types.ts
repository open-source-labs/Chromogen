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

// export type BasicStateAction<S> = (S => S) | S;
// export type Dispatch<A> = A => void;

export interface Ledger {
  initialState: any[], //0
  prevState: any[], //0
  currState: any[], // 1
  setStateCallback: any[], 
  count: number, //1
}
// type Dispatch<A> = (value: A) => void;


// type SetStateAction<S> = S | ((prevState: S) => S);

// type useState = <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
