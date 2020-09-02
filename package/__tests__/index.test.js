import React from 'react';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { atom, selector, ledger, ChromogenObserver } from '../src/index.tsx';

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

describe('chromogenObserver', () => {
  it('should render a download link', () => {
    render(
      <RecoilRoot>
        <ChromogenObserver />
      </RecoilRoot>,
    );
    expect(document.getElementsByTagName('a')).toHaveLength(1);
  });
});
