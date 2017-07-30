/*
  asyncActions.js

  Uses redux `thunk` to dispatch events asynchronously
  Once a promise is resolved, the results are set synchronously in `/src/actions.js`
*/

import * as api from './mockApi.js';
import * as syncActions from './actions.js';

export function getApiData() {
  return (dispatch) => {
    return api.fetchFromApi()
      .then((res) => {
        return dispatch(syncActions.setApiData(res));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function getApiDataWithParams(params) {
  return (dispatch) => {
    return api.fetchFromApiWithParams(params)
      .then((res) => {
        // use a separate synchronous state - one of the many ways to check for updates
        // that may require fetching
        syncActions.setApiDataCurrentPage(params.page || 1);
        return dispatch(syncActions.setapiDataWithParams(res));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function getDynamicApiData(id) {
  return (dispatch) => {
    return api.fetchDynamicFromApi(id)
      .then((res) => {
        // inject route for state transitions - another one of the many ways to check for updates
        // that may require fetching
        res.id = id;
        return dispatch(syncActions.setDynamicApiData(res));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
