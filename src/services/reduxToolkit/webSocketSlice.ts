import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TOrders } from "../../types/types";

 type TWsSliceState = {
  total: number;
  totalToday: number,
  orders: TOrders[],
  userOrders: TOrders[],
  wsConnected: boolean,
}

const initialState
: TWsSliceState = {
  total: 0,
  totalToday: 0,
  orders: [],
  userOrders: [],
  wsConnected: false,
}

const wsSlice = createSlice({
  name: "wsReducer",
  initialState,
  reducers: {
    wsConnectionStart(state, action) {},
    wsConnectionSuccess(state) {
      state.wsConnected = true;
    },
    wsOrders(state, action: PayloadAction<TWsSliceState>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },

    wsClosed(state) {
      state.wsConnected = false;
    },
    wsError(state) {
      state.wsConnected = false;
    },
    wsConnectionUserSuccess(state) {
      state.wsConnected = true;
    },
    wsUserOrders(state, action: PayloadAction<TWsSliceState>) {
      state.orders = action.payload.orders;
    },
    wsUserClosed(state) {
      state.wsConnected = false;
    },
    wsUserError(state) {
      state.wsConnected = false;
    },
  },
});

export default wsSlice.reducer;
export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsOrders,
  wsClosed,
  wsError,
  wsConnectionUserSuccess,
  wsUserOrders,
  wsUserClosed,
  wsUserError,
} = wsSlice.actions;