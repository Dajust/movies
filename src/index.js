// node modules
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// app modules
import App from './components/app.js';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
