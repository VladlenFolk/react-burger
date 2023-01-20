import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiOrder, getChoosenOrder } from "../../utils/api";
import { IOrders } from "../../types/types";



interface IOrdersState {
  number: number;
  orderRequest: boolean;
  orderFailed: boolean;
  order: IOrders[] | {};
  choosenOrderRequest?: boolean;
  choosenOrderFailed?: boolean;
}

const initialState = {
  number: 0,
  orderRequest: false,
  orderFailed: false,
  order: {}
} as IOrdersState

interface IPayload {
  orders:  IOrders[]
}

export const fetchGetChoosenOrder = createAsyncThunk<IPayload, string[]>(
  "order/fetchGetChoosenOrder",
  async(orderNumber: string[]) =>{
   const response = await getChoosenOrder(orderNumber);
   return response
  }
)

export const fetchGetOrder = createAsyncThunk(
  "order/fetchGetOrder",
  async(orderInfo: number) => {
    const response = await apiOrder(orderInfo);
    return response.order.number
  }
)

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
    .addCase(fetchGetOrder.pending, (state) =>{
      state.orderRequest = true;
    })
    .addCase(fetchGetOrder.fulfilled, (state, action: PayloadAction<number>) =>{
      state.orderRequest = false;
      state.orderFailed = false;
      state.number = action.payload;
    })
    .addCase(fetchGetOrder.rejected, (state) => {
      state.orderRequest = false;
      state.orderFailed = true;
    })
    .addCase(fetchGetChoosenOrder.pending, (state) =>{
      state.choosenOrderRequest = true;
    })
    .addCase(fetchGetChoosenOrder.fulfilled, (state, action: PayloadAction<IPayload>) =>{
      state.choosenOrderRequest = false;
      state.choosenOrderFailed = false;
      state.order = action.payload.orders;
    })
    .addCase(fetchGetChoosenOrder.rejected, (state) =>{
      state.choosenOrderRequest = false;
      state.choosenOrderFailed = true;
    })
  }
});

export default orderSlice.reducer;