import React from 'react';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { atom, selector, readables, writeables, ChromogenObserver } from './index';

describe('selectors', () => {
  it('the selectors exist', () => {
    expect(selector).toBeDefined();
  });

  it('selector is a function', () => {
    expect(typeof selector).toBe('function');
  });

  it('readable array gets updated from selector invocation', () => {
    selector({
      key: 'demoOne',
      get: ({ get }) => 'hello world',
      set: ({ get, set }) => 'setmethod',
    });
    expect(readables).toHaveLength(1);
  });

  it('selector in readable array has the correct key string', () => {
    expect(readables[0]).toHaveProperty('key', 'demoOne');
  });
});

describe('atom', () => {
  it('the atom exist', () => {
    expect(atom).toBeDefined();
  });

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

  it('atom in writeable array has the correct key string', () => {
    expect(writeables[0]).toHaveProperty('key', 'demoTwo');
  });
});

describe('chromogenObserver', () => {
  it('expect it to render two buttons', () => {
    render(
      <RecoilRoot>
        <ChromogenObserver />
      </RecoilRoot>,
    );
    expect(document.getElementsByTagName('button')).toHaveLength(2);
  });
});
