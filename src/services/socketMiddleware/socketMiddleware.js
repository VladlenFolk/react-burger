export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;
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

        socket.onсlose = () => {
          dispatch(onClose());
        };
      }
      next(action);
    };
  };
};

export default socketMiddleware;
