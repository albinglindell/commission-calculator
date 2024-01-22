import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import DataProvider from './store/DataProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider>
    <Router>
      <App />
    </Router>
    </DataProvider>
  </React.StrictMode>
);

