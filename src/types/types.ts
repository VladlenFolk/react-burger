export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  id?: string;
  index?: number;
};

export type TOrders = {
  _id: string;
  ingredients: string[];
  status: "created" | "pending" | "done";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOtherIngredient = {
  item: TIngredient;
  id: string;
};

export type TParams = {
  idCard: string;
};

export type TLocationState = {
  from?: string;
  background?: {
    hash: string;
    key?: string;
    pathname: string;
    search: string;
    state: TLocationState;
  };
};

export type TLocationProps = {
  pathname?: string;
  state: {
    from: string;
    background?: string;
    id?: string;
    finishOrder?: boolean;
  };
};

export type TPayload = {
  orders: TOrders[];
};

export type TOrderNumber = {
  order: { number: number };
};

export type TIngredientData = {
  data: TIngredient[];
  success: boolean;
};

export type TUserResponse = {
  accessToken: string;
  refreshToken: string;
  user: { email: string; name: string };
};

export type TGetUserResponse = {
  accessToken?: string;
  refreshToken?: string;
  user: { email: string; name: string };
};