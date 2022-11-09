const apiConfig = {
  baseURL: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-type": "application/json",
  },
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export const getData =  () => {
  return fetch(`${apiConfig.baseURL}ingredients`,{
  method: "GET",
  headers: apiConfig.headers,
}).then(checkResponse);
};

export const apiOrder =  (orderInfo) => {
 return fetch(`${apiConfig.baseURL}orders`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ ingredients: orderInfo }),
  })
  .then(checkResponse);
};