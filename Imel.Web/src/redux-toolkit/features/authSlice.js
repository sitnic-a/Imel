import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { application } from "../../application";

let initialState = {
  loggedUser: null,
  isRegistering: false,
  isLogging: false,
};

//register user
export const register = createAsyncThunk("register", async (requestObject) => {
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

export const login = createAsyncThunk("/login", async (requestObject) => {
  console.log("Login data ", requestObject);
  let url = `${application.url}/auth/login`;
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
        state.isRegistering = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRegistering = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isRegistering = false;
      })

      //login
      .addCase(login.pending, (state, action) => {
        state.isLogging = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggedUser = action.payload.response;
        state.isLogging = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLogging = false;
      });
  },
});

export default authSlice.reducer;
