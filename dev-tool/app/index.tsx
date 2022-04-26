/* eslint-disable */
import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './Components/App';
/* eslint-enable */

// ReactDOM.render(<App />, document.getElementById('root'));

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <App/>
)