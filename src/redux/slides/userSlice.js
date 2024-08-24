import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await axios.get("/user");
  return res.data;
});
// update user
export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  const res = await axios.patch("/user", user);
  return res.data;
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const res = await axios.get("/user/logout");
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: undefined,
    error: null,
    status: "",
  },
  reducers: {
    addUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.status = "";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.status = "success";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
      state.status = "";
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.status = "Successful update";
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
   
});

export const getUserSelectore = (state) => state.user.user;
export const getUserLoadingSelectore = (state) => state.user.loading;
export const getUserErrorSelectore = (state) => state.user.error;
export const getUserStatusSelectore = (state) => state.user.status;
export const { addUser } = userSlice.actions;
export default userSlice.reducer;
