import { createSlice } from "@reduxjs/toolkit";

const wsSlice = createSlice({
  name: "wsReducer",
  initialState: {
    total: 0,
    totalToday: 0,
    orders: [],
    userOrders: [],
    wsConnected: false,
  },
  reducers: {
    wsConnectionStart(state, action) {},
    wsConnectionSuccess(state) {
      state.wsConnected = true;
    },
    wsOrders(state, action) {
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
    wsUserOrders(state, action) {
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