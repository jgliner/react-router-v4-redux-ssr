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
export function setapiDataWithParams(apiDataWithParams) {
  return {
    type: 'SET_API_DATA_WITH_PARAMS',
    apiDataWithParams,
  };
}
export function setApiDataCurrentPage(currentPage) {
  return {
    type: 'SET_API_DATA_CURRENT_PAGE',
    currentPage,
  };
}

// DynamicPage view
export function setDynamicApiData(dynamicApiData) {
  return {
    type: 'SET_DYNAMIC_API_DATA',
    dynamicApiData,
  };
}
