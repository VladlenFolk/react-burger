import { apiOrder } from "../../utils/api";
export const GET_ORDER_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_ORDER_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_ORDER_FAILED = "GET_INGREDIENTS_FAILED";

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
      .catch(() => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}
