/** *****************************************************
 * Normal Actions
 * === These perform actions from `dispatch()` and are
 *     the ONLY way to modify the Redux state tree  ===
 * ************************************************** */

// Global View
export function setSelectedItem(selectedItem) {
  return {
    type: 'SET_SELECTED_ITEM',
    selectedItem,
  };
}
