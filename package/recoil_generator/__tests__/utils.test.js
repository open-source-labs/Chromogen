import { debounce, convertFamilyTrackerKeys } from '../src/utils/utils.ts';

jest.useFakeTimers();

describe('debounce', () => {
  it('should return a new function', () => {
    // declare mock function that returns a string
    const inputFunction = () => 'example';
    // declare a function that stores the evaluated result of invoking debounce on inputFunction with a wait time of 0s
    const outputFunction = debounce(inputFunction, 0);
    // verify that outputFunction is a function
    expect(typeof outputFunction).toBe('function');
    // verify that that the 'debounced function' (outputFunction) is different than the parameter function (inputFunction)
    expect(outputFunction).not.toBe(inputFunction);
  });

  it('should limit consecutive calls', () => {
    // increment count to 1 after 100ms
    let count = 0;
    const increment = debounce(() => {
      count += 1;
    }, 100);
    // invoke increment twice
    increment();
    increment();
    // advance timer to 101ms using a mock jest function
    jest.advanceTimersByTime(101);
    // verify that count only incremented once because it was debounced
    expect(count).toEqual(1);
  });
});

// testing convertFamilyTrackerKeys
describe('convertFamilyTrackerKeys', () => {
  it('should update key names if in map', () => {
    // create mock tracker (object)
    const newTracker = convertFamilyTrackerKeys(
      // first parameter is an object with a property whose value is a string
      { keyOne: 'some value' },
      // second parameter is a new Map 
      new Map([['keyOne', 'keyUpdated']]),
    );
    // verify that newTracker object includes property from Map (keyUpdated)
    expect(newTracker).toHaveProperty('keyUpdated');
    // verify that newTracker did not update key name with first parameter
    expect(newTracker).not.toHaveProperty('keyOne');
  });

  it('should preserve key names if not in map', () => {
    // create mock tracker (object)
    const newTracker = convertFamilyTrackerKeys(
      { keyOne: 'some value' },
      new Map([['keyTwo', 'keyNotUpdated']]),
    );
    // verify that newTracker's first parameter has been preserved
    expect(newTracker).toHaveProperty('keyOne');
    // verify that newTracker does have keyTwo in first parameter
    expect(newTracker).not.toHaveProperty('keyTwo');
  });
});
