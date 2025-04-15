import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { application } from "../../application";

let initialState = {
  dbUsers: [],
  dbUser: null,
  usersCount: 0,
  errors: [],
  isLoading: false,
};

export const getById = createAsyncThunk(
  "user/get/{id}",
  async (requestObject) => {
    let token = sessionStorage.getItem("token");
    let url = `${application.url}/user/${requestObject.id}`;
    let request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let response = await request.json();
    return response;
  }
);

export const getUsers = createAsyncThunk(
  "/users",
  async ([query, paginationParams]) => {
    let token = sessionStorage.getItem("token");
    console.log("Search query ", query, "Pagination params ", paginationParams);
    let url = `${application.url}/user?elementsPerPage=${paginationParams.elementsPerPage}&currentPage=${paginationParams.currentPage}`;
    let request = await fetch(url, {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let response = await request.json();
    return response;
  }
);

export const addNewUser = createAsyncThunk(
  "/user/create",
  async (requestObject) => {
    let token = sessionStorage.getItem("token");
    console.log("Sending user ", requestObject);
    let url = `${application.url}/user/add`;
    let request = await fetch(url, {
      method: "POST",
      body: JSON.stringify(requestObject),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let response = await request.json();
    return response;
  }
);

export const updateUser = createAsyncThunk(
  "user/update/{id}",
  async ([id, requestObject]) => {
    let token = sessionStorage.getItem("token");
    console.log("Id", id, "Update user request object ", requestObject);
    let url = `${application.url}/user/${id}`;
    let request = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(requestObject),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let response = await request.json();
    return response;
  }
);

export const deleteById = createAsyncThunk("user/delete/{id}", async ([id]) => {
  console.log("User to delete ", id);
  let token = sessionStorage.getItem("token");

  let url = `${application.url}/user/${id}`;
  let request = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let response = await request.json();
  return response;
});

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setDbUser: (state, action) => {
      state.dbUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //getById
      .addCase(getById.pending, (state, action) => {
        console.log("Fetching user by id...");
      })
      .addCase(getById.fulfilled, (state, action) => {
        console.log("Fetched user ", action.payload);
      })
      .addCase(getById.rejected, (state, action) => {
        console.log("Fetch rejected ", action.payload);
      })

      //getUsers
      .addCase(getUsers.pending, (state, action) => {
        // console.log("Fetching users");
        state.isLoading = true;
        console.log("Loading state ", state.isLoading);
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        // console.log("Fetched users ", action.payload);
        state.dbUsers = action.payload.response;
        state.usersCount = action.payload.dataCount;
        console.log("Users count ", state.usersCount);
        state.isLoading = false;
        console.log("Loading state ", state.isLoading);
      })
      .addCase(getUsers.rejected, (state, action) => {
        console.log("Fetching rejected ", action.payload);
        state.isLoading = false;
        console.log("Loading state ", state.isLoading);
      })

      //addUser
      .addCase(addNewUser.pending, (state, action) => {
        console.log("Creating new user...");
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.usersCount = action.payload.response.dataCount;
        console.log("Data count in number ", state.usersCount);

        console.log(
          "New user created, dbUsers ",
          action.payload.response.response
        );
        state.dbUsers = action.payload.response.response;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        console.log("Creating rejected");
      })

      //updateUser
      .addCase(updateUser.pending, (state, action) => {
        console.log("Updating user... ");
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("Updated users ", action.payload);
        state.dbUsers = action.payload.response.response;
        state.usersCount = action.payload.response.dataCount;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log("Update rejected", action.payload);
      })

      //deleteUser
      .addCase(deleteById.pending, (state, action) => {
        console.log("Deleting user...");
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        console.log("After deletion result ", action.payload.response.response);
        state.dbUsers = action.payload.response.response;
      })
      .addCase(deleteById.rejected, (state, action) => {
        console.log("Delete rejected ", action.payload);
      });
  },
});

export const { setDbUser, setErrors } = userSlice.actions;

export default userSlice.reducer;
