import { combineReducers } from "@reduxjs/toolkit";
import { tabReducer } from "./tab";
import { ingredients } from "./ingredients";
import { constructorReducer } from "./constructorIngredientsReducer";
import { orderReducer } from "./order";
import { ingredientInfoReducer } from "./ingredientsInfoReducer";
import { user } from "./userReducer";
import wsSlice from '../reduxToolkit/webSocketSlice'



export const rootReducer = combineReducers({
  tab: tabReducer,
  ingredients,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  ingredientInfo: ingredientInfoReducer,
  user,
  wsSlice,
});
