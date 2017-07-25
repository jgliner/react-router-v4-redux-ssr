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

export function setDynamicApiData(dynamicApiData) {
  return {
    type: 'SET_DYNAMIC_API_DATA',
    dynamicApiData,
  };
}
