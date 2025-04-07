import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { application } from "../../application";

let initialState = {};

//register user
export const register = createAsyncThunk("register", async (requestObject) => {
  console.log("Sent through ", requestObject);
  let url = `${application.url}/auth/register`;
  let request = await fetch(url, {
    method: "POST",
    body: JSON.stringify(requestObject),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let response = await request.json();
  return response;
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
