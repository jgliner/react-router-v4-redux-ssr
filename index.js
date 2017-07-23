// Client rendering entry
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Base from './src/containers/Base.js';

import configureStore from './src/store.js';

const initialState = window.INITIAL_STATE || {};
delete window.INITIAL_STATE;

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

console.log('<-- IN client entrypoint -->', location);

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

if (module.hot) {
  module.hot.accept('./src/containers/Base.js', () => {
    console.log('HMR Accepted... Recompiling...');
  });
}
