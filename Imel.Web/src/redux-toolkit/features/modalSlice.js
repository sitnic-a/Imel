import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isModalNewUserOpen: false,
  isModalDeleteUserOpen: false,
  isLoading: false,
};

export const modalSlice = createSlice({
  initialState,
  name: "modalSlice",
  reducers: {
    openNewUserModal: (state, action) => {
      state.isModalNewUserOpen = action.payload;
    },
    openDeleteUserModal: (state, action) => {
      state.isModalDeleteUserOpen = action.payload;
    },
  },
});

export const { openNewUserModal, openDeleteUserModal } = modalSlice.actions;

export default modalSlice.reducer;
