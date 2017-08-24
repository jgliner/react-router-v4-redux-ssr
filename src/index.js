import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Base from './containers/Base.js';

import configureStore from './store.js';

const render = () => {
  const { history, store } = configureStore();

  ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Base />
      </ConnectedRouter>
    </Provider>
    ),
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./containers/Base.js', () => { render() });
}
