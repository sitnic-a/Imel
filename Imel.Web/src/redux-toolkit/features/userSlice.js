import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { application } from "../../application";

let initialState = {
  dbUsers: [],
  usersCount: 0,
};

export const getUsers = createAsyncThunk(
  "/users",
  async ([query, paginationParams]) => {
    console.log("Search query ", query, "Pagination params ", paginationParams);
    let url = `${application.url}/user?elementsPerPage=${paginationParams.elementsPerPage}&currentPage=${paginationParams.currentPage}`;
    let request = await fetch(url, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await request.json();
    return response;
  }
);

export const addNewUser = createAsyncThunk(
  "/user/create",
  async (requestObject) => {
    console.log("Sending user ", requestObject);
    let url = `${application.url}/user/add`;
    let request = await fetch(url, {
      method: "POST",
      body: JSON.stringify(requestObject),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await request.json();
    return response;
  }
);

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder

      //getUsers
      .addCase(getUsers.pending, (state, action) => {
        // console.log("Fetching users");
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        // console.log("Fetched users ", action.payload);
        state.dbUsers = action.payload.response;
        state.usersCount = action.payload.dataCount;
        console.log("Users count ", state.usersCount);
      })
      .addCase(getUsers.rejected, (state, action) => {
        console.log("Fetching rejected ", action.payload);
      })

      //addUser
      .addCase(addNewUser.pending, (state, action) => {
        console.log("Creating new user...");
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        console.log(
          "New user created, dbUsers ",
          action.payload.response.response
        );
        state.dbUsers = action.payload.response.response;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        console.log("Creating rejected");
      });
  },
});

export default userSlice.reducer;
