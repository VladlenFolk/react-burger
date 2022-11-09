import {
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
} from "../actions/order";

const initialState = {
  number: 0,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.number,
        orderRequest: false,
        orderFailed: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        number: 0,
        orderFailed: true,
        orderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
