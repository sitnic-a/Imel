import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { application } from "../../application";

let initialState = {
  dbUsersToExport: [],
  isLoading: false,
};

export const getUsersReadyToExport = createAsyncThunk(
  "export/users",
  async () => {
    let url = `${application.url}/export/`;
    let request = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await request.json();
    return response;
  }
);

const exportSlice = createSlice({
  initialState,
  name: "exportSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder

      //prepareUsersToExport
      .addCase(getUsersReadyToExport.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUsersReadyToExport.fulfilled, (state, action) => {
        state.dbUsersToExport = action.payload.response;
        state.isLoading = false;
      })
      .addCase(getUsersReadyToExport.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default exportSlice.reducer;
