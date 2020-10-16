/* eslint-disable */
import React, {
  useState as reactUseState,
  ReducerAction,
  Reducer,
  useMemo,
  useEffect,
} from 'react';
import { createStore } from 'redux';
import { EnhancedStore, StateInspectorContext } from '../utils/hooks-store';
//import { hooksLedger as ledger } from '../utils/hooks-ledger';
import { hookStyles as styles, generateHooksFile as generateFile } from './hooks-component-utils';
// import { hooksRecordingState as recordingState } from '../utils/hooks-store';

//import { useState as hooksUseState } from '../api/hooks-api'
/* eslint-enable */

// const hooksRecordingState = true;
interface StateInspectorProps {
  name?: string;
  initialState?: any;
}

interface StoreReducerAction {
  type: string;
  payload: any;
}
// Export hooksChromogenObserver
export const HooksChromogenObserver: React.FC<StateInspectorProps> = ({
  initialState = {},
  children,
}) => {
  // Initializing as undefined over null to match React typing for AnchorHTML attributes
  // File will be string
  const [file, setFile] = reactUseState<undefined | string>(undefined);
  // RecordingState is imported from hooks-store
  const [recording, setRecording] = reactUseState(true);
  // DevTool will be default false unless user opens up devTool (=> true)
  const [devtool, setDevtool] = reactUseState<boolean>(false);

  // DevTool message handling
  // We want the user to manually toggle between Hooks or Recoil on both DevTool & main app (ADD IN FUNCTIONALITY)
  const receiveMessage = (message: any) => {
    switch (message.data.action) {
      case 'connectChromogen':
        setDevtool(true);
        window.postMessage({ action: 'moduleConnected' }, '*');
        break;
      case 'downloadFile':
        generateFile(setFile);
        break;
      case 'toggleRecord':
        setRecording(() => {
          if (!recording) return true;
          return false;
        });
        window.postMessage({ action: 'setStatus' }, '*');
        break;
      default:
      // Do nothing
    }
  };

  // Add DevTool event listeners
  useEffect(() => {
    window.addEventListener('message', receiveMessage);

    return () => window.removeEventListener('message', receiveMessage);
  });

  // Auto-click download link when a new file is generated (via button click)
  useEffect(() => document.getElementById('chromogen-hooks-download')!.click(), [file]);

  // usePrevious custom hook for grabbing the previous state value
  // function usePrevious(value: any) {
  //   // useRef will return a mutable ref object with a current property initialized to the current passed in argument. This object will persist for full lifetime of the component
  //   const ref = useRef();
  //   // Store current value in ref
  //   useEffect(() => {
  //     ref.current = value;
  //   }, [value]); // Only re-run if value changes

  //   return ref.current; // Previous value (happens before update in useEffect)
  // }

  // useEffect to check if tracker[1] was invoked

  const omit = (obj: Record<string, any>, keyToRemove: string) =>
    Object.keys(obj)
      .filter((key) => key !== keyToRemove)
      .reduce<Record<string, any>>((acc, key) => {
        acc[key] = obj[key];

        return acc;
      }, {});

  const store = useMemo<EnhancedStore | undefined>(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const registeredReducers: Record<string | number, Reducer<any, ReducerAction<any>>> = {};

    const storeReducer: Reducer<any, StoreReducerAction> = (state, action) => {
      const actionReducerId = action.type.split('/')[0];
      const isInitAction = /\/_init$/.test(action.type);
      const isTeardownAction = /\/_teardown$/.test(action.type);

      const currentState = isTeardownAction ? omit(state, actionReducerId) : { ...state };

      return Object.keys(registeredReducers).reduce((acc, reducerId) => {
        const reducer = registeredReducers[reducerId];
        const reducerState = state[reducerId];
        const reducerAction = action.payload;
        const isForCurrentReducer = actionReducerId === reducerId;

        if (isForCurrentReducer) {
          acc[reducerId] = isInitAction ? action.payload : reducer(reducerState, reducerAction);
        } else {
          acc[reducerId] = reducerState;
        }

        return acc;
      }, currentState);
    };

    const store: EnhancedStore = createStore(storeReducer, initialState);

    store.registerHookedReducer = (reducer, initialState, reducerId) => {
      registeredReducers[reducerId] = reducer;

      store.dispatch({
        type: `${reducerId}/_init`,
        payload: initialState,
      });

      return () => {
        delete registeredReducers[reducerId];

        store.dispatch({
          type: `${reducerId}/_teardown`,
        });
      };
    };

    return store;
  }, []);

  useEffect(() => {
    store && store.dispatch({ type: 'REINSPECT/@@INIT', payload: {} });
  }, []);

  // User imports hooksChromogenObserver to their app
  // Button download: onClick for generateHooksFile
  // Button record: onClick for setRecording
  return (
    <>
      {!devtool && (
        <StateInspectorContext.Provider value={store}>
          {children}
          <div style={styles.hooksDivStyle}>
            <button
              aria-label={recording ? 'pause' : 'record'}
              id="chromogen-toggle-record"
              style={{
                ...styles.hooksButtonStyle,
                backgroundColor: recording ? '#d44b5a' : '#fce3a3',
              }}
              type="button"
              onClick={() => {
                setRecording(() => {
                  if (!recording) return true;
                  return false;
                });
              }}
              onMouseEnter={() =>
                (document.getElementById('chromogen-toggle-record')!.style.color = '#f6f071')
              }
              onMouseLeave={() =>
                (document.getElementById('chromogen-toggle-record')!.style.color = '#90d1f0')
              }
            >
              <a>{recording ? 'Pause' : 'Play'}</a>
            </button>
            <button
              aria-label="capture test"
              id="chromogen-generate-file"
              style={{ ...styles.hooksButtonStyle, backgroundColor: '#12967a' }}
              type="button"
              onClick={() => generateFile(setFile)}
              onMouseEnter={() =>
                (document.getElementById('chromogen-generate-file')!.style.color = '#f6f071')
              }
              onMouseLeave={() =>
                (document.getElementById('chromogen-generate-file')!.style.color = '#90d1f0')
              }
            >
              <a>{'Download'}</a>
            </button>
          </div>
        </StateInspectorContext.Provider>
      )}
      <a
        download="chromogen-hooks.test.js"
        href={file}
        id="chromogen-hooks-download"
        style={{ display: 'none' }}
      >
        Download Test
      </a>
    </>
  );
};
