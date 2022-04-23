// Output functions here are used inside hooks-output-utils as regex inside the user's exported test file

// Import hooks state from user's app
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
  return `'should show that state in ${id} (number of elements in state array) is not null or undefined', () => {
    expect(${state!.length-1}).not.toBe(undefined);
    expect(${state!.length-1}).not.toBe(null));
  }`
}

// Testing that individual state is changing, and our ledger is updating accordingly
// BUG: State needs to be a primitive data type or mapped over in order for the test to be read. Arrays and objects will show up as undefined

// export function testStateChange (state: any, id: string | number, dispCount: number) {
//   return `'should show that state in ${id} changes after every dispatch and its length should be equal to dispatch count', () => {
//     expect(${state[dispCount-1]}).not.toBe(${state[dispCount-2]}));
//     expect(${state.length}).toBe(${dispCount});
//   }`
// }

export function testStateChange (state: any, id: string | number, previousState: Array<Object>) {
  
  //use reduce to pass state element into tests 
  if (Array.isArray(state)){
  const initialAccVal = '';
  
  //item will be each value in state
  const reducer = (acc, item, index = 0) => {
    //use index to compare the previous state value with current item in state
    index--;
    //first expect test should be showing that the current state has changed from the previous state
    return acc +  '\n' + `'should show that state in ${id} changes after every dispatch and the number of elements in state array should be equal to dispatch count', () => {
      expect(${item}).not.toBe(${state[index]}));
      expect(${state!.length}).toBe(${dispCount});
    }`
  }

  const stateVals = state.reduce(reducer, initialAccVal);

  return stateVals;
  };



  // let resultStr = '';
  // for (let i = 0; i < previousState.length; i++){
  //   resultStr += `'should show that state changes after every dispatch', () => {
  //     expect(${previousState[i][id]}).not.toBe(${previousState[i - 1][id]})}
  //   }`
  // }

  // return  resultStr;
}