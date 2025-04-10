import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isModalNewUserOpen: false,
};

export const modalSlice = createSlice({
  initialState,
  name: "modalSlice",
  reducers: {
    openNewUserModal: (state, action) => {
      state.isModalNewUserOpen = action.payload;
      if (state.isModalNewUserOpen === true) {
        document.querySelector("#user-dashboard").style.transform =
          "translateY(-40%)";
        return;
      }
      document.querySelector("#user-dashboard").style.transform =
        "translateY(6%)";
    },
  },
});

export const { openNewUserModal } = modalSlice.actions;

export default modalSlice.reducer;
