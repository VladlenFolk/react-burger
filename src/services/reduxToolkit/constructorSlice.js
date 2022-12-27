import { createSlice } from "@reduxjs/toolkit";

const constructorSlice = createSlice({
    name: "tabSlice",
    initialState:{
        bun: [],
        otherIngredients: [],
    },
    reducers: {
        addBun(state, action){
            state.bun = action.payload;
        },
        addOtherIngredient(state, action){
            state.otherIngredients = [action.payload, ...state.otherIngredients];
        },
        deleteIngredient(state, action){
            state.otherIngredients = [...state.otherIngredients].filter(
                (item) => item.id !== action.payload.id
              );
        },
        sortIngredients(state, action){
            const constructorArr = [...state.otherIngredients];
            constructorArr.splice(
                action.payload.dragIndex,
                0,
                constructorArr.splice(action.payload.hoverIndex, 1)[0]
              );
              state.otherIngredients = [...constructorArr]
        },
        resetConstructor(state){
            state.otherIngredients = [];
            state.bun = [];
        }
    }
})

export default constructorSlice.reducer;
export const {
    addBun,
    addOtherIngredient,
    deleteIngredient,
    sortIngredients,
    resetConstructor
  } = constructorSlice.actions;