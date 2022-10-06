import {
  testInitialState,
  testStateChangesExpect,
  testStateChangesAct,
  generateActLine
} from '../src/output/output-utils';

const initialRender = {
  todoListState: [],
  todoListFilterState: 'Show All',
  todoListSortState: false,
  quoteText: '',
  quoteNumber: 0,
  checkBox: false,
}

describe('INITIAL RENDER', () => {
  //create a variable to hold our expected output
  const expectedOutput = ''
    + `\tit('todoListState should initialize correctly', () => {\n\t\texpect(result.current.todoListState).toStrictEqual([]);\n\t});\n\n`
    + `\tit('todoListFilterState should initialize correctly', () => {\n\t\texpect(result.current.todoListFilterState).toStrictEqual("Show All");\n\t});\n\n`
    + `\tit('todoListSortState should initialize correctly', () => {\n\t\texpect(result.current.todoListSortState).toStrictEqual(false);\n\t});\n\n`
    + `\tit('quoteText should initialize correctly', () => {\n\t\texpect(result.current.quoteText).toStrictEqual("");\n\t});\n\n`
    + `\tit('quoteNumber should initialize correctly', () => {\n\t\texpect(result.current.quoteNumber).toStrictEqual(0);\n\t});\n\n`
    + `\tit('checkBox should initialize correctly', () => {\n\t\texpect(result.current.checkBox).toStrictEqual(false);\n\t});\n\n`
  //create a variable and assign it to the evaluated result of the calling the testInitialState on our input
  const evaluatedResult = testInitialState(initialRender);
  //expect(realOutput).toStrictEqual(expectedOutput);
  it('expectedOutput should equal evaulatedResult', () => {
    expect(evaluatedResult).toStrictEqual(expectedOutput);
  });



})

describe('TEST STATE CHANGES ACT', () => {

  const transaction = [
    {
      action: 'setFilter',
      arguments: ['Show Uncompleted'],
      changedValues: { 'todoListFilterState': 'Show Uncompleted' }
    }
  ];
  const testStateChangesActOutput = testStateChangesAct(transaction);

  const expectedOutput =

    `\n\tit('todoListFilterState should update correctly', () => {
      const { result } = renderHook(useStore);

      act(() => {\n  result.current.setFilter("Show Uncompleted");\n});

    \nexpect(result.current.todoListFilterState).toStrictEqual("Show Uncompleted");  
      });`;

  let expectedNoWhitespace = expectedOutput.replace(/\s/g, '');


  it('expect output to equal expected output', () => {
    expect(testStateChangesActOutput.replace(/\s/g, '')).toStrictEqual(expectedNoWhitespace)
  })
})



describe('TEST STATE CHANGES EXPECT', () => {
  //1. Create function inputs manually
  const input = ["todoListFilterState", "Show Completed"];
  //2. Manually write out expected output of function
  const expectedOutput = `\nexpect(result.current.todoListFilterState).toStrictEqual("Show Completed");`
  //3. Run function to get actual output
  //4. Compare exptected ouptut to actual output
  const testStateChanges = testStateChangesExpect(input)

  it('it should be true when when input is passed into testStateChanges function ', () => {
    expect(testStateChanges).toStrictEqual(expectedOutput);
  })
})




describe('GENERATE ACT LINE', () => {
  // Create a tranaction inputs manually
  const transaction = {
    action: 'setFilter',
    arguments: ['Show Completed'],
    changedValues: { todoListFilterState: "Show Completed" }
  };
  const action = transaction.action;
  const args = transaction.arguments;

  const expectedOutput = `\tresult.current.${action}(${args?.map(arg => JSON.stringify(arg)).join(', ')});\n`

  const testActGeneration = generateActLine(transaction)
  // Manually writing out expected output of function
  //const evaluateActGeneration = `\tresult.current.${action}(${args?.map(arg => JSON.stringify(arg)).join(', ')});\n`
  // Run func to get actual ouput
  //Compare  step2 to step 3
  it('testActGeneration should generate an action line', () => {
    expect(expectedOutput).toStrictEqual(testActGeneration)
  })
})