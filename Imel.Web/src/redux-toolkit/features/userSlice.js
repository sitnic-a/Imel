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
        state.isLoading = true;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
      })

      //getUsers
      .addCase(getUsers.pending, (state, action) => {
        // console.log("Fetching users");
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        // console.log("Fetched users ", action.payload);
        state.dbUsers = action.payload.response;
        state.usersCount = action.payload.dataCount;
        state.isLoading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
      })

      //addUser
      .addCase(addNewUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.usersCount = action.payload.response.dataCount;
        state.dbUsers = action.payload.response.response;
        state.isLoading = false;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.isLoading = false;
      })

      //updateUser
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.dbUsers = action.payload.response.response;
        state.usersCount = action.payload.response.dataCount;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
      })

      //deleteUser
      .addCase(deleteById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.dbUsers = action.payload.response.response;
        state.isLoading = false;
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setDbUser, setErrors } = userSlice.actions;

export default userSlice.reducer;
