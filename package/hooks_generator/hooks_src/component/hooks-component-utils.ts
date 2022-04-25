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
let count = 1;
//function converts an a 2d array with changes in state to one object, with all reducer ids as properties with each having an array of state changes as its value
//ie: [[firstReducerId, firstState], [secondReducerId, firstState], [firstReducerId, secondState]] -> {firstReducerId: [initialState, secondState], secondReducerId: [firstState]}
export const createPrevStateObj = (stateArrays: Array<Array<any>>): object => {

  const stateObj: object = {};
  
  for(let i = 0; i < stateArrays.length; i++){
    count++
    console.log('count', count)
  //check if stateArrays[i][0] exists in object
   if (stateArrays[i][1] !== undefined) {
         const key = stateArrays[i][0]
         if (key in stateObj){
          const oldValue = stateObj[key];
          if(Array.isArray(stateArrays[i][1])){
            oldValue.push(stateArrays[i][1][0]);
          }
          else{
            oldValue.push(stateArrays[i][1]);
          }
            stateObj[key] = oldValue;
            console.log('state[key]', stateObj[key])

         }
      else {
        if (!Array.isArray(stateArrays[i][1])){
          stateObj[key] = [stateArrays[i][1]];
        } else{
          stateObj[key] = stateArrays[i][1];
        }
        }
  console.log('state obj', i, stateObj)
  }
 }

  return stateObj
}

export const generateHooksFile = (setHooksFile: Function): any => {
  // return setHooksFile(URL.createObjectURL(new Blob([output(ledger)])));
  //console.log('we are hooks-component-utils and this is our ledger for generateFile:', ledger)
  const blob = new Blob([output(ledger)]);
 // console.log('updated blob looks like:', blob);
 // console.log('updated url:', URL.createObjectURL(blob));
  setHooksFile(URL.createObjectURL(blob));
  // return blob;
  return [output(ledger)];
};
