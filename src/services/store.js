import socketMiddleware from "./socketMiddleware/socketMiddleware";
import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_USER_START,
  WS_CONNECTION_USER_SUCCESS,
  WS_CONNECTION_USER_ERROR,
  WS_CONNECTION_USER_CLOSED,
  WS_GET_USER_ORDERS,
} from "./actions/webSocket";
import { wsConnectionStart, wsConnectionSuccess, wsOrders,  wsClosed, wsError} from "./reduxToolkit/toolkitSlice";

const wsActions = {
    wsInit: wsConnectionStart,
    onOpen: wsConnectionSuccess,
    onClose: wsClosed,
    onError: wsError,
    onMessage: wsOrders,
  };

const socketMwOrders = socketMiddleware(wsActions);
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDafaultMiddleware) => {
    return getDafaultMiddleware().concat(socketMwOrders)
}
});
