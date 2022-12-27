import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name: "tabSlice",
    initialState:{
        tab: 'one'
    },
    reducers: {
        chooseBun(state){
            state.tab = 'one';
        },
        chooseSauce(state){
            state.tab = 'two';
        },
        chooseMain(state){
            state.tab = 'three';
        }
    }
})

export default tabSlice.reducer;
export const {
    chooseBun,
    chooseSauce,
    chooseMain
  } = tabSlice.actions;