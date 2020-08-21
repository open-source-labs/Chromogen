/* eslint-disable */
import { RecoilState, RecoilValueReadOnly, RecoilValue, DefaultValue } from 'recoil';
/* eslint-enable */

// ----- INITIALIZING NON-IMPORTABLE RECOIL TYPES -----
type GetRecoilValue = <T>(recoilVal: RecoilValue<T>) => T;
type SetRecoilState = <T>(
  recoilVal: RecoilState<T>,
  newVal: T | DefaultValue | ((prevValue: T) => T | DefaultValue),
) => void;
type ResetRecoilState = (recoilVal: RecoilState<any>) => void;

// ----- EXPORTING TYPES TO BE USED IN SRC/.TSX FILES -----
export type Writeables<T> = Array<RecoilState<T>>;
export type Readables<T> = Array<RecoilValueReadOnly<T> | RecoilState<T>>;
export type SelectorsArr = Array<{ key: string; newValue: any }>;
export type Snapshots = Array<{
  state: { key: string; value: any; previous: any; updated: boolean }[];
  selectors: SelectorsArr;
}>;
export type Setters = Array<{
  state: { key: string; value: any; previous: any; updated: boolean }[];
  setter: null | { key: string; newValue: any };
}>;
export interface SelectorConfig<T> {
  key: string;
  get: (opts: { get: GetRecoilValue }) => T | Promise<T> | RecoilValue<T>;
  set?: (
    opts: { get: GetRecoilValue; set: SetRecoilState; reset: ResetRecoilState },
    newValue: T | DefaultValue,
  ) => void;
  dangerouslyAllowMutability?: boolean;
}
