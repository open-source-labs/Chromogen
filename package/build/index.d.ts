import React from 'react';
import { RecoilState, RecoilValueReadOnly, AtomOptions, RecoilValue, DefaultValue } from 'recoil';
declare type selectorConfig<T> = {
  key: string;
  get: ({ get: GetRecoilValue }: { get: any }) => T | Promise<T> | RecoilValue<T>;
  set?: (
    {
      get: GetRecoilValue,
      set: SetRecoilState,
      reset: ResetRecoilState,
    }: {
      get: any;
      set: any;
      reset: any;
    },
    newValue: T | DefaultValue,
  ) => void;
  dangerouslyAllowMutability?: bool;
  ean;
};
export declare function selector<T>(
  config: selectorConfig<T>,
): RecoilValueReadOnly<T> | RecoilState<T>;
export declare function atom<T>(config: AtomOptions<T>): RecoilState<T>;
export declare const ChromogenObserver: React.FC;
export {};
