// Output functions here are used inside hooks-output-utils as regex inside the user's exported test file

// Import hooks state from user's app
export function importHooksId(id: string | number) {
  return `${id}`;
}

// Tests whether current state is NOT null or undefined
export function testState(state: any, id: string | number) {
  return `'should show that state in ${id} is not null or undefined', () => {
    expect(${state.length-1}).not.toBe(undefined);
    expect(${state.length-1}).not.toBe(null));
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