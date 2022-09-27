import React from 'react';
//import { RecoilRoot } from 'recoil';
import { ChromogenObserver } from 'chromogen-zustand';
import TodoList from './TodoList';
// import * as selectors from '../store/store';
// import * as atoms from '../store/atoms';

const App = () => (
    <>
        <ChromogenObserver />
        <TodoList />
    </>
);

export default App;
