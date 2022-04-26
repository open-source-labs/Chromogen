import React from 'react';
import TodoList from './containers/TodoList';
import MainContainer from './containers/MainContainer';
import './styles.css';

function App () {
  return(
    <div>
    {/* <AffirmContainer /> */}
    <MainContainer />
    <TodoList />
    </div>
  );
};

export default App;