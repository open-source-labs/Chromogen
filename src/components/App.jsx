import React from 'react';
import { RecoilRoot } from 'recoil';
import { ChromogenObserver } from 'chromogen';
import TodoList from './TodoList';

const App = () => (
  <RecoilRoot>
    <ChromogenObserver />
    <TodoList />
  </RecoilRoot>
);

export default App;
