import { ADD_ITEM, EDIT_ITEM, REMOVE_ITEM, TOGGLE_PURCHASE } from "../consts";

/*
 * action creators
 */
let nextItemId = 0;

export function addItem(item) {
  return { type: ADD_ITEM, id: nextItemId++, ...item };
}

export function editItem(item) {
  return { type: EDIT_ITEM, item };
}

export function removeItem(id) {
  return { type: REMOVE_ITEM, id };
}
export function togglePurchase(itemId) {
  return { type: TOGGLE_PURCHASE, itemId };
}
