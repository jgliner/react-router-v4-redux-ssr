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

export function setDynamicApiData(dynamicApiData) {
  return {
    type: 'SET_DYNAMIC_API_DATA',
    dynamicApiData,
  };
}
