import socketMiddleware from "./socketMiddleware/socketMiddleware";
import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

import {
  wsConnectionStart,
  wsConnectionSuccess,
  wsOrders,
  wsClosed,
  wsError,
} from "./reduxToolkit/webSocketSlice";

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
    return getDafaultMiddleware().concat(socketMwOrders);
  },
});