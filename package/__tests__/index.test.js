import React from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { render } from '@testing-library/react';
import {
  ledger,
  atom,
  selector,
  atomFamily,
  selectorFamily,
  ChromogenObserver,
} from '../src/index.tsx';

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

describe('chromogenObserver', () => {
  global.URL = {
    createObjectURL: () => 'http://mockURL.com',
  };

  beforeEach(() => {
    console.error = jest.fn();

    const mockAtom = atom({ key: 'mockAtom', default: true });

    const MockComponent = () => {
      const [mock, setMock] = useRecoilState(mockAtom);

      return <button id="mock-button" onClick={() => setMock(!mock)} />;
    };

    render(
      <RecoilRoot>
        <ChromogenObserver />
        <MockComponent />
      </RecoilRoot>,
    );
  });

  it('should render a download link', () => {
    expect(document.getElementById('chromogen-download')).toBeTruthy();
  });

  it('should render two buttons by default', () => {
    expect(document.getElementById('chromogen-generate-file')).toBeTruthy();
    expect(document.getElementById('chromogen-toggle-record')).toBeTruthy();
  });

  it('should create a file URL on button click', () => {
    document.getElementById('chromogen-generate-file').click();
    const downloadLink = document.getElementById('chromogen-download');

    expect(downloadLink.getAttribute('href')).toBeTruthy();
  });

  it('should create transactions when state updates', () => {
    document.getElementById('mock-button').click();

    // Using Promise to get around async nature of Recoil transactions
    expect(
      new Promise((resolve) => setTimeout(() => resolve(ledger.transactions), 100)),
    ).resolves.toHaveLength(1);
  });
});
