import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import { MernStackEcApp } from './MernStackEcApp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MernStackEcApp />
    </BrowserRouter>
  </React.StrictMode>,
)
