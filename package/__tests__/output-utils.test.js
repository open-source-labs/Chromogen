import {
  initializeAtoms,
  assertState,
  testSelectors,
  testSetters,
} from '../src/output/output-utils.ts';

describe('initializeAtoms', () => {
  const atomUpdate = {
    key: 'testAtom',
    value: 2,
    previous: 1,
    updated: true,
  };

  it('should set correct atom value if current is true', () => {
    const returnString = initializeAtoms([atomUpdate], true);

    expect(returnString).toEqual(
      expect.stringContaining(`result.current.set${atomUpdate.key}(${atomUpdate.value})`),
    );
  });

  it('should set correct atom value if current is false', () => {
    const returnString = initializeAtoms([atomUpdate], false);

    expect(returnString).toEqual(
      expect.stringContaining(`result.current.set${atomUpdate.key}(${atomUpdate.previous})`),
    );
  });
});

describe('assertState', () => {
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
    const returnString = assertState(selectorUpdates);

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

describe('testSelectors', () => {
  it('should scrub special characters from key names', () => {
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

    expect(returnString).toEqual(expect.not.stringContaining('spec!alCh@r'));
  });
});

describe('testSetters', () => {
  it('should scrub special characters from params', () => {
    const returnString = testSetters([
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
    ]);

    expect(returnString).toEqual(expect.not.stringContaining('spec!alCh@r'));
  });
});
