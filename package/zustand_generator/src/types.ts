// ----- EXPORTING TYPES TO BE USED IN SRC/.TSX FILES -----

export interface Transaction {
}

// atoms should take RecoilState<any>[] | string[]
export interface Ledger<T, S, P> {
  store: T;
  initialRender: S;
  transactions: P;
}