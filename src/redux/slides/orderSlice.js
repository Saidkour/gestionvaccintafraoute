import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";
export const addNewOrder = createAsyncThunk("order/add", async (order) => {
  const responce = await axios.post("/order", order);
  return responce.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    error: null,
    loading: false,
    limit: 10,
    resultsCount: 0,
    showingFrom: 0,
    showingTo: 0,
    page: 1,
  },
  reducers: {
    addOrders: (state, action) => {
      state.orders = action.payload.orders;
      state.resultsCount = action.payload.resultsCount;
      state.showingFrom = action.payload.showingFrom;
      state.showingTo = action.payload.showingTo;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewOrder.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addNewOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    });
    builder.addCase(addNewOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const getOrderLoadingSelectore = (state) => state.order.loading;

export const { addOrders, setPage } = orderSlice.actions;
export default orderSlice.reducer;
