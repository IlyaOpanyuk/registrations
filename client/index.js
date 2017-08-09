import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.scss';

ReactDOM.render(
  <Router>
    <Routes />
  </Router>,
  document.querySelector("#app")
);