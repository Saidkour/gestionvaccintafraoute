import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchActiveVaccine = createAsyncThunk(
  "vaccine/fetchVaccine",
  async () => {
    const res = await axios.get("/vaccine/activeVaccines");
    return res.data;
  }
);

const vaccineSlice = createSlice({
  name: "vaccine",
  initialState: {
    vaccines: [],
    loading: false,
    error: null,
    activeVaccines: [],
    loadingActiveVaccine: false,
    errorActiveVaccine: null,
  },
  reducers: {
    addVaccines: (state, action) => {
      const vaccines = action.payload?.sort((a, b) =>
        a.available === b.available ? 0 : a.available ? -1 : 1
      );
      state.vaccines = vaccines;
    },

    updateVccine: (state, action) => {
      const vaccine = action.payload;
      const index = state.vaccines.findIndex((v) => v._id === vaccine._id);
      state.vaccines[index] = vaccine;
      state.vaccines = state.vaccines?.sort((a, b) =>
        a.available === b.available ? 0 : a.available ? -1 : 1
      );
    },
    deleteVccine: (state, action) => {
      const id = action.payload.id;
      state.vaccines = state.vaccines.filter((v) => v._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActiveVaccine.pending, (state, action) => {
      state.loadingActiveVaccine = true;
      state.errorActiveVaccine = null;
    });
    builder.addCase(fetchActiveVaccine.fulfilled, (state, action) => {
      state.loadingActiveVaccine = false;
      state.activeVaccines = action.payload.activeVaccines || [];
    });
    builder.addCase(fetchActiveVaccine.rejected, (state, action) => {
      console.log(action);
      state.loadingActiveVaccine = false;
      state.errorActiveVaccine = action.error;
    });
  },
});

export const getActiveVaccineSelector = (state) => state.vaccine.activeVaccines;
export const getActiveVaccineLoadingSelector = (state) =>
  state.vaccine.loadingActiveVaccine;
export const getActiveVaccineErrorSelector = (state) =>
  state.vaccine.errorActiveVaccine;

export const { addVaccines, addVaccine, updateVccine, deleteVccine } =
  vaccineSlice.actions;

export default vaccineSlice.reducer;
