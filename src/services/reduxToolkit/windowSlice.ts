import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    windowSize: 0
}

const windowSizeSlice = createSlice({
    name: 'windowSizeSlice',
    initialState,
   reducers: {
    changedSize(state, action){
        state.windowSize = action.payload
    }
   } 
})

export default windowSizeSlice.reducer;
export const {
    changedSize
} = windowSizeSlice.actions;