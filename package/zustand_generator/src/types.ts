// ----- EXPORTING TYPES TO BE USED IN SRC/.TSX FILES -----

type NotAFunction = { [k: string]: unknown } & ({ bind?: never } | { call?: never });

export type InitialRender = {
  [stateParam: string]: NotAFunction;
}

export interface Transaction<T extends any[]> {
  action: string,
  arguments?: T,
  changedValues: {
    [nameOfChangedValue: string]: NotAFunction;
  }
}


export interface Ledger {
  initialRender: InitialRender,
  transactions: Transaction<any>[]
}