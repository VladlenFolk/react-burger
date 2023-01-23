import socketMiddleware from "./socketMiddleware/socketMiddleware";
import { rootReducer } from "./reduxToolkit";
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

export type TWsActions  = typeof wsActions;

const socketMwOrders = socketMiddleware(wsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDafaultMiddleware) => {
    return getDafaultMiddleware().concat(socketMwOrders);
  },
});

export type TRootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;