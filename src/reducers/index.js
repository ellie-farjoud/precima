import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import itemsReducer from "./itemsReducer";
import itemDetailReducer from "./itemDetailReducer";

export default combineReducers({
  items: itemsReducer,
  selectedItem: itemDetailReducer,
  form: formReducer
});
