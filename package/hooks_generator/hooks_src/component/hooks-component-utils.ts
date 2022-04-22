import type { CSSProperties } from 'react';
import { hooksLedger as ledger } from '../utils/hooks-ledger';
import { hooksOutput as output } from '../output/hooks-output';

// Create buttonStyles and divStyles here
const hooksButtonStyle: CSSProperties = {
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

const hooksDivStyle: CSSProperties = {
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

const hooksPlayStyle: CSSProperties = {
  boxSizing: 'border-box',
  marginLeft: '25px',
  borderStyle: 'solid',
  borderWidth: '7px 0px 7px 14px',
};

const hooksPauseStyle: CSSProperties = {
  width: '14px',
  height: '14px',
  borderWidth: '0px 0px 0px 10px',
  borderStyle: 'double',
  marginLeft: '27px',
};

export const hookStyles = { hooksButtonStyle, hooksDivStyle, hooksPlayStyle, hooksPauseStyle };

export const generateHooksFile = (setHooksFile: Function): Blob => {
  // return setHooksFile(URL.createObjectURL(new Blob([output(ledger)])));
  //return setHooksFile(test);
  const test = new Blob([output(ledger)]);
  setHooksFile(URL.createObjectURL(test));
  return test;
};
