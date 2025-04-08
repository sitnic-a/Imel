import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
  dbUsers: [],
};

export const getUsers = createAsyncThunk("/users", (query) => {
  console.log("Search query ", query);
});

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder

      //getUsers
      .addCase(getUsers.pending, (state, action) => {
        console.log("Fetching users");
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log("Fetched users ", action.payload);
      })
      .addCase(getUsers.rejected, (state, action) => {
        console.log("Fetching rejected ", action.payload);
      });
  },
});
