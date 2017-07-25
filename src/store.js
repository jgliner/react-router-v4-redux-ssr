import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

import reducers from './reducers';

export default function configureStore(initialState = {}, fromServer) {
  let history;

  if (fromServer) {
    history = createMemoryHistory();
  }
  else {
    history = createBrowserHistory();
  }

  const browserMiddleware = routerMiddleware(history);
  const middleware = process.env.NODE_ENV === 'development' ?
    composeWithDevTools(applyMiddleware(browserMiddleware)) :
    applyMiddleware(browserMiddleware);

  const store = createStore(combineReducers({
    ...reducers,
    router: routerReducer,
  }), initialState, middleware);

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      console.log('HMR Reducers Accepted');
      module.hot.accept('./reducers', () => store.replaceReducer(require('./reducers')));
    }
  }
  return { history, store };
}
