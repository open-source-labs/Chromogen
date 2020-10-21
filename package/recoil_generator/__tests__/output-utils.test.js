import {
  initializeAtoms,
  assertState,
  testSelectors,
  testSetters,
  importRecoilFamily,
  atomFamilyHook,
  //writeableHook,
  readableHook,
} from '../src/output/output-utils.ts';

// testing ternary operator in initializeAtoms helper function
describe('initializeAtoms', () => {
  // create mock atomUpdate object, follows AtomUpdate interface
  const atomUpdate = {
    key: 'testAtom',
    value: 2,
    previous: 1,
    updated: true,
  };

  it('should set correct atom value if current is true', () => {
    // create variable to hold evaluated result of invoking initializeAtoms on the mock array with a parameter of true
    const returnString = initializeAtoms([atomUpdate], true);
    // verify that returnString contains key property of a string and contains a value property on the atomUpdate object (since true was passed into 'initializeAtoms')
    expect(returnString).toEqual(
      expect.stringContaining(`result.current.set${atomUpdate.key}(${atomUpdate.value})`),
    );
  });

  it('should set correct atom value if current is false', () => {
    // create variable to hold evaluated result of invoking initializeAtoms on the mock array with a parameter of false
    const returnString = initializeAtoms([atomUpdate], false);
    // verify that returnString contains key property of a string and contains a value property on the atomUpdate object (since false was passed into 'initializeAtoms')
    expect(returnString).toEqual(
      expect.stringContaining(`result.current.set${atomUpdate.key}(${atomUpdate.previous})`),
    );
  });
});

describe('assertState', () => {
  // create mock selectors array, follows SelectorUpdate interface
  const selectorUpdates = [
    {
      key: 'testSelector1',
      value: true,
    },
    {
      key: 'testSelector2',
      value: 100,
    },
  ];

  it('should assert on each selector value', () => {
    // create variable to hold evaluated result of invoking assertState on mock array
    const returnString = assertState(selectorUpdates);
    // verify that output test contains a string checking that the object's key equals a stringified version of its value on the same object
    expect(returnString).toEqual(
      expect.stringContaining(
        `expect(result.current.${selectorUpdates[0].key}Value).toStrictEqual(${JSON.stringify(
          selectorUpdates[0].value,
        )});`,
      ),
    );

    expect(returnString).toEqual(
      expect.stringContaining(
        `expect(result.current.${selectorUpdates[1].key}Value).toStrictEqual(${JSON.stringify(
          selectorUpdates[1].value,
        )});`,
      ),
    );
  });
});

describe('importRecoilFamily', () => {
  const familyObj = {
    familyName: 'string',
    atomName: 'test',
  };
  it('should return a string with an object as its parameter', () => {
    expect(typeof importRecoilFamily(familyObj)).toBe('string');
  });
});

describe('readableHook', () => {
  const keyArray = ['one', 'two', 'chromogen'];
  it('should return a string', () => {
    expect(typeof readableHook(keyArray)).toBe('string');
  });
});

// describe('writeableHook', () => {
//   const keyArray = ['chromo', 'gen', 'chromogen'];
//   it('should return a string', () => {
//     expect(typeof writeableHook(keyArray)).toBe('string');
//   });
// });

describe('testSelectors', () => {
  it('should scrub special characters from key names', () => {
    // create instance of invoking testSelectors on mock array that follows the Transaction interface
    const returnString = testSelectors([
      {
        state: [
          {
            key: 'atom1',
            value: 1,
            previous: 2,
            updated: true,
          },
        ],
        updates: [
          {
            key: 'selector1',
            value: 3,
          },
        ],
        atomFamilyState: [
          {
            family: 'familyName1',
            key: 'spec!alCh@r',
            value: 4,
            updated: true,
          },
        ],
        familyUpdates: [
          {
            key: 'familyUpdate1',
            value: 5,
            params: 'params',
          },
        ],
      },
    ]);
    // verify that if key property's value is a string with special characters they will be removed
    expect(returnString).toEqual(expect.not.stringContaining('spec!alCh@r'));
  });
});

// covers branch test percentage in testSetters
describe('testSetters', () => {
  // create mock array with setter object
  const setTransactionsArrayWithSetter = [
    {
      state: [
        {
          key: 'atom1',
          value: 1,
          previous: 0,
          updated: true,
        },
      ],
      setter: {
        key: 'selector1',
        value: 2,
        params: 'spec!alCh@r',
      },
    },
  ];
  // create mock array without setter object
  const setTransactionsArrayWithoutSetter = [
    {
      state: [
        {
          key: 'atom1',
          value: 1,
          previous: 0,
          updated: true,
        },
      ],
    },
  ];
  const truthyReturnString = testSetters(setTransactionsArrayWithSetter);
  const falsyReturnString = testSetters(setTransactionsArrayWithoutSetter);

  it('should scrub special characters from params', () => {
    // verify that if params property's value is a string with special characters, they will be removed
    expect(truthyReturnString).toEqual(expect.not.stringContaining('spec!alCh@r'));
  });
  it('should return a string if an array is passed in', () => {
    // verify that a string is returned if provided an array with out a setter object
    expect(typeof falsyReturnString).toBe('string');
  });
});

// TEST FOR ATOMFAMILYHOOK lines 70-81
//create mock transactionArray
describe('atomFamilyHook', () => {
  const transactionArray = [
    {
      atomFamilyState: [
        {
          key: 'spec!alCh@rspec!alCh@r',
          family: 'familyName',
          value: 10,
          updated: true,
        },
      ],
      familyUpdates: [
        {
          key: 'familyUpdate1',
          value: 5,
          params: 'params',
        },
      ],
    },
  ]; // truthy

  const transactionArray2 = []; // falsy

  const truthyReturnStr = atomFamilyHook(transactionArray);
  const falsyReturnStr = atomFamilyHook(transactionArray2);

  it('should scrub special characters', () => {
    expect(truthyReturnStr).toEqual(expect.not.stringContaining('spec!alCh@r'));
  });

  it('should return empty string when transactionsArr length is falsy', () => {
    expect(falsyReturnStr).toBe('');
  });
});
