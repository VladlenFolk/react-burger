import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../../utils/api";

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState:{
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFailed: false,
    },
    reducers: {
      getIngredientsRequest(state){
        state.ingredientsRequest = true
      },
      getIngredientsSuccess(state, action) {
        state.ingredientsRequest = false;
        state.ingredientsFailed = false;
        state.ingredients = action.payload;
      },
      getIngredientsFailed(state){
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
      },
    }
})



export function getIngredients() {
    return function (dispatch) {
      dispatch(getIngredientsRequest());
      getData()
        .then((res) => {
          if (res && res.success) {
            dispatch(getIngredientsSuccess(res.data));
          } else {
            dispatch(getIngredientsFailed());
          }
        })
        .catch(() => {
          dispatch(getIngredientsFailed());
        });
    };
  }

export default ingredientsSlice.reducer;
export const {
    getIngredientsRequest,
    getIngredientsSuccess,
    getIngredientsFailed,
} = ingredientsSlice.actions