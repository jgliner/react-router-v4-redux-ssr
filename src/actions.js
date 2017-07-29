/*
  actions.js

  Standard `redux` config, dispatches actions for updating the state tree
*/

export function setApiData(apiData) {
  return {
    type: 'SET_API_DATA',
    apiData,
  };
}

export function setApiDataParams(apiDataParams) {
  return {
    type: 'SET_API_DATA_WITH_PARAMS',
    apiDataParams,
  };
}

export function setDynamicApiData(dynamicApiData) {
  return {
    type: 'SET_DYNAMIC_API_DATA',
    dynamicApiData,
  };
}
