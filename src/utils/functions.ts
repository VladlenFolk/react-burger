import { nanoid } from "nanoid";
import { TIngredient } from "../types/types";
import { addBun, countOpen, addOtherIngredient } from "../services/reduxToolkit/constructorSlice";



export const addItem = (item: TIngredient, callback: any) => {
  const ingredient = {
    item,
    id: nanoid(),
  };
  if (item.type === "bun") {
    callback(addBun(item));
    callback(countOpen());
  } else {
    callback(addOtherIngredient(ingredient));
    callback(countOpen());
  }
};

type TIngredientCount = TIngredient & {count: number};

export const getPrice = (objWithCount: TIngredientCount[]): number => {
  const price = objWithCount.reduce(
    (prev, curr) =>  prev + curr.price * curr.count,
    0
  );
  return price;
};

export const getObjWithCount = (ingredientsArr: string[], ingredientsObj: TIngredient[]): TIngredientCount[]=> {
  let arr = [];
  const res= {} as any;
  let allRes = {} as any;
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

