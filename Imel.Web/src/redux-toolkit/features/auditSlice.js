import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { application } from "../../application";

let initialState = {
  logs: [],
  isLoading: false,
};

export const getAuditLogs = createAsyncThunk(
  "/audit/",
  async ([query, paginationParams]) => {
    console.log(
      "Query slice ",
      query,
      "Pagination params slice ",
      paginationParams
    );
    let token = sessionStorage.getItem("token");
    let url = `${application.url}/audit?currentPage=${paginationParams.currentPage}&elementsPerPage=${paginationParams.elementsPerPage}`;
    let request = await fetch(url, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let response = await request.json();
    return response;
  }
);

const auditSlice = createSlice({
  initialState,
  name: "auditSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder

      //get logs
      .addCase(getAuditLogs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAuditLogs.fulfilled, (state, action) => {
        state.logs = action.payload.response;
        state.isLoading = false;
      })
      .addCase(getAuditLogs.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default auditSlice.reducer;
