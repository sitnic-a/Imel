import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {};

//register user
export const register = createAsyncThunk("register", async (request) => {
  console.log("Sent through ", request);
});

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //register
      .addCase(register.pending, (state, action) => {
        console.log("Pending");
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("Action payload ", action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        console.log("Rejected ", action.payload);
      });
  },
});

export default authSlice.reducer;
