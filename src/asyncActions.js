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

export function getDynamicApiData(id) {
  return (dispatch) => {
    return api.fetchDynamicFromApi(id)
      .then((res) => {
        return dispatch(syncActions.setDynamicApiData(res));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
