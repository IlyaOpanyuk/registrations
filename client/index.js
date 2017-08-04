import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM  from 'react-dom';
import Routes from './routes/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Router>
        <Component />
      </Router>
    </AppContainer>,
    document.querySelector("#app")
  )
}

render(Routes);

if (module.hot) {
  module.hot.accept('./routes/Routes', () => {
    require('./routes/Routes');
    render(AppRouter);
  });
}