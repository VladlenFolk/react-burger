import { combineReducers } from "@reduxjs/toolkit";
import { user } from "./userReducer";
import wsSlice from '../reduxToolkit/webSocketSlice'
import tabSlice from "../reduxToolkit/tabSlice";
import ingredientsSlice from "../reduxToolkit/ingredientsSlice";
import constructorSlice from "../reduxToolkit/constructorSlice";
import orderSlice from "../reduxToolkit/orderSlice";

export const rootReducer = combineReducers({
  tab: tabSlice,
  user,
  wsSlice,
  ingredientsSlice,
  constructorSlice,
  orderSlice
});
