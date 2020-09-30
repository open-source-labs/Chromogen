import { ledger } from '../src/utils/ledger.ts';
import { atom, selector, selectorFamily, atomFamily } from '../src/api/api.ts';

// testing the atom
describe('atom', () => {
  // destructuring atoms from ledger interface in utils folder
  const { atoms } = ledger;
  it('is a function', () => {
    expect(typeof atom).toBe('function');
  });

  it('should update ledger upon invocation', () => {
    // creating a mock atom
    atom({
      key: 'exampleAtom',
      default: false,
    });
    // verifying atoms property (array) on ledger has been updated with input atom
    expect(atoms).toHaveLength(1);
  });

  it('should create Recoil atom with correct key name', () => {
    // verifying that input atom key matches 'exampleAtom'
    expect(atoms[0]).toHaveProperty('key', 'exampleAtom');
  });
});

describe('selector', () => {
  // destructuring selectors from ledger object in utils folder
  const { selectors } = ledger;

  it('is a function', () => {
    // verify selector is a function
    expect(typeof selector).toBe('function');
  });

  it('should update ledger upon invocation', () => {
    // creating a mock selector with key, get, set
    selector({
      key: 'exampleSelector',
      get: () => 'getMethod',
      set: () => 'setMethod',
    });
    // verify selectors property in ledger has been updated with mock selector
    expect(selectors).toHaveLength(1);
  });
  // verifying that input selector key matches 'exampleSelector'
  it('should capture correct key name', () => {
    expect(selectors[0]).toEqual('exampleSelector');
  });
});

describe('atomFamily', () => {
  it('should return a function', () => {
    // create a mock atomFamily
    const familyFactory = atomFamily({
      key: 'familyKey',
      default: (param) => param.toString(),
    });
    // verify that familyFactory is a function
    expect(typeof familyFactory).toEqual('function');
  });
});

describe('selectorFamily', () => {
  it('should return a function', () => {
    // create a mock selectorFamily
    const familyFactory = selectorFamily({
      key: 'familyKey',
      get: () => () => 'some value',
      set: () => () => undefined,
      default: (param) => param.toString(),
    });
    // verify that familyFactory is a function
    expect(typeof familyFactory).toEqual('function');
  });
});
