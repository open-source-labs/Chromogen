import React from 'react';
import { createRoot } from'react-dom/client';
import App from './App';
import { HooksChromogenObserver } from 'chromog3n';

const root = createRoot(document.getElementById('root'));

root.render(
  <HooksChromogenObserver name="App">
    <App />
  </HooksChromogenObserver>
);
