// Global View

function selectedItem(state = 1, action) {
  switch (action.type) {
    case 'SET_SELECTED_ITEM':
      return action.selectedItem || state;
    default:
      return state;
  }
}

const reducers = {
  selectedItem,
};

export default reducers;
