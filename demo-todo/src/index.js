/* eslint-disable react/jsx-filename-extension */
import React from 'react';
//import { render } from 'react-dom';
import App from './components/App';
import { createRoot } from'react-dom/client';

const root = createRoot(document.getElementById('app'));

root.render(
    <App />
);
