import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isModalNewUserOpen: false,
  isModalDeleteUserOpen: false,
};

export const modalSlice = createSlice({
  initialState,
  name: "modalSlice",
  reducers: {
    openNewUserModal: (state, action) => {
      state.isModalNewUserOpen = action.payload;
      if (state.isModalNewUserOpen === true) {
        document.querySelector("#user-dashboard").style.transform =
          "translateY(-36%)";
        return;
      }
      document.querySelector("#user-dashboard").style.transform =
        "translateY(6%)";
    },
    openDeleteUserModal: (state, action) => {
      state.isModalDeleteUserOpen = action.payload;

      if (state.isModalDeleteUserOpen == true) {
        document.querySelector(".col-actions").style.opacity = 0;
        return;
      }
      document.querySelector(".col-actions").style.opacity = 1;
    },
  },
});

export const { openNewUserModal, openDeleteUserModal } = modalSlice.actions;

export default modalSlice.reducer;
