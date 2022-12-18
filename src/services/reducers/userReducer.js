import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILED,
  LOGOUT_USER,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_FAILED,
  CODE_REQUEST,
  REQUEST_CODE_REQUEST,
  CODE_REQUEST_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILED,
  UPDATE_TOKEN,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_FAILED,
} from "../actions/user";

const initialState = {
  user: {
    name: "",
    email: "",
  },
  registerUserRequest: false,
  registerUserFailed: false,
  loginUserRequest: false,
  loginUserFailed: false,
  updateUserRequest: false,
  updateUserFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  logoutUserRequest: false,
  logoutUserFailed: false,
  codeRequest: false,
  codeRequestFailed: false,
  resetRequest: false,
  resetFailed: false,
  tokenRequest: false,
  tokenFailed: false,
  isAuthChecked: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserRequest: true,
        registerUserFailed: false,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserFailed: false,
        user: action.user,
        isAuthChecked: true,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerUserFailed: true,
        registerUserRequest: false,
      };
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserRequest: true,
        loginUserFailed: false,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loginUserRequest: false,
        loginUserFailed: false,
        user: action.user,
        isAuthChecked: true,
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserFailed: true,
        loginUserRequest: false,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        user: action.user,
        isAuthChecked: true,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: false,
        user: action.user,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserFailed: true,
        updateUserRequest: false,
      };
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        logoutUserRequest: true,
        logoutUserFailed: false,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isAuthChecked: false,
        logoutUserRequest: false,
        logoutUserFailed: false,
      };
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        logoutUserFailed: true,
        logoutUserRequest: false,
      };
    }
    case CODE_REQUEST: {
      return {
        ...state,
        codeRequest: false,
        codeRequestFailed: false,
      };
    }
    case REQUEST_CODE_REQUEST: {
      return {
        ...state,
        codeRequest: true,
        codeRequestFailed: false,
      };
    }
    case CODE_REQUEST_FAILED: {
      return {
        ...state,
        codeRequestFailed: true,
        codeRequest: false,
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        resetRequest: false,
        resetFailed: false,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetRequest: true,
        resetFailed: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetFailed: true,
        resetRequest: false,
      };
    }
    case UPDATE_TOKEN: {
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: false,
      };
    }
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true,
        tokenFailed: false,
      };
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        tokenFailed: true,
        tokenRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};