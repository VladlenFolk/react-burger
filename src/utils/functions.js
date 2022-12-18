export const getPrice = (objWithCount) => {
  const price = objWithCount.reduce(
    (prev, curr) => prev + curr.price * curr.count,
    0
  );
  return price;
};

export const getObjWithCount = (ingredientsArr, ingredientsObj) => {
  let arr = [];
  const res = {};
  let allRes = {};
  for (let i = 0; i < ingredientsObj.length; i++) {
    for (let j = 0; j < ingredientsArr.length; j++) {
      if (ingredientsObj[i]._id === ingredientsArr[j]) {
        arr.push(ingredientsObj[i]);
      }
    }
  }
  arr.forEach((obj) => {
    const key = `${obj._id}`;
    if (!res[key]) {
      res[key] = { ...obj, count: 0 };
    }
    if (res[key].type === "bun") {
      res[key].count += 1;
    }
    res[key].count += 1;
  });
  allRes = Object.values(res);
  return allRes;
};