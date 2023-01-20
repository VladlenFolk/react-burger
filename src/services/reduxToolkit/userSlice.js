import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../../utils/cookie";
import {
  apiRegister,
  apiLogin,
  apiLogout,
  getUserData,
  updateToken,
  updateUserData,
  forgotPass,
  resetPass,
} from "../../utils/api";




export const fetchRegUser = createAsyncThunk(
  "user/fetchRegUser",
  async ({
    email,
    password,
    name,
  }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    };
    const response = await apiRegister(requestOptions);
    return response;
  }
)

// export function regUser(mail, password, name) {
//   return function (dispatch) {
//     dispatch(registerUserRequest());
//     apiRegister(mail, password, name)
//       .then((res) => {
//         if (res && res.success) {
//           setCookie("token", res.accessToken, { expires: 1200 });
//           localStorage.setItem("jwt", res.refreshToken);
//           dispatch(registerUserSuccess(res.user));
//         } else {
//           dispatch(registerUserFailed());
//         }
//       })
//       .catch(() => {
//         dispatch(registerUserFailed());
//       });
//   };
// }


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
}





const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUserRequest(state) {
      state.loginUserRequest = true;
      state.loginUserFailed = false;
    },
    loginUserSuccess(state, action) {
      state.loginUserRequest = false;
      state.loginUserFailed = false;
      state.user = action.payload;
      state.isAuthChecked = true;
    },
    loginUserFailed(state) {
      state.loginUserRequest = false;
      state.loginUserFailed = true;
    },
    getUserRequest(state) {
      state.getUserRequest = true;
      state.getUserFailed = false;
    },
    getUserSuccess(state, action) {
      state.getUserRequest = false;
      state.getUserFailed = false;
      state.user = action.payload;
      state.isAuthChecked = true;
    },
    getUserFailed(state) {
      state.getUserRequest = false;
      state.getUserFailed = true;
    },
    updateUserRequest(state) {
      state.updateUserRequest = true;
      state.updateUserFailed = false;
    },
    updateUserSuccess(state, action) {
      state.updateUserRequest = false;
      state.updateUserFailed = false;
      state.user = action.payload;
      state.isAuthChecked = true;
    },
    updateUserFailed(state) {
      state.updateUserRequest = false;
      state.updateUserFailed = true;
    },
    logoutUserRequest(state) {
      state.logoutUserRequest = true;
      state.logoutUserFailed = false;
    },
    logoutUser(state) {
      state.user = {
        name: "",
        email: "",
      };
      state.logoutUserRequest = false;
      state.logoutUserFailed = false;
      state.isAuthChecked = false;
    },
    logoutUserFailed(state) {
      state.logoutUserRequest = false;
      state.logoutUserFailed = true;
    },
    codeRequest(state) {
      state.codeRequest = false;
      state.codeRequestFailed = false;
    },
    requestCodeRequest(state) {
      state.codeRequest = true;
      state.codeRequestFailed = false;
    },
    codeRequestFailed(state) {
      state.codeRequest = false;
      state.codeRequestFailed = true;
    },
    resetPasswordRequest(state) {
      state.resetRequest = true;
      state.resetFailed = false;
    },
    resetUserPassword(state) {
      state.resetRequest = false;
      state.resetFailed = false;
    },
    resetPasswordFailed(state) {
      state.resetRequest = false;
      state.codeRequestFailed = true;
    },
    updateUserToken(state) {
      state.tokenRequest = false;
      state.tokenFailed = false;
    },
    updateTokenRequest(state) {
      state.tokenRequest = true;
      state.tokenFailed = false;
    },
    updateTokenFailed(state) {
      state.tokenRequest = false;
      state.tokenFailed = true;
    },
  },
  extraReducers(builder){
    builder
    .addCase(fetchRegUser.pending, (state) => {
      state.registerUserRequest = true;
      state.registerUserFailed = false;
    })
    .addCase(fetchRegUser.fulfilled, (state, action) => {
      state.registerUserRequest = false;
      state.registerUserFailed = false;
      state.user = action.payload;
      state.isAuthChecked = true;
    })
    .addCase(fetchRegUser.rejected, (state) => {
      state.registerUserRequest = false;
      state.registerUserFailed = true;
    })
  }
});

