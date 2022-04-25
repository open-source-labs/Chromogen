/* eslint-disable */
import React from 'react';
import { createRoot } from'react-dom/client';
import App from './Components/App';
/* eslint-enable */

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <App />
)
//ReactDOM.render(<App />, document.getElementById('root'));
