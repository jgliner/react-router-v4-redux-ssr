/*
  actions.js

  Standard `redux` config, dispatches actions for updating the state tree
*/

// StaticPageWithDataDeps view
export function setApiData(apiData) {
  return {
    type: 'SET_API_DATA',
    apiData,
  };
}

// StaticDataDepsParams view
export function setApiDataParams(apiDataParams) {
  return {
    type: 'SET_API_DATA_WITH_PARAMS',
    apiDataParams,
  };
}
export function setApiDataSortOrder(sortOrder) {
  return {
    type: 'SET_API_DATA_SORT_ORDER',
    sortOrder,
  };
}

// DynamicPage view
export function setDynamicApiData(dynamicApiData) {
  return {
    type: 'SET_DYNAMIC_API_DATA',
    dynamicApiData,
  };
}