export function regUser(mail, password, name) {
  return function (dispatch) {
    dispatch(registerUserRequest());
    apiRegister(mail, password, name)
      .then((res) => {
        if (res && res.success) {
          setCookie("token", res.accessToken, { expires: 1200 });
          localStorage.setItem("jwt", res.refreshToken);
          dispatch(registerUserSuccess(res.user));
        } else {
          dispatch(registerUserFailed());
        }
      })
      .catch(() => {
        dispatch(registerUserFailed());
      });
  };
}

export function login(email, password) {
  return function (dispatch) {
    dispatch(loginUserRequest());
    apiLogin(email, password)
      .then((res) => {
        if (res && res.success) {
          setCookie("token", res.accessToken, { expires: 1200 });
          localStorage.setItem("jwt", res.refreshToken);
          dispatch(loginUserSuccess(res.user));
        } else {
          dispatch(loginUserFailed());
        }
      })
      .catch(() => {
        dispatch(loginUserFailed());
      });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch(logoutUserRequest());
    apiLogout()
      .then((res) => {
        if (res && res.success) {
          setCookie("token", "", { expires: -1 });
          localStorage.removeItem("jwt");
          dispatch(logoutUser(res.user));
        } else {
          dispatch(logoutUserFailed());
        }
      })
      .catch(() => {
        dispatch(logoutUserFailed());
      });
  };
}

export function refreshToken() {
  return function (dispatch) {
    dispatch(updateTokenRequest());
    updateToken()
      .then((res) => {
        if (res && res.success) {
          setCookie("token", res.accessToken, { expires: 1200 });
          localStorage.setItem("jwt", res.refreshToken);
          dispatch(updateUserToken());
        } else {
          dispatch(updateTokenFailed());
        }
      })
      .catch(() => {
        dispatch(updateTokenFailed());
      });
  };
}

export function getUser() {
  return function (dispatch) {
    dispatch(getUserRequest());
    getUserData()
      .then((res) => {
        dispatch(getUserSuccess(res.user));
      })
      .catch(() => {
        if (localStorage.getItem("jwt")) {
          dispatch(refreshToken());
          getUserData().then((res) => {
            dispatch(getUserSuccess(res.user));
          });
        } else {
          dispatch(getUserFailed());
        }
      });
  };
}

export function updateUser(name, email, password) {
  return function (dispatch) {
    dispatch(updateUserRequest());
    updateUserData(name, email, password)
      .then((res) => {
        dispatch(updateUserSuccess(res.user));
      })
      .catch(() => {
        if (localStorage.getItem("jwt")) {
          dispatch(refreshToken());
          dispatch(updateUser(name, email, password));
        } else {
          dispatch(updateUserFailed());
        }
      });
  };
}

export function requestRestoreCode(email) {
  return function (dispatch) {
    dispatch(requestCodeRequest());
    forgotPass(email)
      .then((res) => {
        if (res && res.success) {
          dispatch(codeRequest());
        } else {
          dispatch(codeRequestFailed());
        }
      })
      .catch(() => {
        dispatch(codeRequestFailed());
      });
  };
}

export function resetPassword(password, token) {
  return function (dispatch) {
    dispatch(resetPasswordRequest());
    resetPass(password, token)
      .then((res) => {
        if (res && res.success) {
          dispatch(resetUserPassword());
        } else {
          dispatch(resetPasswordFailed());
        }
      })
      .catch(() => {
        dispatch(resetPasswordFailed());
      });
  };
}

export default userSlice.reducer;
export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailed,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailed,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  logoutUserRequest,
  logoutUser,
  logoutUserFailed,
  codeRequest,
  requestCodeRequest,
  codeRequestFailed,
  resetPasswordRequest,
  resetUserPassword,
  resetPasswordFailed,
  updateUserToken,
  updateTokenRequest,
  updateTokenFailed,
} = userSlice.actions;