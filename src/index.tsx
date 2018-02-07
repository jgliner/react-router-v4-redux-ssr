/*
  index.ts

  This is the main entrypoint for the client.
  In other words, this is the first thing that is read
  when the client receives the bundle
*/

import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Base from './containers/Base';

import configureStore from './store';

declare global {
  interface Window {
    __DEV__: string;
    __PROD__: string;
    __PRELOADED_STATE__: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    INITIAL_STATE: any;
    devToolsExtension: Function;
  }
}
// the initial state configured on the server is sent through
// the `window` object before the bundle to make sure it doesn't get blocked
const initialState = window.INITIAL_STATE || {};
// once this gets loaded in, garbage collect the old `window` state
delete window.INITIAL_STATE;

const render = () => {
  // look familiar?
  // this is exactly what the server did before sending the bundle.
  // this time, though, there IS an initial state
  const { history, store } = configureStore(initialState, false);

  // from here, the client can init its own redux instance for further client-side reqs
  // this may seem repetitive, but redux will not double-render, since
  // the state technically did not change

  // for more detail, open /src/containers/Base.ts
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
