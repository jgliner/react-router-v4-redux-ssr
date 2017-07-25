import * as api from './mockApi.js';
import * as syncActions from './actions.js';

export function getApiData() {
  return (dispatch) => {
    return api.fetchFromApi()
      .then((res) => {
        dispatch(syncActions.setApiData(res));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
