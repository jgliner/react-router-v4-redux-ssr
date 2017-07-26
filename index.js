/*
  index.js

  This is the main entrypoint for the client.
  In other words, this is the first thing that is read
  when the client receives the bundle
*/

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Base from './src/containers/Base.js';

import configureStore from './src/store.js';

// the initial state configured on the server is sent through
// the `window` object before the bundle to make sure it doesn't get blocked
const initialState = window.INITIAL_STATE || {};
// once this gets loaded in, garbage collect the old `window` state
delete window.INITIAL_STATE;

const render = () => {
  // look familiar?
  // this is exactly what the server did before sending the bundle.
  // this time, though, there IS an initial state
  const { history, store } = configureStore(initialState);

  // from here, the client can init its own redux instance for further client-side reqs
  // this may seem repetitive, but redux will not double-render, since
  // the state technically did not change

  // for more detail, open /src/containers/Base.js
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
