import React from 'react';
import { render } from 'react-dom';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { HooksChromogenObserver } from '../../package/hooks_generator/hooks_src/component/HooksChromogenObserver.tsx';

render(
  <HooksChromogenObserver name="App">
    <App />
  </HooksChromogenObserver>
, document.getElementById('app'),
);
