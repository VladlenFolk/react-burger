import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_USER_SUCCESS,
  WS_CONNECTION_USER_ERROR,
  WS_CONNECTION_USER_CLOSED,
  WS_GET_USER_ORDERS,
} from "../actions/webSocket";

const initialState = {
  total: 0,
  totalToday: 0,
  orders: [],
  userOrders: [],
  wsConnected: false,
};

export const webSocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_USER_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_GET_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload.orders,
      };
    case WS_CONNECTION_USER_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_USER_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    default:
      return state;
  }
};


