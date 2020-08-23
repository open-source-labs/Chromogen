/* eslint-disable */
import { RecoilState, RecoilValueReadOnly, RecoilValue, DefaultValue } from 'recoil';
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

export type Atoms<T> = Array<RecoilState<T>>;

export type Selectors<T> = Array<RecoilValueReadOnly<T> | RecoilState<T>>;

export type InitialRender = Array<SelectorUpdate>;

export type StateSnapshot = Array<{
  key: string;
  value: any;
  previous: any;
  updated: boolean;
}>;

export type Snapshots = Array<{
  state: StateSnapshot;
  updates: Array<SelectorUpdate>;
}>;

export type SetTransactions = Array<{
  state: StateSnapshot;
  setter: null | SelectorUpdate;
}>;

export type Ledger = {
  atoms: Atoms<any>;
  selectors: Array<string>;
  setters: Array<string>;
  initialRender: InitialRender;
  snapshots: Snapshots;
  setTransactions: SetTransactions;
};

export interface SelectorConfig<T> {
  key: string;
  get: (opts: { get: GetRecoilValue }) => T | Promise<T> | RecoilValue<T>;
  set?: (
    opts: { get: GetRecoilValue; set: SetRecoilState; reset: ResetRecoilState },
    newValue: T | DefaultValue,
  ) => void;
  dangerouslyAllowMutability?: boolean;
}
