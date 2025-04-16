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
      if (state.isModalNewUserOpen === true) {
        document.querySelector("#admin-dashboard").style.transform =
          "translateY(-36%)";
        return;
      }
      document.querySelector("#admin-dashboard").style.transform =
        "translateY(6%)";
    },
    openDeleteUserModal: (state, action) => {
      state.isModalDeleteUserOpen = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
      if (state.isLoading) {
        document.querySelector("#admin-dashboard").style.transform =
          "translateY(-1%)";
      }
    },
  },
});

export const { openNewUserModal, openDeleteUserModal, setIsLoading } =
  modalSlice.actions;

export default modalSlice.reducer;
