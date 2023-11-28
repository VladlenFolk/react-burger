import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient, TOtherIngredient } from "../../types/types";

interface IConstructorState {
    bun: TIngredient | null ;
    otherIngredients?: TOtherIngredient[];
    isCount: boolean;
}

const initialState: IConstructorState = {
    bun: null,
    otherIngredients: [],
    isCount: false,
} 

const constructorSlice = createSlice({
    name: "constructorSlice",
    initialState,
    reducers: {
        addBun(state: IConstructorState, action: PayloadAction<TIngredient>){
            state.bun = action.payload;
        },
        addOtherIngredient(state: IConstructorState, action: PayloadAction<TOtherIngredient>){
            if (state.otherIngredients){
            state.otherIngredients = [action.payload, ...state.otherIngredients];
            }
        },
        deleteIngredient(state: IConstructorState, action: PayloadAction<TOtherIngredient> ){
            if (state.otherIngredients){
            state.otherIngredients = [...state.otherIngredients].filter(
                (item) => item.id !== action.payload.id
              );}
        },
        sortIngredients(state: IConstructorState, action: PayloadAction<{dragIndex: number; hoverIndex: number}> ){
            if (state.otherIngredients){
            const constructorArr = [...state.otherIngredients];
            const element = constructorArr[action.payload.dragIndex];
            constructorArr.splice(action.payload.dragIndex, 1) 
            constructorArr.splice(action.payload.hoverIndex, 0, element)
            state.otherIngredients = [...constructorArr]
            }
        },
        resetConstructor(state: IConstructorState){
            state.otherIngredients = [];
            state.bun = null;
        },
        countOpen(state: IConstructorState, action: PayloadAction){
            state.isCount = true;
        },
        countClose(state: IConstructorState, action: PayloadAction){
            state.isCount = false
        }
    }
})

export default constructorSlice.reducer;
export const {
    addBun,
    addOtherIngredient,
    deleteIngredient,
    sortIngredients,
    resetConstructor,
    countOpen,
    countClose
  } = constructorSlice.actions;