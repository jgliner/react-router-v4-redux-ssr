export function setSelectedItem(selectedItem) {
  return {
    type: 'SET_SELECTED_ITEM',
    selectedItem,
  };
}

export function setApiData(apiData) {
  return {
    type: 'SET_API_DATA',
    apiData,
  };
}
