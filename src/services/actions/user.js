import {
  apiRegister,
  getUserData,
  apiLogin,
  apiLogout,
  resetPass,
  updateUserData,
  forgotPass,
  updateToken,
} from "../../utils/api";
import { setCookie } from "../../utils/cookie";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_FAILED = "LOGOUT_USER_FAILED";
export const CODE_REQUEST = "CODE_REQUEST";
export const REQUEST_CODE_REQUEST = "REQUEST_CODE_REQUEST";
export const CODE_REQUEST_FAILED = "CODE_REQUEST_FAILED";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const UPDATE_TOKEN = "RESET_PASSWORD";
export const UPDATE_TOKEN_REQUEST = "RESET_PASSWORD_REQUEST";
export const UPDATE_TOKEN_FAILED = "RESET_PASSWORD_FAILED";

export function regUser(mail, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    apiRegister(mail, password, name)
      .then((res) => {
        if (res && res.success) {
          setCookie("token", res.accessToken, { expires: 1200 });
          localStorage.setItem("jwt", res.refreshToken);
          dispatch({
            type: REGISTER_USER_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({
            type: REGISTER_USER_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: REGISTER_USER_FAILED,
        });
      });
  };
}

export function login(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    apiLogin(email, password)
      .then((res) => {
        if (res && res.success) {
          setCookie("token", res.accessToken, { expires: 1200 });
          localStorage.setItem("jwt", res.refreshToken);
          dispatch({
            type: LOGIN_USER_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({
            type: LOGIN_USER_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGIN_USER_FAILED,
        });
      });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    apiLogout()
      .then((res) => {
        if (res && res.success) {
          setCookie("token", "", { expires: -1 });
          localStorage.removeItem("jwt");
          dispatch({
            type: LOGOUT_USER,
            user: res.user,
          });
        } else {
          dispatch({
            type: LOGOUT_USER_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_USER_FAILED,
        });
      });
  };
}

export function refreshToken() {
  return function (dispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    updateToken()
      .then((res) => {
        if (res && res.success) {
          setCookie("token", res.accessToken, { expires: 1200 });
          localStorage.setItem("jwt", res.refreshToken);
          dispatch({
            type: UPDATE_TOKEN,
          });
        } else {
          dispatch({
            type: UPDATE_TOKEN_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
      });
  };
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserData()
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        if (localStorage.getItem("jwt")) {
          dispatch(refreshToken());
          getUserData().then((res) => {
            dispatch({
              type: GET_USER_SUCCESS,
              user: res.user,
            });
          });
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
      });
  };
}

export function updateUser(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUserData(name, email, password)
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch(() => {
        if (localStorage.getItem("jwt")) {
          dispatch(refreshToken());
          dispatch(updateUser(name, email, password));
        } else {
          dispatch({
            type: UPDATE_USER_FAILED,
          });
        }
      });
  };
}

export function requestRestoreCode(email) {
  return function (dispatch) {
    dispatch({
      type: REQUEST_CODE_REQUEST,
    });
    forgotPass(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CODE_REQUEST,
          });
        } else {
          dispatch({
            type: CODE_REQUEST_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: CODE_REQUEST_FAILED,
        });
      });
  };
}

export function resetPassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPass(password, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD,
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}