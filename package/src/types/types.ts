/* eslint-disable */
import type {
  RecoilState,
  RecoilValue,
  DefaultValue,
  SerializableParam,
  RecoilValueReadOnly,
} from 'recoil';
/* eslint-enable */

// ----- INITIALIZING NON-IMPORTABLE RECOIL TYPES -----
type ResetRecoilState = (recoilVal: RecoilState<any>) => void;

type GetRecoilValue = <T>(recoilVal: RecoilValue<T>) => T;

type SetRecoilState = <T>(
  recoilVal: RecoilState<T>,
  newVal: T | DefaultValue | ((prevValue: T) => T | DefaultValue),
) => void;

// ----- EXPORTING TYPES TO BE USED IN SRC/.TSX FILES -----
export interface SetterUpdate {
  key: string;
  newValue: any;
  params?: SerializableParam;
}

export interface SelectorUpdate {
  key: string;
  value: any;
}

export interface SelectorFamilyUpdate extends SelectorUpdate {
  params: SerializableParam;
}

export interface AtomUpdate extends SelectorUpdate {
  previous: any;
  updated: boolean;
}

export interface AtomFamilyState {
  family: string;
  key: string;
  value: any;
  updated: boolean;
}

export interface Transaction {
  state: AtomUpdate[];
  updates: SelectorUpdate[];
  atomFamilyState: AtomFamilyState[];
  familyUpdates: SelectorFamilyUpdate[];
}

export interface SetTransaction {
  state: AtomUpdate[];
  setter: null | SetterUpdate;
}

export interface AtomFamilyMembers {
  [atomName: string]: RecoilState<any>;
}
export interface AtomFamilies {
  [familyName: string]: AtomFamilyMembers;
}

export interface SelectorFamilyConfig<T, P extends SerializableParam> {
  key: string;
  get: (param: P) => (opts: { get: GetRecoilValue }) => Promise<T> | RecoilValue<T> | T;
  set?: (
    param: P,
  ) => (
    opts: { set: SetRecoilState; get: GetRecoilValue; reset: ResetRecoilState },
    newValue: T | DefaultValue,
  ) => void;
  dangerouslyAllowMutability?: boolean;
}
export interface SelectorFamilyMembers<T, P> {
  trackedSelectorFamily: (param: P) => RecoilState<T> | RecoilValueReadOnly<T>;
  prevParams: Set<any>;
  isSettable: boolean;
}
export interface SelectorFamilies<T, P> {
  [familyName: string]: SelectorFamilyMembers<T, P>;
}

// atoms should take RecoilState<any>[] | string[]
export interface Ledger<T, S, P> {
  atoms: T[];
  selectors: string[];
  atomFamilies: AtomFamilies;
  selectorFamilies: SelectorFamilies<S, P>;
  setters: string[];
  initialRender: SelectorUpdate[];
  initialRenderFamilies: SelectorFamilyUpdate[];
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
