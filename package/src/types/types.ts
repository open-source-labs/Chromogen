/* eslint-disable */
import { RecoilState, RecoilValue, DefaultValue } from 'recoil';
/* eslint-enable */

// ----- INITIALIZING NON-IMPORTABLE RECOIL TYPES -----
type ResetRecoilState = (recoilVal: RecoilState<any>) => void;

type GetRecoilValue = <T>(recoilVal: RecoilValue<T>) => T;

type SetRecoilState = <T>(
  recoilVal: RecoilState<T>,
  newVal: T | DefaultValue | ((prevValue: T) => T | DefaultValue),
) => void;

// ----- EXPORTING TYPES TO BE USED IN SRC/.TSX FILES -----
export type SelectorUpdate = { key: string; newValue: any };

export type AtomUpdate = {
  key: string;
  value: any;
  previous: any;
  updated: boolean;
};

export interface Transaction {
  state: AtomUpdate[];
  updates: SelectorUpdate[];
}

export interface SetTransaction {
  state: AtomUpdate[];
  setter: null | SelectorUpdate;
}

// RecoilState<any>[] | string[]
export interface Ledger<T> {
  atoms: T[];
  selectors: string[];
  setters: string[];
  initialRender: SelectorUpdate[];
  transactions: Transaction[];
  setTransactions: SetTransaction[];
}

export interface SelectorConfig<T> {
  key: string;
  get: (opts: { get: GetRecoilValue }) => T | Promise<T> | RecoilValue<T>;
  set?: (
    opts: { get: GetRecoilValue; set: SetRecoilState; reset: ResetRecoilState },
    newValue: T | DefaultValue,
  ) => void;
  dangerouslyAllowMutability?: boolean;
}
