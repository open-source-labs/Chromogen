/* eslint-disable */
import type { CSSProperties } from 'react';
import type { SerializableParam } from 'recoil';
import type { Ledger } from '../types';

import { ledger } from '../utils/ledger';
import { convertFamilyTrackerKeys } from '../utils/utils';
import { output } from '../output/output';
/* eslint-enable */

const buttonStyle: CSSProperties = {
  display: 'inline-block',
  margin: '8px',
  marginLeft: '13px',
  padding: '0px',
  height: '25px',
  width: '65px',
  borderRadius: '4px',
  justifyContent: 'space-evenly',
  border: '1px',
  cursor: 'pointer',
  color: '#90d1f0',
  fontSize: '10px',
};

const divStyle: CSSProperties = {
  display: 'flex',
  position: 'absolute',
  bottom: '100px',
  left: '100px',
  backgroundColor: '#aaa',
  borderRadius: '4px',
  margin: 0,
  padding: 0,
  zIndex: 999999,
};

const playStyle: CSSProperties = {
  boxSizing: 'border-box',
  marginLeft: '25px',
  borderStyle: 'solid',
  borderWidth: '7px 0px 7px 14px',
};

const pauseStyle: CSSProperties = {
  width: '14px',
  height: '14px',
  borderWidth: '0px 0px 0px 10px',
  borderStyle: 'double',
  marginLeft: '27px',
};

const recordStyle: CSSProperties = {
  margin: '0px',
  fontSize: '12px',
  display: 'flex',
  width: '95px',
  color: 'white',
  padding: '4px',
  position: 'fixed',
  borderRadius: '2px',
  flexDirection: 'row',
  backgroundColor: '#7f7f7f'
};

export const styles = { buttonStyle, divStyle, playStyle, pauseStyle, recordStyle };

/**
 * onclick function that generates test file & sets download URL
 *
 * Key-to-Variable name mapping is applied if storeMap has any contents
 * (meaning atom / selector nodes were passed as props)
 * Applying only at point-of-download keeps performance cost low for users who
 * don't need to pass nodes while creating a moderate performance hit for others
 * only while downloading, never while interacting with their app.
 */
export const generateFile = (setFile: Function, storeMap: Map<string, string>): void => {
  const {
    atoms,
    selectors,
    setters,
    atomFamilies,
    selectorFamilies,
    initialRender,
    initialRenderFamilies,
    transactions,
    setTransactions,
  } = ledger;

  const finalLedger: Ledger<string, any, SerializableParam> =
    storeMap.size > 0
      ? {
        atoms: atoms.map(({ key }) => storeMap.get(key) || key),
        selectors: selectors.map((key) => storeMap.get(key) || key),
        atomFamilies: convertFamilyTrackerKeys(atomFamilies, storeMap),
        selectorFamilies: convertFamilyTrackerKeys(selectorFamilies, storeMap),
        setters: setters.map((key) => storeMap.get(key) || key),
        initialRender: initialRender.map(({ key, value }) => {
          const newKey = storeMap.get(key) || key;
          return { key: newKey, value };
        }),
        initialRenderFamilies: initialRenderFamilies.map(({ key, value, params }) => {
          const newKey = storeMap.get(key) || key;
          return { key: newKey, value, params };
        }),
        transactions: transactions.map(({ state, updates, atomFamilyState, familyUpdates }) => {
          const newState = state.map((eachAtom) => {
            const key = storeMap.get(eachAtom.key) || eachAtom.key;
            return { ...eachAtom, key };
          });
          const newUpdates = updates.map((eachSelector) => {
            const key = storeMap.get(eachSelector.key) || eachSelector.key;
            const { value } = eachSelector;
            return { key, value };
          });
          const newAtomFamilyState = atomFamilyState.map((eachFamAtom) => {
            const family = storeMap.get(eachFamAtom.family) || eachFamAtom.family;
            const oldKey = eachFamAtom.key;
            const keySuffix = oldKey.substring(eachFamAtom.family.length);
            const key = family + keySuffix;
            return { ...eachFamAtom, family, key };
          });
          const newFamilyUpdates = familyUpdates.map((eachFamSelector) => {
            const key = storeMap.get(eachFamSelector.key) || eachFamSelector.key;
            return { ...eachFamSelector, key };
          });
          return {
            state: newState,
            updates: newUpdates,
            atomFamilyState: newAtomFamilyState,
            familyUpdates: newFamilyUpdates,
          };
        }),
        setTransactions: setTransactions.map(({ state, setter }) => {
          const newState = state.map((eachAtom) => {
            const key = storeMap.get(eachAtom.key) || eachAtom.key;
            return { ...eachAtom, key };
          });
          const newSetter = setter;
          if (newSetter) {
            const { key } = newSetter;
            newSetter.key = storeMap.get(key) || key;
          }
          return { state: newState, setter: newSetter };
        }),
      }
      : { ...ledger, atoms: atoms.map(({ key }) => key) };

  return setFile(URL.createObjectURL(new Blob([output(finalLedger)])));
};
