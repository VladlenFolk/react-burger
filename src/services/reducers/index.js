import { combineReducers } from 'redux';
import { tabReducer } from './tab';
import { ingredients } from './ingredients';
import { constructorReducer } from './constructorIngredientsReducer';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    tab: tabReducer,
    ingredients,
    burgerConstructor: constructorReducer,
    order: orderReducer
}); 