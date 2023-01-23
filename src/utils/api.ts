import { getCookie } from "./cookie";
import { TPayload, TIngredientData, TOrderNumber, TUserResponse} from "../types/types";

const apiConfig = {
  baseURL: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-type": "application/json",
  },
};

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(res);
};

function request(url:string, options:any) {
  return fetch(url, options).then(checkResponse);
}


export const getData = (): Promise<TIngredientData> => {
  return request(`${apiConfig.baseURL}ingredients`, {
    method: "GET",
    headers: apiConfig.headers,
  });
};

export const getChoosenOrder = (number:string): Promise<TPayload> => {
  return request(`${apiConfig.baseURL}orders/${number}`, {
    method: "GET",
    headers: apiConfig.headers,
  });
};



export const apiOrder = (orderInfo:string[]): Promise<TOrderNumber> => {
  return request(`${apiConfig.baseURL}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getCookie("token")}`,
    },
    body: JSON.stringify({ ingredients: orderInfo }),
  });
};

export const apiRegister = (email:string, password:string, name:string): Promise<TUserResponse> => {
  return request(`${apiConfig.baseURL}auth/register`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ email, password, name }),
  });
};

export const updateUserData = (name:string, email:string, password:string): Promise<TUserResponse> => {
  return request(`${apiConfig.baseURL}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getCookie("token")}`,
    },
    body: JSON.stringify({ name, email, password }),
  });
};

export const apiLogin = (email:string, password:string): Promise<TUserResponse> => {
  return request(`${apiConfig.baseURL}auth/login`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ email, password }),
  });
};

export const apiLogout = () => {
  return request(`${apiConfig.baseURL}auth/logout`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ token: localStorage.getItem("jwt") }),
  });
};

export const forgotPass = (email:string) => {
  return request(`${apiConfig.baseURL}password-reset`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ email }),
  });
};

export const resetPass = (password:string, token: string) => {
  return request(`${apiConfig.baseURL}password-reset/reset`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ password, token }),
  });
};

export const getUserData = (): Promise<TUserResponse> => {
  return request(`${apiConfig.baseURL}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getCookie("token")}`,
    },
  });
};

export const updateToken = (): Promise<TUserResponse> => {
  return request(`${apiConfig.baseURL}auth/token`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ token: localStorage.getItem("jwt") }),
  });
};