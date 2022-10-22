const apiConfig = {
  baseURL: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-type": "application/json",
  },
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export const getData = async () => {
  const res = await fetch(`${apiConfig.baseURL}ingredients`);
  return checkResponse(res);
};

export const apiOrder = async (orderInfo) => {
  const res = await fetch(`${apiConfig.baseURL}orders`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ ingredients: orderInfo }),
  });
  return checkResponse(res);
};