// Defining type for our hooks-ledger
export interface Ledger {
  state: any;
  id: string | number;
  initialState: any;
  currState: any;
  dispCount: number;
  previousState: Array<Array<any>>;
}

