import { ledger } from '../src/utils/ledger.ts';
import { atom, selector, selectorFamily, atomFamily } from '../src/api/api.ts';

describe('atom', () => {
  const { atoms } = ledger;
  it('is a function', () => {
    expect(typeof atom).toBe('function');
  });

  it('should update ledger upon invocation', () => {
    atom({
      key: 'exampleAtom',
      default: false,
    });
    expect(atoms).toHaveLength(1);
  });

  it('should create Recoil atom with correct key name', () => {
    expect(atoms[0]).toHaveProperty('key', 'exampleAtom');
  });
});

describe('selector', () => {
  const { selectors } = ledger;

  it('is a function', () => {
    expect(typeof selector).toBe('function');
  });

  it('should update ledger upon invocation', () => {
    selector({
      key: 'exampleSelector',
      get: () => 'getMethod',
      set: () => 'setMethod',
    });
    expect(selectors).toHaveLength(1);
  });

  it('should capture correct key name', () => {
    expect(selectors[0]).toEqual('exampleSelector');
  });
});

describe('atomFamily', () => {
  it('should return a function', () => {
    const familyFactory = atomFamily({ key: 'familyKey', default: (param) => param.toString() });

    expect(typeof familyFactory).toEqual('function');
  });
});

describe('selectorFamily', () => {
  it('should return a function', () => {
    const familyFactory = selectorFamily({
      key: 'familyKey',
      get: () => () => 'some value',
      set: () => () => undefined,
      default: (param) => param.toString(),
    });

    expect(typeof familyFactory).toEqual('function');
  });
});
