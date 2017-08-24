import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

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
  const initializedRouterMW = routerMiddleware(history);
  const middleware = composeWithDevTools(applyMiddleware(initializedRouterMW, thunk));

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
