/* eslint-disable */
import type { CSSProperties } from 'react';
// import type { SerializableParam } from 'recoil';
import type { Ledger } from '../types';

import { ledger } from '../utils/ledger';
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

export const styles = { buttonStyle, divStyle, playStyle, pauseStyle };

/**
 * onclick function that generates test file & sets download URL
 *
 * Key-to-Variable name mapping is applied if storeMap has any contents
 * (meaning atom / selector nodes were passed as props)
 * Applying only at point-of-download keeps performance cost low for users who
 * don't need to pass nodes while creating a moderate performance hit for others
 * only while downloading, never while interacting with their app.
 */
export const generateFile = (setFile: Function, storeMap: Map<string, string>): string[] => {
  const tests = generateTests(storeMap)
  const blob = new Blob(tests);
  setFile(URL.createObjectURL(blob));
  return tests;
};

export const generateTests = (storeMap: Map<string, string>): string[] => {
  const {
    initialRender,
    transactions,
  } = ledger;

  const finalLedger: Ledger =
    storeMap.size > 0
      ? ({
        initialRender,
        transactions: transactions,
      })
      : { ...ledger };

  return [output(finalLedger)];
}
