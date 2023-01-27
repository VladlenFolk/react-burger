import { createSlice } from "@reduxjs/toolkit";

type TabState = {
    tab: string; 
}

const initialState: TabState = {
    tab: 'one'
}

const tabSlice = createSlice({
    name: "tabSlice",
    initialState,
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