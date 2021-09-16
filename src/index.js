import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import '@elastic/eui/dist/eui_theme_light.css';
import App from './components/App/App';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
