import { RecoilState, RecoilValueReadOnly, RecoilValue, DefaultValue } from 'recoil';

// ----- INITIALIZING NON-IMPORTABLE TYPES -----
type GetRecoilValue = <T>(recoilVal: RecoilValue<T>) => T;
type SetRecoilState = <T>(
  recoilVal: RecoilState<T>,
  newVal: T | DefaultValue | ((prevValue: T) => T | DefaultValue),
) => void;
type ResetRecoilState = (recoilVal: RecoilState<any>) => void;

// ----- EXPORTING TYPES TO BE USED IN INDEX.TSX AND TESTSTRING.TS -----
export class chromogenAtomState<T> extends RecoilState<T> {
  default: any;
}
export type writeables<T> = Array<chromogenAtomState<T>>;
export type readables<T> = Array<RecoilValueReadOnly<T>>;
export type selectorsArr = Array<{ key: string; newValue: any }>;
export type snapshots = Array<{
  state: { key: string; value: any; updated: boolean }[];
  selectors: selectorsArr;
}>;
export interface selectorConfig<T> {
  key: string;
  get: (opts: { get: GetRecoilValue }) => T | Promise<T> | RecoilValue<T>;
  set?: (
    opts: { get: GetRecoilValue; set: SetRecoilState; reset: ResetRecoilState },
    newValue: T | DefaultValue,
  ) => void;
  dangerouslyAllowMutability?: boolean;
}
