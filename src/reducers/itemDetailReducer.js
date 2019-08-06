import { SELECT_ITEM, UNSELECT_ITEM } from "../consts";

/**
 * Reducer to Select or Deselect an item
 */

const itemDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      return { ...action.item };

    case UNSELECT_ITEM:
      return {};
    default:
      return state;
  }
};

export default itemDetailReducer;
