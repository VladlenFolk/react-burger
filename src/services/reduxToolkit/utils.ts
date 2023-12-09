import { createSlice } from "@reduxjs/toolkit";

interface IUtils {
    windowSize: number,
    isCount: boolean,
    burgerState: boolean,
    countModal: boolean,
    animate: boolean,
    orderModal: boolean,
}

const initialState: IUtils = {
    windowSize: 0,
    isCount: false,
    burgerState: false, 
    countModal: false,
    animate: false,
    orderModal: false,
}

const utils = createSlice({
    name: 'utils',
    initialState,
   reducers: {
    changedSize(state, action){
        state.windowSize = action.payload
    },
    countOpen(state: IUtils){
        state.isCount = true;
    },
    countClose(state: IUtils){
        state.isCount = false
    },
    burgerOpen(state: IUtils){
        state.burgerState = true;
    },
    burgerClose(state: IUtils){
        state.burgerState = false
    },
    toggleBurger(state: IUtils){
        state.burgerState = !state.burgerState
    },
    toggleAnimate(state: IUtils){
        state.animate = !state.animate
    },
    countModalOpen(state: IUtils){
        state.countModal = true;
    },
    countModalClose(state: IUtils){
        state.countModal = false
    },
    orderModalOpen(state: IUtils){
        state.orderModal = true;
    },
    orderModalClose(state: IUtils){
        state.orderModal = false;
    }
   }
})

export default utils.reducer;
export const {
    changedSize,
    countOpen,
    countClose,
    burgerOpen,
    burgerClose,
    toggleBurger,
    toggleAnimate,
    countModalOpen,
    countModalClose,
    orderModalOpen,
    orderModalClose,
} = utils.actions;