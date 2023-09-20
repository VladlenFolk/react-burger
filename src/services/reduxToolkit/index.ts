import { combineReducers } from "@reduxjs/toolkit";
import wsSlice from './webSocketSlice'
import tabSlice from "./tabSlice";
import ingredientsSlice from "./ingredientsSlice";
import constructorSlice from "./constructorSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";
import windowSlice from "./windowSlice";

export const rootReducer = combineReducers({
  tab: tabSlice,
  wsSlice,
  ingredientsSlice,
  constructorSlice,
  orderSlice,
  userSlice, 
  windowSlice
});
