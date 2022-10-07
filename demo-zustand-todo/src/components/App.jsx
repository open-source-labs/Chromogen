import React from 'react';
import { ChromogenZustandObserver } from 'chromogen-zustand';
import TodoList from './TodoList';

const App = () => (
  <>
    <ChromogenZustandObserver />
    <TodoList />
  </>
);

export default App;
