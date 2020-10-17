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
    // creating a mockAtom
    const mockAtom = atom({ key: 'mockAtom', default: true });
    // create a functional mockComponent 
    const MockComponent = () => {
      // declaring a React Hook using mockAtom as recoilState
      const [mock, setMock] = useRecoilState(mockAtom);
      // render a mock-button that toggles mock recoilState onclick
      return <button id="mock-button" type="button" onClick={() => setMock(!mock)} />;
    };

    render(
      <RecoilRoot>
        <ChromogenObserver />
        <MockComponent />
      </RecoilRoot>,
    );
  });

  // ChromogenObserver lines 25-36
  it('should relay messages to DevTool', () => {

  });

  // ChromogenObserver lines 56-80
  // Store contains atoms and selectors
  it('should update storeMap with all items from passed in store', () => {
    
  })

  // ChromogenObserver lines 104-117
  it('should ', () => {

  })

  // ChromogenObserver lines 142-145
  it('should ', () => {

  })

  // ChromogenObserver lines 154-155
  it('should change button color on mouse enter/leave', () => {
    
  })

  it('should render a download link', () => {
    // verify that download Chromogen tests link exists and is being rendered
    expect(document.getElementById('chromogen-download')).toBeTruthy();
  });

  it('should render two buttons by default', () => {
    // verify that generate-file and record buttons are being rendered
    expect(document.getElementById('chromogen-generate-file')).toBeTruthy();
    expect(document.getElementById('chromogen-toggle-record')).toBeTruthy();
  });

  it('should create a file URL on button click', () => {
    // invoking a click on generate-file button
    document.getElementById('chromogen-generate-file').click();
    // declaring a const downloadLink referencing hidden download link
    const downloadLink = document.getElementById('chromogen-download');
    // verify that download link has a URL that is being referenced
    expect(downloadLink.getAttribute('href')).toBeTruthy();
  });

  it('should create transactions when state updates', () => {
    // invoking a click to check that state in mock-button is being toggled (in the state mock)
    document.getElementById('mock-button').click();

    // Using Promise to get around async nature of Recoil transactions
    expect(
      // verifying that resolve (mockData) has been added to ledger.transactions
      new Promise((resolve) => setTimeout(() => resolve(ledger.transactions), 100)),
      // verify that resolve property on promise object has been updated
    ).resolves.toHaveLength(1);
  });
});
