/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  selector as recoilSelector,
  atom as recoilAtom,
  // eslint-disable-next-line camelcase
  useRecoilTransactionObserver_UNSTABLE,
  RecoilState,
  RecoilValueReadOnly,
  AtomOptions,
  Snapshot,
  RecoilValue,
  DefaultValue,
} from 'recoil';
import output from './testString';

type writeables<T> = Array<RecoilState<T>>;
type readables<T> = Array<RecoilValueReadOnly<T>>;
type selectorsArr = Array<{ key: string; newValue: any }>;
type snapshots = Array<{
  state: { key: string; value: any }[];
  selectors: selectorsArr;
}>;
type initialRender = selectorsArr;

type selectorConfig<T> = {
  key: string;
  get: ({ get: GetRecoilValue }) => T | Promise<T> | RecoilValue<T>;
  set?: (
    { get: GetRecoilValue, set: SetRecoilState, reset: ResetRecoilState },
    newValue: T | DefaultValue,
  ) => void;
  dangerouslyAllowMutability?: boolean;
};

// ----- TESTING -----
// Arrays used to compose test string
const writeables: writeables<any> = [];
const readables: readables<any> = [];
const snapshots: snapshots = [];
const initialRender: initialRender = [];

// ----- SHADOW CONSTRUCTORS for SELECTOR / ATOM -----
//switching to function declaration
export function selector<T>(config: selectorConfig<T>): RecoilValueReadOnly<T> | RecoilState<T> {
  const { key, get, set } = config;

  // Inject code to "get" method of selector
  const getter = get
    ? (...args) => {
        const newValue = get(...args);
        const len = snapshots.length;
        if (len === 0) {
          initialRender.push({ key, newValue });
        } else {
          snapshots[len - 1].selectors.push({ key, newValue });
        }
        return newValue;
      }
    : null;

  // Create new config object with inject getter
  const newConfig: selectorConfig<any> = {
    key,
    get: getter,
  };

  // Inject code to "set" method of selector (if defined)
  if (set) {
    newConfig.set = (...args) => set(...args);
  }

  // Create Recoil selector with injected properties
  const newSelector = recoilSelector(newConfig);

  // Add selector object to appropriate exportable array
  readables.push(newSelector);

  // Return the normal selector out to the app
  return newSelector;
}

//switching to function declaration
export function atom<T>(config: AtomOptions<T>): RecoilState<T> {
  const newAtom = recoilAtom(config);
  writeables.push(newAtom);
  return newAtom;
}

// ----- TRANSACTION PROVIDER -----
const style = {
  display: 'block',
  position: 'absolute',
  top: '10px',
  left: '10px',
  margin: '0px',
  padding: '0px',
  height: '10px',
  width: '10px',
  backgroundColor: 'red',
};

// Provider component used to access state snapshots
export const ChromogenObserver: React.FC = () => {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }: { snapshot: Snapshot }): void => {
    // console.log('\nTRANSACTION OCCURRED\n');
    const state = writeables.map((item) => {
      const { key } = item;
      const value = snapshot.getLoadable(item).contents;
      return { key, value };
    });
    snapshots.push({ state, selectors: [] });
  });

  // Renders test output button to DOM
  return (
    <button
      aria-label="output test"
      style={style}
      type="button"
      onClick={() => output(writeables, readables, snapshots, initialRender)}
    />
  );
};
