import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  paginationParams: {
    currentPage: 1,
    elementsPerPage: 5,
    lastPage: 1,
    previousPage: 0,
  },
};

export const paginationSlice = createSlice({
  initialState,
  name: "paginationSlice",
  reducers: {
    setPaginationParams: (state, action) => {
      console.log("Pagination action ", action.payload);

      state.paginationParams = {
        currentPage: action.payload.currentPage,
        elementsPerPage: action.payload.elementsPerPage,
        lastPage: action.payload.lastPage,
        previousPage: action.payload.previousPage,
      };

      console.log("New state ", state.paginationParams);
    },
  },
});

export const { setPaginationParams } = paginationSlice.actions;
export default paginationSlice.reducer;
