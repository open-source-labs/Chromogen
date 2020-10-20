import React from 'react';
import { RecoilRoot } from 'recoil';
import { HooksChromogenObserver } from 'chromogen';
import TodoList from './TodoList';
// import * as selectors from '../store/store';
// import * as atoms from '../store/atoms';

const App = () => (
  <RecoilRoot>
    <HooksChromogenObserver /*store={[selectors, atoms]}*/ />
    <TodoList />
  </RecoilRoot>
);

export default App;
