import { combineReducers } from "@reduxjs/toolkit";
import wsSlice from './webSocketSlice'
import ingredientsSlice from "./ingredientsSlice";
import constructorSlice from "./constructorSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";
import windowSlice from "./windowSlice";

export const rootReducer = combineReducers({
  wsSlice,
  ingredientsSlice,
  constructorSlice,
  orderSlice,
  userSlice, 
  windowSlice
});
