import { CSSProperties } from 'react';
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
//function converts an a 2d array with changes in state to one object, with all reducer ids as properties with each having an array of state changes as its value
//ie: [[firstReducerId, firstState], [secondReducerId, firstState], [firstReducerId, secondState]] -> {firstReducerId: [initialState, secondState], secondReducerId: [firstState]}
export const createPrevStateObj = (stateArrays: Array<Array<any>>): object => {

  const stateObj: object = {};

  for (let i = 0; i < stateArrays.length; i++) {
    if (stateArrays[i][1] !== undefined) {
      const key = stateArrays[i][0]
      if (key in stateObj) {
        const oldValue = stateObj[key];

        if (Array.isArray(stateArrays[i][1])) {
          oldValue.push(stateArrays[i][1][0]);
        }
        else {
          oldValue.push(stateArrays[i][1]);
        }
        stateObj[key] = oldValue;

      }
      else {
        if (!Array.isArray(stateArrays[i][1])) {
          stateObj[key] = [stateArrays[i][1]];
        } else {
          stateObj[key] = stateArrays[i][1];
        }
      }
    }
  }
  return stateObj
}

type D3Obj = {
  name: string,
  children: Array<any>
}

export const generateStateTreeObj = (stateObj: object): D3Obj => {
  const d3Obj: D3Obj = {
    name: 'root',
    children: []
  };

  //iterate through properties of our state object
  //to parse each and place in d3Obj
  for (const property in stateObj) {
    const innerObj: D3Obj = {
      name: property,
      children: []
    }

    for (let i = 0; i < stateObj[property].length; i++) {

      innerObj.children.push({ name: `${stateObj[property][i]}` })
    }
    d3Obj.children.push(innerObj)
  }

  return d3Obj;
}

export const generateHooksFile = (setHooksFile: Function): any => {
  const blob = new Blob([output(ledger)]);
  setHooksFile(URL.createObjectURL(blob));
  return [output(ledger)];
};


