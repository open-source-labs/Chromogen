import { setFilter, output } from '../src/output/output.ts';

// testing setFilter function
describe('setFilter', () => {
  it('should remove setter keys from array of selector keys', () => {
    // create mock selectors array
    const selectors = ['one', 'two', 'three'];
    // create mock setters array
    const setters = ['one'];
    // store evaluated result of invoking setFilter on the mock data in an array
    const filtered = setFilter(selectors, setters);
    // verify that the info from setters caused a matching value to be removed from the selectors array ('one')
    expect(filtered).not.toContain('one');
  });
});

describe('output', () => {
  it('should return a string', () => {
    // create mock ledger object 
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
    // verify that type of mockLedger is a string after output function is invoked on it
    expect(typeof output(mockLedger)).toEqual('string');
  });
});
