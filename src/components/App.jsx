import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import TodoList from './TodoList';

const App = () => {
  return (
  <RecoilRoot>
  <TodoList/>
  </RecoilRoot>
  )
};

export default App;
