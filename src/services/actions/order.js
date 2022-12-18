import { apiOrder } from "../../utils/api";
import { getChoosenOrder } from "../../utils/api";
import { RESET_CONSTRUCTOR } from "./constructor";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_CHOOSEN_ORDER_REQUEST = "GET_CHOOSEN_ORDER_REQUEST";
export const GET_CHOOSEN_ORDER_SUCCESS = "GET_CHOOSEN_ORDER_SUCCESS";
export const GET_CHOOSEN_ORDER_FAILED = "GET_CHOOSEN_ORDER_FAILED";

export function getOrder(orderInfo) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    apiOrder(orderInfo)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            number: res.order.number,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .then(
        dispatch({
          type: RESET_CONSTRUCTOR,
        })
      )
      .catch(() => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}

export function choosenOrder(orderNumber) {
  return function (dispatch) {
    dispatch({
      type: GET_CHOOSEN_ORDER_REQUEST,
    });
    getChoosenOrder(orderNumber)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_CHOOSEN_ORDER_SUCCESS,
            order: res.orders,
          });
        } else {
          dispatch({
            type: GET_CHOOSEN_ORDER_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_CHOOSEN_ORDER_FAILED,
        });
      });
  };
}