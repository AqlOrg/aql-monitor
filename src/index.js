import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App.jsx';
import Readme from './components/Readme.jsx';
import '../public/scss/application.scss';

render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root'));
