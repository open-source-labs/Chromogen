/* eslint-disable */
import type { Snapshot } from 'recoil';
import type { AtomFamilyState } from '../types';

import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import { dummyParam } from '../utils/utils';
import { recordingState } from '../utils/store';
import { ledger } from '../utils/ledger';
import { styles, generateFile } from './component-utils';
/* eslint-enable */

//fc is function component... explicit about its return type
//ChromogenObserver type is React.FC<{ store?: Array<object> | object }> 
//React.FC store is optional, if it has a store its type can be an Array<object> or object
//ChromogenObserver is a component like any other component
export const ChromogenObserver: React.FC<{ store?: Array<object> | object }> = ({ store }) => {
  // Initializing as undefined over null to match React typing for AnchorHTML attributes
  const [file, setFile] = useState<undefined | string>(undefined);
  const [storeMap, setStoreMap] = useState<Map<string, string>>(new Map());
  const [recording, setRecording] = useRecoilState<boolean>(recordingState);
  const [devtool, setDevtool] = useState<boolean>(false);
  const [, setEditFile] =useState<undefined | string>(undefined);

  // DevTool message handling
  //message is an event like 'click' in eventlisteners
  const receiveMessage = (message: any) => {
    switch (message.data.action) {
      case 'connectChromogen':
        setDevtool(true);
        window.postMessage({ action: 'moduleConnected' }, '*');
        break;
      case 'downloadFile':
        generateFile(setFile, storeMap);
        break;
      case 'editFile':
        const array = generateFile(setEditFile, storeMap);
        window.postMessage({ action: 'editFileReceived', data: array }, '*');
        break;       
      case 'toggleRecord':
        setRecording(!recording);
        window.postMessage({ action: 'setStatus' }, '*');
        break;
      default:
      // Do nothing
    }
  };

  // Add/remove DevTool event listeners
  useEffect(() => {
    window.addEventListener('message', receiveMessage);

    return () => window.removeEventListener('message', receiveMessage);
  });

  // Auto-click download link when a new file is generated (via button click)
  useEffect(() => document.getElementById('chromogen-download')!.click(), [file]);
  // ! to get around strict null check in tsconfig

  // Update storeMap with src variable names if store prop passed
  useEffect(() => {
    if (store !== undefined) {
      const storeArr = Array.isArray(store) ? store : [store];
      const newStore: Map<string, string> = new Map();

      storeArr.forEach((storeModule) => {
        Object.entries(storeModule).forEach(([variable, imported]) => {
          let key;
          /** Relevant imports will be either an object (for vanilla atoms or selectors)
           * or functions (for atom or selector families). If we are examining a family function,
           * we will need to invoke it to create an atom/selector in order to pull the
           * original family key out from the generated atom or selector's individual key.
           * */
          if (typeof imported === 'function') {
            // Extended atom fam key will follow format of `[key]__"chromogenDummyParam"__withFallback`
            // Extended selector fam key will follow format of `[key]__selectorFamily/"chromogenDummyParam"/1`
            const extendedKey = imported(dummyParam).key;
            key = extendedKey.includes('selectorFamily')
              ? extendedKey.substring(0, extendedKey.indexOf('selectorFamily') - 2)
              : extendedKey.substring(0, extendedKey.indexOf(`"${dummyParam}"`) - 2);
          } else {
            key = imported.key;
          }
          newStore.set(key, variable);
        });
      });
      setStoreMap(newStore);
    }
  }, []);
  //provides the previous statae and current state as snapshots
  useRecoilTransactionObserver_UNSTABLE(
    ({ previousSnapshot, snapshot }: { previousSnapshot: Snapshot; snapshot: Snapshot }): void => {
      // Map current snapshot to array of atom states
      // Can't directly check recording hook b/c TransactionObserver runs before state update
      if (snapshot.getLoadable(recordingState).contents) {
        const { transactions, setTransactions, atoms, atomFamilies } = ledger;

        const state = atoms.map((item) => {
          const { key } = item;
          const value = snapshot.getLoadable(item).contents;
          const previous = previousSnapshot.getLoadable(item).contents;
          const updated = value !== previous;
          return { key, value, previous, updated };
        });

        const atomFamilyState: AtomFamilyState[] = [];

        /* eslint-disable */
        // TODO: refactor out of for-in syntax b/c for-in tracks up the prototype chain x_x
        for (const family in atomFamilies) {
          const familyMembers = atomFamilies[family];
          for (const member in familyMembers) {
            const memberRecoilState = familyMembers[member];
            let { key } = memberRecoilState;
            /* Key will be auto-generated by recoil in the format of
             * [atomFamilyName] + "__" + [params] + "__withFallback".
             * Removing the "__withFallback" suffix to enhance readability
             */
            key = key.substring(0, key.length - 14);
            const value = snapshot.getLoadable(memberRecoilState).contents;
            const previous = previousSnapshot.getLoadable(memberRecoilState).contents;
            const updated = value !== previous;
            // Don't track dummy atom generated by onload useEffect hook
            if (!key.includes(dummyParam)) atomFamilyState.push({ family, key, value, updated });
          }
        }
        /* eslint-enable */

        transactions.push({ state, updates: [], atomFamilyState, familyUpdates: [] });
        setTransactions.push({ state, setter: null });
      }
    },
  );

const [pauseColor, setPauseColor] = useState('#90d1f0');
const pauseBorderStyle = {
  borderColor: `${pauseColor}`,
};

const [playColor, setPlayColor] = useState('transparent transparent transparent #90d1f0')
const playBorderStyle = {
  borderColor: `${playColor}`,
};

  return (
    <>
      {
        // Render button div only if DevTool not connected
        !devtool && (
          <div>
            <div style={styles.divStyle}>
              <button
                aria-label={recording ? 'pause' : 'record'}
                id="chromogen-toggle-record"
                style={{ ...styles.buttonStyle, backgroundColor: '#7f7f7f' }}
                type="button"
                onClick={() => {
                  setRecording(!recording);
                  // if (!recording) return true;
                  // return false;
                }}
                onMouseEnter={() => recording ? setPauseColor('#f6f071') : setPlayColor('transparent transparent transparent #f6f071')}
                onMouseLeave={() => recording ? setPauseColor('#90d1f0') : setPlayColor('transparent transparent transparent #90d1f0')}
              ><a>{recording ? 
                <div style={{...styles.pauseStyle, ...pauseBorderStyle}}></div>
                 : <div style={{...styles.playStyle, ...playBorderStyle}}></div>
                 }</a>
              </button>
              <button
                aria-label="capture test"
                id="chromogen-generate-file"
                style={{ ...styles.buttonStyle, backgroundColor: '#7f7f7f', marginLeft: '-2px', marginRight: '13px' }}
                type="button"
                onClick={() => generateFile(setFile, storeMap)}
                onMouseEnter={() => document.getElementById("chromogen-generate-file")!.style.color = '#f6f071'}
                onMouseLeave={() => document.getElementById("chromogen-generate-file")!.style.color = '#90d1f0'}
                ><a>{'Download'}</a>
              </button>
            </div>
          </div>
        )
      }
      <a
        download="chromogen.test.js"
        href={file}
        id="chromogen-download"
        style={{ display: 'none' }}
      >
        Download Test
      </a>
    </>
  );
};
