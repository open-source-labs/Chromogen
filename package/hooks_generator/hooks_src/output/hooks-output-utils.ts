// Output functions here are used inside hooks-output-utils as regex inside the user's exported test file

// Import hooks state from user's app
import { createPrevStateObj } from "../component/hooks-component-utils";

export function importHooksId(id: string | number) {
  return `${id}`;
}

// Tests whether current state is NOT null or undefined
// export function testState(state: any, id: string | number) {
//   return `'should show that state in ${id} (number of elements in state array) is not null or undefined', () => {
//     expect(${state.length-1}).not.toBe(undefined);
//     expect(${state.length-1}).not.toBe(null));
//   }`
// }

// download button irresponsive possibly due to .length of undefined error
export function testState(state: any, id: string | number) {
  return `'should show that current state in ${id} is not null or undefined', () => {
    expect(${state}).not.toBe(undefined);
    expect(${state}).not.toBe(null));
  }`
}

// Testing that individual state is changing, and our ledger is updating accordingly
export function testStateChange (prevState: Array<Array<any>>) {
  
  const prevStateObj = createPrevStateObj(prevState);

  let resultStr = '';

  for (const [key , value] of Object.entries(prevStateObj)){
    for (let i = 1; i < value.length; i++){
      resultStr += `it('should show that state in ${key} changes after every dispatch', () => {
        expect(${value[i]}).not.toBe(${value[i - 1]})}
      }\n\t`
    }
  }

  return  resultStr;
}