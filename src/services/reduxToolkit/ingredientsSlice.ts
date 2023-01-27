import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../utils/api";
import {TIngredient} from '../../types/types';

interface ISliceState  {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

const initialState: ISliceState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
}

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await getData();
    return response.data;
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsRequest = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = false;
        state.ingredients = state.ingredients.concat(action.payload);
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
      });
  },
});

export default ingredientsSlice.reducer;