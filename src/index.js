import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Base from './containers/Base.js';

import configureStore from './store.js';

const initialState = window.INITIAL_STATE || {};
delete window.INITIAL_STATE;

const render = () => {
  const { history, store } = configureStore(initialState);
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
