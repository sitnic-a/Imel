import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  paginationParams: {
    currentPage: 1,
    elementsPerPage: 5,
    lastPage: null,
    previousPage: null,
  },
};

export const paginationSlice = createSlice({
  initialState,
  name: "paginationSlice",
  reducers: {
    setPaginationParams: (state, action) => {
      state.paginationParams = action.payload;
    },
  },
});

export const { setPaginationParams } = paginationSlice.actions;
export default paginationSlice.reducer;
