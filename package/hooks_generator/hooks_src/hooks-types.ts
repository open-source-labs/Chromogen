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

export type Dispatcher = {|,
  useState<S>(initialState: (() => S) | S): [S, Dispatch<BasicStateAction<S>>],
|}