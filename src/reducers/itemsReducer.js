import { ADD_ITEM, EDIT_ITEM, REMOVE_ITEM, TOGGLE_PURCHASE } from "../consts";

/**
 * Reducer to Add, edit , remove and purchase toggle
 */

const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          ...action
        }
      ];
    case EDIT_ITEM:
      return state.map(item => {
        if (item.id === action.item.id) {
          return Object.assign(
            {},
            {
              ...action.item
            }
          );
        }
        return item;
      });

    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.id);

    case TOGGLE_PURCHASE:
      return state.map(item => {
        if (item.id === action.id) {
          return Object.assign({}, item, {
            purchased: !action.purchased
          });
        }
        return item;
      });
    default:
      return state;
  }
};

export default itemsReducer;
