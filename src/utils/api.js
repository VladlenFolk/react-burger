import { getCookie } from "./cookie";
const apiConfig = {
  baseURL: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-type": "application/json",
  },
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getData = () => {
  return request(`${apiConfig.baseURL}ingredients`, {
    method: "GET",
    headers: apiConfig.headers,
  });
};

export const getChoosenOrder = (number) => {
  return request(`${apiConfig.baseURL}orders/${number}`, {
    method: "GET",
    headers: apiConfig.headers,
  });
};

export const apiOrder = (orderInfo) => {
  return request(`${apiConfig.baseURL}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getCookie("token")}`,
    },
    body: JSON.stringify({ ingredients: orderInfo }),
  });
};

export const apiRegister = (email, password, name) => {
  return request(`${apiConfig.baseURL}auth/register`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ email, password, name }),
  });
};

export const updateUserData = (name, email, password) => {
  return request(`${apiConfig.baseURL}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getCookie("token")}`,
    },
    body: JSON.stringify({ name, email, password }),
  });
};

export const apiLogin = (email, password) => {
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

export const forgotPass = (email) => {
  return request(`${apiConfig.baseURL}password-reset`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ email }),
  });
};

export const resetPass = (password, token) => {
  return request(`${apiConfig.baseURL}password-reset/reset`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ password, token }),
  });
};

export const getUserData = () => {
  return request(`${apiConfig.baseURL}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getCookie("token")}`,
    },
  });
};

export const updateToken = () => {
  return request(`${apiConfig.baseURL}auth/token`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ token: localStorage.getItem("jwt") }),
  });
};