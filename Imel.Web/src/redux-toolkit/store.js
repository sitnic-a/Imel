import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import modalReducer from "./features/modalSlice";
import paginationReducer from "./features/paginationSlice";
import exportReducer from "./features/exportSlice";
import auditReducer from "./features/auditSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    modal: modalReducer,
    pagination: paginationReducer,
    export: exportReducer,
    audit: auditReducer,
  },
});

export default store;
