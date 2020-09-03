import React from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { render } from '@testing-library/react';
import { ChromogenObserver } from '../src/component/ChromogenObserver.tsx';
import { ledger } from '../src/utils/ledger.ts';
import { atom } from '../src/api/api.ts';

describe('chromogenObserver', () => {
  global.URL = {
    createObjectURL: () => 'http://mockURL.com',
  };

  beforeEach(() => {
    console.error = jest.fn();

    const mockAtom = atom({ key: 'mockAtom', default: true });

    const MockComponent = () => {
      const [mock, setMock] = useRecoilState(mockAtom);

      return <button id="mock-button" type="button" onClick={() => setMock(!mock)} />;
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
