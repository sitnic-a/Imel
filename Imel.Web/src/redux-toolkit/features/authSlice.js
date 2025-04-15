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
        console.log("Pending");
        state.isRegistering = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("Action payload ", action.payload);
        state.isRegistering = false;
      })
      .addCase(register.rejected, (state, action) => {
        console.log("Rejected ", action.payload);
        state.isRegistering = false;
      })

      //login
      .addCase(login.pending, (state, action) => {
        console.log("Logging pending");
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Login fullfilled ", action.payload);
        state.loggedUser = action.payload.response;
        console.log("Logged user ", state.loggedUser);
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Login rejected ", action);
      });
  },
});

export default authSlice.reducer;
