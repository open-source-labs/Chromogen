import React, {
  useState as reactUseState,
  ReducerAction,
  Reducer,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { createStore } from 'redux';

//import { Store as reduxStore} from 'redux'

import ReactDOM from 'react-dom';
import { EnhancedStore, ObserverContext } from '../utils/hooks-store';
import { hookStyles as styles, generateHooksFile as generateFile } from './hooks-component-utils';

// Interfaces for StateInspectorProps and StoreReducerAction
interface StateInspectorProps {
  name?: string;
  initialState?: any;
}

interface StoreReducerAction {
  type: string;
  payload: any;
}

// Export hooksChromogenObserver
export const HooksChromogenObserver: React.FC<StateInspectorProps> = function({
  initialState = {},
  children,
}) {

  //console.log('children', children)
  // Initializing as undefined over null to match React typing for AnchorHTML attributes
  const [file, setFile] = reactUseState<undefined | string>(undefined);
  // RecordingState is imported from hooks-store
  const [recording, setRecording] = reactUseState(true);
  // DevTool will be default false unless user opens up devTool (=> true)
  const [devtool, setDevtool] = reactUseState<boolean>(false);
  const [editFile, setEditFile] = reactUseState<undefined | string>(undefined);
  const [currState, setCurrState] = reactUseState<any>(undefined);

  // DevTool message handling
  // We want the user to manually toggle between Hooks or Recoil on both DevTool & main app (ADD IN FUNCTIONALITY)
  const receiveMessage = (message: any) => {
    switch (message.data.action) {
      case 'connectChromogen':
        setDevtool(true);
        console.log('inside connectChromogen in HooksChromogenObserver')
        window.postMessage({ action: 'moduleConnected' }, '*');
        break;
      case 'downloadFile':
        generateFile(setFile);
        console.log('im in receiveMessage downloadFile case')
        break;
      case 'editFile':
        const array = generateFile(setEditFile);
        // editFile is updated to url, but testing should be blob
        console.log('we have clicked editFile button and generated blob:', array);
        console.log('typeof blob', typeof array)
        //we could just send back testing string here in window.postMessage here
        console.log('per error message on chrome ext, message.file should be a blob')
        window.postMessage({ action: 'editFileReceived', data: array }, '*');
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
    // fire receiveMessage fn when 'message' event is fired on window obj by a call to Window.postMessage() from another browsing context
    window.addEventListener('message', receiveMessage);

    return () => window.removeEventListener('message', receiveMessage);
  });

  // Auto-click download link when a new file is generated (via button click)
  useEffect(() => document.getElementById('chromogen-hooks-download')!.click(), [file]);

  // with updated state in editFile, readfile 
  useEffect(() => document.getElementById('chromogen-hooks-download')!.click(), [editFile]);

  const omit = (obj: Record<string, any>, keyToRemove: string) =>
    Object.keys(obj)
      .filter((key) => key !== keyToRemove)
      .reduce<Record<string, any>>((acc, key) => {
        acc[key] = obj[key];
        console.log('obj', obj);
        console.log('key', key)
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

      //currentState keeps logging as undefined, even with state changes
      //currentState is initial state value
      const currentState = isTeardownAction ? omit(state, actionReducerId) : { ...state };
      
      const realCurrentState = { ...state };

      console.log('actionReducerId', actionReducerId)
      console.log('state is:', {...state})

      // Object.keys(registeredReducers)) returns an array with reducer id strings as entries
      //result returns an object with appropriate updated state
      const result =  Object.keys(registeredReducers).reduce((acc, reducerId) => {
        const reducer = registeredReducers[reducerId];
        const reducerState = state[reducerId];
        const reducerAction = action.payload;
        const isForCurrentReducer = actionReducerId === reducerId;

        if (isForCurrentReducer) {
          acc[reducerId] = isInitAction ? action.payload : reducer(reducerState, reducerAction);
          //acc[reducerId] is our current state value for our current reducer
          //console.log('acc[reducerId]', acc[reducerId])

        } else {
          acc[reducerId] = reducerState;
          //console.log('reducerState', reducerState)
        }

        return acc;

      }, currentState)
      


      //store reducer will send any state changes to dev tool
      window.postMessage({ action: 'stateChange', stateObj: result }, '*');

      //we want to return an array where it appends result to previous state array
      //check for undefined to avoid trying to push undefined to state array
      // if (realCurrentState[actionReducerId] !== undefined){
      //   if (Array.isArray(realCurrentState[actionReducerId])){
      //     //realCurrentState[actionReducerId].push(result);
      //    console.log('result inside if', result[actionReducerId])
      //    console.log('reaLLLLLCURRR', realCurrentState[actionReducerId])
      // } 
      // }//else
      return result;
    }; //end storeReducer
    
    const store: EnhancedStore = createStore(storeReducer, initialState);
    //const store: Store 

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
  }, []);//end storeMemo


  useEffect(() => {
    store && store.dispatch({ type: 'REINSPECT/@@INIT', payload: {} });
  }, []);

const [pauseColor, setPauseColor] = useState('#90d1f0');
const pauseBorderStyle = {
  borderColor: `${pauseColor}`,
};

const [playColor, setPlayColor] = useState('transparent transparent transparent #90d1f0')
const playBorderStyle = {
  borderColor: `${playColor}`,
};


useEffect(() => {
  console.log('look for dom node', ReactDOM.findDOMNode(this))
})
  // User imports hooksChromogenObserver to their app
  return (
    <>
      {!devtool && (
        <ObserverContext.Provider value={store}>
          {children}
          <div style={styles.hooksDivStyle}>
            <button
              aria-label={recording ? 'pause' : 'record'}
              id="chromogen-toggle-record"
              style={{ ...styles.hooksButtonStyle, backgroundColor: '#7f7f7f' }}
              type="button"
              onClick={() => {
                setRecording(() => {
                  if (!recording) return true;
                  return false;
                });
              }}
              onMouseEnter={() => recording ? setPauseColor('#f6f071') : setPlayColor('transparent transparent transparent #f6f071')}
              onMouseLeave={() => recording ? setPauseColor('#90d1f0') : setPlayColor('transparent transparent transparent #90d1f0')}
            >
              <a>{recording ? 
                <div style={{...styles.hooksPauseStyle, ...pauseBorderStyle}}></div>
                 : <div style={{...styles.hooksPlayStyle, ...playBorderStyle}}></div>
                 }</a>
            </button>
            <button
              aria-label="capture test"
              id="chromogen-generate-file"
              style={{ ...styles.hooksButtonStyle, backgroundColor: '#7f7f7f', marginLeft: '-2px', marginRight: '13px' }}
              type="button"
              onClick={() => generateFile(setFile)}
              onMouseEnter={() => document.getElementById("chromogen-generate-file")!.style.color = '#f6f071'}
              onMouseLeave={() => document.getElementById("chromogen-generate-file")!.style.color = '#90d1f0'}
            >
              <a>{'Download'}</a>
            </button>
          </div>
        </ObserverContext.Provider>
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