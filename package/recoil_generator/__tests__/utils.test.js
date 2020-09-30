import { debounce, convertFamilyTrackerKeys } from '../src/utils/utils.ts';

jest.useFakeTimers();

describe('debounce', () => {
  it('should return a new function', () => {
    const inputFunction = () => 'example';
    const outputFunction = debounce(inputFunction, 0);

    expect(typeof outputFunction).toBe('function');

    expect(outputFunction).not.toBe(inputFunction);
  });

  it('should limit consecutive calls', () => {
    let count = 0;
    const increment = debounce(() => {
      count += 1;
    }, 100);

    increment();
    increment();
    jest.advanceTimersByTime(101);

    expect(count).toEqual(1);
  });
});

describe('convertFamilyTrackerKeys', () => {
  it('should update key names if in map', () => {
    const newTracker = convertFamilyTrackerKeys(
      { keyOne: 'some value' },
      new Map([['keyOne', 'keyUpdated']]),
    );

    expect(newTracker).toHaveProperty('keyUpdated');

    expect(newTracker).not.toHaveProperty('keyOne');
  });

  it('should preserve key names not in map', () => {
    const newTracker = convertFamilyTrackerKeys(
      { keyOne: 'some value' },
      new Map([['keyTwo', 'keyNotUpdated']]),
    );

    expect(newTracker).toHaveProperty('keyOne');

    expect(newTracker).not.toHaveProperty('keyTwo');
  });
});
