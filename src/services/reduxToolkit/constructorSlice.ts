import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../../types/types";

interface IOtherIngredient {
    item: IIngredient,
    id: string
}

interface IConstructorState {
    bun: IIngredient | [];
    otherIngredients?: IOtherIngredient[] | [];
}

const initialState = {
    bun: [],
    otherIngredients: [],
} as IConstructorState


const constructorSlice = createSlice({
    name: "tabSlice",
    initialState,
    reducers: {
        addBun(state: IConstructorState, action: PayloadAction<IIngredient>){
            state.bun = action.payload;
        },
        addOtherIngredient(state: IConstructorState, action: PayloadAction<IOtherIngredient>){
            if (state.otherIngredients){
            state.otherIngredients = [action.payload, ...state.otherIngredients];
            }
        },
        deleteIngredient(state: IConstructorState, action: PayloadAction<IOtherIngredient> ){
            if (state.otherIngredients){
            state.otherIngredients = [...state.otherIngredients].filter(
                (item) => item.id !== action.payload.id
              );}
        },
        sortIngredients(state: IConstructorState, action: PayloadAction<{dragIndex: number; hoverIndex: number}> ){
            if (state.otherIngredients){
            const constructorArr = [...state.otherIngredients];
            constructorArr.splice(
                action.payload.dragIndex,
                0,
                constructorArr.splice(action.payload.hoverIndex, 1)[0]
              );
              state.otherIngredients = [...constructorArr]
            }
        },
        resetConstructor(state: IConstructorState){
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