import { createSlice } from "@reduxjs/toolkit";
import { apiOrder } from "../../utils/api";
import { getChoosenOrder } from "../../utils/api";
import { resetConstructor } from "./constructorSlice";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    number: 0,
    orderRequest: false,
    orderFailed: false,
    order: {},
  },
  reducers: {
    getOrderRequest(state) {
      state.orderRequest = true;
    },
    getOrderSuccess(state, action) {
      state.orderRequest = false;
      state.orderFailed = false;
      state.number = action.payload;
    },
    getOrderFailed(state) {
      state.orderRequest = false;
      state.orderFailed = true;
    },
    getChoosenOrderRequest(state) {
      state.choosenOrderRequest = true;
    },
    getChoosenOrderSuccess(state, action) {
      state.choosenOrderRequest = false;
      state.choosenOrderFailed = false;
      state.order = action.payload;
    },
    getChoosenOrderFailed(state) {
      state.choosenOrderRequest = false;
      state.choosenOrderFailed = true;
    },
  },
});

export function getOrder(orderInfo) {
    return function (dispatch) {
      dispatch(getOrderRequest());
      apiOrder(orderInfo)
        .then((res) => {
          if (res && res.success) {
            dispatch(getOrderSuccess(res.order.number));
          } else {
            dispatch(getOrderFailed());
          }
        })
        .then(
          dispatch(resetConstructor())
        )
        .catch(() => {
          dispatch(getOrderFailed());
        });
    };
  }

  export function choosenOrder(orderNumber) {
    return function (dispatch) {
      dispatch(getChoosenOrderRequest());
      getChoosenOrder(orderNumber)
        .then((res) => {
          if (res && res.success) {
            dispatch(getChoosenOrderSuccess(res.orders)              
            );
          } else {
            dispatch(getChoosenOrderFailed());
          }
        })
        .catch(() => {
          dispatch(getChoosenOrderFailed());
        });
    };
  }

export default orderSlice.reducer;
export const {
    getOrderRequest,
    getOrderSuccess,
    getOrderFailed,
    getChoosenOrderRequest,
    getChoosenOrderSuccess,
    getChoosenOrderFailed
} = orderSlice.actions;