// ----- EXPORTING TYPES TO BE USED IN SRC/.TSX FILES -----

export interface Transaction {
  action: string,
  arguments?: any[],
  changedValues: {
    [nameOfChangedValue: string]: any;
  }
}
// atoms should take RecoilState<any>[] | string[]
export interface Ledger<T, S> {
  store: T;
  initialRender: S;
  transactions: Transaction[];
}