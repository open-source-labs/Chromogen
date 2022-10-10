import React from 'react';
//import { RecoilRoot } from 'recoil';
import { ChromogenZustandObserver } from 'chromogen-zustand';
import TodoList from './TodoList';
// import * as selectors from '../store/store';
// import * as atoms from '../store/atoms';
import '../styles/styles.css';

const App = () => (
  <>
    <ChromogenZustandObserver />
    <TodoList />
  </>
);

export default App;
