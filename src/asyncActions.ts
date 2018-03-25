/*
  asyncActions.ts

  Uses redux `thunk` to dispatch events asynchronously
  Once a promise is resolved, the results are set synchronously in `/src/actions.ts`
*/

// import { Param } from './models/param';

import * as api from './mockApi';
import * as syncActions from './actions';

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

        // set data
        dispatch(syncActions.setapiDataWithParams(res));
        // update page
        dispatch(syncActions.setApiDataCurrentPage(+params.page || 1));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function getDynamicApiData(id) {
  return (dispatch) => {
    return api.fetchDynamicFromApi(id)
      .then((res: any) => {
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
