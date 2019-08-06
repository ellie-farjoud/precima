import { SELECT_ITEM, UNSELECT_ITEM } from "../consts";

export function selectItem(item) {
  return { type: SELECT_ITEM, item };
}

export function unSelectItem() {
  return { type: UNSELECT_ITEM };
}
