import React from 'react';
import { RecoilRoot } from 'recoil';
import { Provider } from '../../mock-package/Provider';
import TodoList from './TodoList';

const App = () => (
  <RecoilRoot>
    <Provider />
    <TodoList />
  </RecoilRoot>
);

export default App;
