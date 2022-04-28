import React from 'react';
import { RecoilRoot } from 'recoil';
import { ChromogenObserver } from 'chromog3n';
import TodoList from './TodoList';
import * as selectors from '../store/store';
import * as atoms from '../store/atoms';

const App = () => (
  <RecoilRoot>
    <ChromogenObserver store={[selectors, atoms]} />
    <TodoList />
  </RecoilRoot>
);

export default App;
