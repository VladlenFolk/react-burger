const apiConfig = {
  baseURL: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-type": "application/json",
  },
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export const getData = () => {
  return request(`${apiConfig.baseURL}ingredients`, {
    method: "GET",
    headers: apiConfig.headers,
  });
};

export const apiOrder = (orderInfo) => {
  return request(`${apiConfig.baseURL}orders`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ ingredients: orderInfo }),
  });
};