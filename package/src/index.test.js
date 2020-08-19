/* test objectives: 

1. check the placeholders to be empty and declared
  - writeables
  - readables
  - snapshots
  - initialRedner

2. States functions
  - selector 
    - config with key get set
  - atom

3. ChromogenObserver

4. return
  - 2 buttons
  - 1 a tag for downloading test file
*/

/* react recoil testing library example 
Tasks
1. create a hook encorporates with dummy atoms and selectors
2. check our atoms and selectors functionality by using the dummies


describe('useRecoilCounter', () => {
  it('returns the default count value', () => {
    const { result } = renderRecoilHook(useRecoilTestHook);
    expect(result.current.count).toBe(0);
  });
 
  it('updates the counter when increment is called', () => {
    const { result } = renderRecoilHook(useRecoilTestHook);
 
    act(() => {
      result.current.increment();
    });
 
    expect(result.current.count).toBe(1);
  // });

*/

// index.js
// conorose approach
/* require selectors and atoms from index.js 
use it to create atoms and selectors and check if they working properly

*/
import React from 'react';
import renderer from 'react-test-renderer';
import { atom, selector, readables, writeables, ChromogenObserver } from './index.js';

describe('selectors', () => {
  it('the selectors exist', () => {
    expect(selector).toBeDefined();
  });
  it('selector is a function', () => {
    expect(typeof selector).toBe('function');
  });
  // without a key, no big deal
  // without a get, recoil will throw
  it('readable array gets updated from selector invocation', () => {
    selector({
      key: 'demoOne',
      get: ({ get }) => 'hello world',
      set: ({ get, set }) => 'setmethod',
    });
    expect(readables).toHaveLength(1);
  });
  it('selector in readable array has the correct key string', () => {
    expect(readables[0].key).toBe('demoOne');
  });

  // it ('Raise an error if config does not consist get', () => {
  //   console.error = msg => { throw new Error(msg); };
  //   expect(()=> {
  //     selector()
  //   }).toThrow();
  //   expect(()=> {
  //     selector({ key: 'hello'})
  //   }).toThrow();
  // })

  // it ('Raise an error if config does not consist key', () => {
  //   expect(()=> {
  //     selector()
  //   }).toThrow();
  //   expect(()=> {
  //     selector({ get: ({get}) => {
  //       return 'hello world';
  //     }})
  //   }).toThrow();
  // })

  // config pass in, return value is a instance of recoil
  // check recoil selector types based on the config being passed in.
  // raise error if config is incorrect format type
});

describe('atom', () => {
  it('atom is a function', () => {
    expect(typeof atom).toBe('function');
  });
  it('writeable array gets update from atom invocation', () => {
    atom({
      key: 'demoTwo',
      default: false,
    });
    expect(writeables).toHaveLength(1);
  });
  it('Atoms in writeable array has the correct key string', () => {
    expect(writeables[0]).toHaveProperty('key', 'demoTwo');
  });
});

describe('chromogenObserver', () => {
  // <renderRecoil><ChromogenObserver /></renderRecoil>
  // it('snapshot renders', () => {
  //   const component = renderer.create(<ChromogenObserver />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  // console.log(document.getElementsByClassName('buttons').length);
  // it('provider component has 2 buttons rendered successfully', () => {
  //   expect(document.querySelectorAll('a')).length.toEqual(1);
  // });
});
