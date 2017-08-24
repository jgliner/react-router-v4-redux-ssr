import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import createBrowserHistory from 'history/createBrowserHistory';

import reducers from './reducers';

export default function configureStore() {
  let history;
  history = createBrowserHistory();

  const middleware = applyMiddleware(thunk);

  const store = createStore(combineReducers({
    ...reducers,
    router: routerReducer,
  }), middleware);

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      console.log('HMR Reducers Accepted');
      module.hot.accept('./reducers', () => store.replaceReducer(require('./reducers')));
    }
  }
  return { history, store };
}
