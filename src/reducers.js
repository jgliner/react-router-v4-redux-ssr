// Global View

function selectedItem(state = 1, action) {
  switch (action.type) {
    case 'SET_SELECTED_ITEM':
      return action.selectedItem || state;
    default:
      return state;
  }
}

function apiData(state = {}, action) {
  switch (action.type) {
    case 'SET_API_DATA':
      return action.apiData || state;
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
  selectedItem,
  apiData,
  dynamicApiData,
};

export default reducers;
