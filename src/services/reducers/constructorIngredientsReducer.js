import {
  ADD_BUNS,
  ADD_OTHER_INGREDIENTS,
  DELETE_CONSTRUCTOR_INGREDIENT,
  SORT_INGREDIENTS,
  RESET_CONSTRUCTOR
} from "../actions/constructor";

const initialState = {
  bun: [],
  otherIngredients: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUNS:
      return {
        ...state,
        bun: action.bun,
      };
    case ADD_OTHER_INGREDIENTS:
      return {
        ...state,
        otherIngredients: [action.otherIngredients, ...state.otherIngredients],
      };
    case DELETE_CONSTRUCTOR_INGREDIENT:
      return {
        ...state,
        otherIngredients: [...state.otherIngredients].filter(
          (item) => item.id !== action.id
        ),
      };
    case SORT_INGREDIENTS: {
      const constructorArr = [...state.otherIngredients];
      constructorArr.splice(
        action.data.dragIndex,
        0,
        constructorArr.splice(action.data.hoverIndex, 1)[0]
      );
      return {
        ...state,
        otherIngredients: constructorArr,
      };
    }
    case RESET_CONSTRUCTOR:
      return {
        ...state,
        otherIngredients: [],
        bun: []
      };
    default:
      return state;
  }
};