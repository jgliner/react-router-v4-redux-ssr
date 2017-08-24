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
        dispatch(syncActions.setapiDataWithParams(res));
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
      .then((res) => {
        res.id = id;
        return dispatch(syncActions.setDynamicApiData(res));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
