import { setFilter, output } from '../src/output/output.ts';

describe('setFilter', () => {
  it('should remove setter keys from array of selector keys', () => {
    const selectors = ['one', 'two', 'three'];
    const setters = ['one'];
    const filtered = setFilter(selectors, setters);

    expect(filtered).not.toContain('one');
  });
});

describe('output', () => {
  it('should return a string', () => {
    const mockLedger = {
      atoms: [],
      selectors: [],
      setters: [],
      atomFamilies: [],
      selectorFamilies: [],
      initialRender: [],
      initialRenderFamilies: [],
      transactions: [],
      setTransactions: [],
    };

    expect(typeof output(mockLedger)).toEqual('string');
  });
});
