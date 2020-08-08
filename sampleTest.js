// selectors must be imported (example below)
// const charCountState = selector({
//   key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//   get: ({get}) => {
//     const text = get(textState);

//     return text.length;
//   },
// });


// import recoil-react-hooks-testing-library


// transactions array will be built by our package methods
const transactions = [
  { 
    selector: charCountState, 
    priorState: 'recorded from transaction',  //  an object, recorded by selector() fn
    updatedState: 'recorded from transaction'  // recorded output of selector() fn
  }
];

test(`${transactions[0].selector} should derive state correctly`, () => {
  const { result } = renderRecoilHook(transactions[0].selector, {
    states: [{ recoilState: priorState[0], initialValue: priorState[1] }],
  });

  expect(result.current).toBe(updatedState);
});

// tests will be generated WHENEVER a selector is triggered. 
// i.e. in the selector function