import { AppDispatch, TWsActions } from "../store";
import { TRootState } from "../store";
import { Middleware, MiddlewareAPI } from 'redux';

export const socketMiddleware = (wsActions: TWsActions) : Middleware => (store: MiddlewareAPI<AppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;
    let url = "";
    return (next) => (action) => {
      const { dispatch } = store;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (wsInit.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = () => {
          dispatch(onClose());
        };
      }
      next(action);
    };
};

export default socketMiddleware;
