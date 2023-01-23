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

type TUser = {
  name: string;
  email: string;
};

interface IInitialState {
  user: {
    name: string;
    email: string;
  };
  registerUserRequest: boolean;
  registerUserFailed: boolean;
  loginUserRequest: boolean;
  loginUserFailed: boolean;
  updateUserRequest: boolean;
  updateUserFailed: boolean;
  getUserRequest: boolean;
  getUserFailed: boolean;
  logoutUserRequest: boolean;
  logoutUserFailed: boolean;
  codeRequest: boolean;
  codeRequestFailed: boolean;
  resetRequest: boolean;
  resetFailed: boolean;
  tokenRequest: boolean;
  tokenFailed: boolean;
  isAuthChecked: boolean;
}

const initialState: IInitialState = {
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

export const fetchRegUser = createAsyncThunk(
  "user/fetchRegUser",
  async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    const res = await apiRegister(email, password, name);
    setCookie("token", res.accessToken, { expires: 1200 });
    localStorage.setItem("jwt", res.refreshToken);
    return res.user;
  }
);

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async ({ email, password }: { email: string; password: string }) => {
    const res = await apiLogin(email, password);
    setCookie("token", res.accessToken, { expires: 1200 });
    localStorage.setItem("jwt", res.refreshToken);
    return res.user;
  }
);

export const fetchLogout = createAsyncThunk("user/fetchLogout", async () => {
  const res = await apiLogout();
  setCookie("token", "", { expires: -1 });
  localStorage.removeItem("jwt");
  return res;
});

export const fetchRefreshToken = createAsyncThunk(
  "user/fetchRefreshToken",
  async () => {
    const res = await updateToken();
    setCookie("token", res.accessToken, { expires: 1200 });
    localStorage.setItem("jwt", res.refreshToken);
    return res;
  }
);

export const fetchGetUser = createAsyncThunk<
  TUser,
  undefined,
  { rejectValue: string }
>("user/fetchGetUser", async () => {
  const res = await getUserData();
  return res.user;
});

export const fetchUpdateUser = createAsyncThunk(
  "user/fetchUpdateUser",
  async ({
    name,
    email,
    password,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    const res = await updateUserData(name, email, password);
    return res.user;
  }
);

export const fetchRequestRestoreCode = createAsyncThunk(
  "user/fetchRequestRestoreCode",
  async ({ email }: { email: string }) => {
    const res = await forgotPass(email);
    return res;
  }
);

export const fetchResetPassword = createAsyncThunk(
  "user/fetchResetPassword",
  async ({ password, token }: { password: string; token: string }) => {
    const res = await resetPass(password, token);
    return res;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { },
  extraReducers(builder) {
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
      .addCase(fetchLogin.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserFailed = false;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserFailed = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.loginUserRequest = false;
        state.loginUserFailed = true;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.logoutUserRequest = true;
        state.logoutUserFailed = false;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.user = {
          name: "",
          email: "",
        };
        state.logoutUserRequest = false;
        state.logoutUserFailed = false;
        state.isAuthChecked = false;
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.logoutUserRequest = false;
        state.logoutUserFailed = true;
      })
      .addCase(fetchRefreshToken.pending, (state) => {
        state.tokenRequest = true;
        state.tokenFailed = false;
      })
      .addCase(fetchRefreshToken.fulfilled, (state) => {
        state.tokenRequest = false;
        state.tokenFailed = false;
      })
      .addCase(fetchRefreshToken.rejected, (state) => {
        state.tokenRequest = false;
        state.tokenFailed = true;
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.getUserRequest = true;
        state.getUserFailed = false;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.getUserRequest = false;
        state.getUserFailed = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchGetUser.rejected, (state) => {
        state.getUserRequest = false;
        state.getUserFailed = true;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.updateUserRequest = true;
        state.updateUserFailed = false;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.updateUserRequest = false;
        state.updateUserFailed = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.updateUserRequest = false;
        state.updateUserFailed = true;
      })
      .addCase(fetchRequestRestoreCode.pending, (state) => {
        state.codeRequest = true;
        state.codeRequestFailed = false;
      })
      .addCase(fetchRequestRestoreCode.fulfilled, (state, action) => {
        state.codeRequest = false;
        state.codeRequestFailed = false;
      })
      .addCase(fetchRequestRestoreCode.rejected, (state) => {
        state.codeRequest = false;
        state.codeRequestFailed = true;
      })
      .addCase(fetchResetPassword.pending, (state) => {
        state.resetRequest = true;
        state.resetFailed = false;
      })
      .addCase(fetchResetPassword.fulfilled, (state, action) => {
        state.resetRequest = false;
        state.resetFailed = false;
      })
      .addCase(fetchResetPassword.rejected, (state) => {
        state.resetRequest = false;
        state.codeRequestFailed = true;
      });
  },
});

export default userSlice.reducer;