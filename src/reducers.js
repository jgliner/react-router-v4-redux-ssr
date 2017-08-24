function apiData(state = {}, action) {
  switch (action.type) {
    case 'SET_API_DATA':
      return action.apiData || state;
    default:
      return state;
  }
}

function apiDataWithParams(state = {}, action) {
  switch (action.type) {
    case 'SET_API_DATA_WITH_PARAMS':
      return action.apiDataWithParams || state;
    default:
      return state;
  }
}
function currentPage(state = 1, action) {
  switch (action.type) {
    case 'SET_API_DATA_CURRENT_PAGE':
      return action.currentPage || state;
    default:
      return state;
  }
}

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
  apiDataWithParams,
  currentPage,
  dynamicApiData,
};

export default reducers;
