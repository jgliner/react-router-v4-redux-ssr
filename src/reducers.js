/*
  reducers.js

  Standard `redux` config
  This is the only place where the state can be altered.

  The server prepares this on a request as it applies to the matching
  route. From there, the state is configured and ready to go by the time
  the bundle reaches the client
*/

// StaticPageWithDataDeps view
function apiData(state = {}, action) {
  switch (action.type) {
    case 'SET_API_DATA':
      return action.apiData || state;
    default:
      return state;
  }
}

// StaticDataDepsParams view
function apiDataParams(state = [], action) {
  switch (action.type) {
    case 'SET_API_DATA_WITH_PARAMS':
      return action.apiDataParams || state;
    default:
      return state;
  }
}
function sortOrder(state = '', action) {
  switch (action.type) {
    case 'SET_API_DATA_SORT_ORDER':
      return action.sortOrder || state;
    default:
      return state;
  }
}

// DynamicPage view
function dynamicApiData(state = {}, action) {
  switch (action.type) {
    case 'SET_DYNAMIC_API_DATA':
      return action.dynamicApiData || state;
    default:
      return state;
  }
}

const reducers = {
  apiData,
  apiDataParams,
  sortOrder,
  dynamicApiData,
};

export default reducers;
