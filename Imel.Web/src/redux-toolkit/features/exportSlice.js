import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { application } from "../../application";

let initialState = {
  dbUsersToExport: [],
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
        console.log("Getting users for export");
      })
      .addCase(getUsersReadyToExport.fulfilled, (state, action) => {
        console.log("Data to export fetched ", action.payload.response);
        state.dbUsersToExport = action.payload.response;
      })
      .addCase(getUsersReadyToExport.rejected, (state, action) => {
        console.log("Data to export rejected ", action.payload);
      });
  },
});

export default exportSlice.reducer;
