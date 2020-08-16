import React, { useState, useEffect, CSSProperties } from 'react';
import {
  selector as recoilSelector,
  atom as recoilAtom,
  useRecoilState,
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

// ----- INITIALIZING NON-IMPORTED TYPES -----
type writeables<T> = Array<RecoilState<T>>;
type readables<T> = Array<RecoilValueReadOnly<T>>;
type selectorsArr = Array<{ key: string; newValue: any }>;
type snapshots = Array<{
  state: { key: string; value: any }[];
  selectors: selectorsArr;
}>;

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
const initialRender: selectorsArr = [];
const recordingState: RecoilState<any> = recoilAtom({
  //why won't RecoilState<boolean> work?
  key: 'recordingState',
  default: true,
});

// ----- SHADOW CONSTRUCTORS for SELECTOR / ATOM -----
//switching to function declaration
export function selector<T>(config: selectorConfig<T>): RecoilValueReadOnly<T> | RecoilState<T> {
  const { key, get, set } = config;

  // Inject code to "get" method of selector
  const getter = (arg: any) => {
    const newValue = get(arg);
    if (arg.get(recordingState)) {
      const len = snapshots.length;
      if (len === 0) {
        initialRender.push({ key, newValue });
      } else {
        snapshots[len - 1].selectors.push({ key, newValue });
      }
    }
    return newValue;
  };

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
const buttonStyle: CSSProperties = {
  display: 'block',
  position: 'absolute',
  top: '10px',
  left: '10px',
  margin: '0px',
  padding: '0px',
  height: '10px',
  width: '10px',
};

// TODO: size div correctly to content
// Used to ensure appropriate button contrast for varying page backgrounds
const divStyle: CSSProperties = {
  display: 'inline-block',
  position: 'absolute',
  backgroundColor: 'grey',
  margin: 0,
};

export const ChromogenObserver: React.FC = () => {
  // File stores URL for generated test file Blob containing output() string
  const [file, setFile] = useState<undefined | string>(undefined); //swapping to undefined from null in order to match native React typing for AnchorHTML attributes
  const [recording, setRecording] = useRecoilState(recordingState);

  // Auto-click download link when a new file is generated (via button click)
  useEffect(() => document.getElementById('chromogen-download').click(), [file]);

  useRecoilTransactionObserver_UNSTABLE(({ snapshot }: { snapshot: Snapshot }): void => {
    // Map current snapshot to array of atom states
    if (recording) {
      const state = writeables.map((item) => {
        const { key } = item;
        const value = snapshot.getLoadable(item).contents;
        return { key, value };
      });

      // Add current transaction snapshot to snapshots array
      snapshots.push({ state, selectors: [] });
    }
  });

  // Render button to DOM for capturing test output, and creates invisible download link for test file
  return (
    <div style={divStyle}>
      <button
        aria-label="capture test"
        style={{ ...buttonStyle, backgroundColor: 'green' }}
        type="button"
        onClick={() =>
          setFile(
            URL.createObjectURL(
              new Blob([output(writeables, readables, snapshots, initialRender)]),
            ),
          )
        }
      />
      <button
        aria-label={recording ? 'pause' : 'record'}
        style={{ ...buttonStyle, backgroundColor: recording ? 'red' : 'yellow', left: '30px' }}
        type="button"
        onClick={() => {
          setRecording(!recording);
        }}
      />
      <a
        download="chromogen.test.js"
        href={file}
        id="chromogen-download"
        style={{ display: 'none' }}
      >
        Download Test
      </a>
    </div>
  );
};
