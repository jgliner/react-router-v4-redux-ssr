/*
  reducers.js

  Standard `redux` config
  This is the only place where the state can be altered.

  The server prepares this on a request as it applies to the matching
  route. From there, the state is configured and ready to go by the time
  the bundle reaches the client
*/

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
  apiData,
  dynamicApiData,
};

export default reducers;
