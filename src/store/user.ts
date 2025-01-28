import { axiosInstance } from "@/apis/axios";
import { IUser } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IUser = {
  id: localStorage.getItem("id") || null,
  name: localStorage.getItem("name") || null,
  username: localStorage.getItem("username") || null,
  avatar: localStorage.getItem("avatar") || null,
  email: localStorage.getItem("email") || null,
  defaultPlaylist: localStorage.getItem("defaultPlaylist")
    ? JSON.parse(localStorage.getItem("defaultPlaylist") as string)
    : null,
};

export const completeProfile = createAsyncThunk(
  "/auth/signup",
  async (user: { name: string; username: string; password: string }) => {
    try {
      const response = await axiosInstance.post(`/auth/complete-profile`, {
        user: user,
      });
      return response.data.message;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const login = createAsyncThunk("/auth/login", async () => {
  try {
    const response = await axiosInstance.get("/auth");
    return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data.message;
  }
});

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.defaultPlaylist = action.payload.defaultPlaylist;
    },
    removeUser: (state) => {
      localStorage.clear();
      state.name = null;
      state.username = null;
      state.avatar = null;
      state.email = null;
      state.defaultPlaylist = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.defaultPlaylist = action.payload.defaultPlaylist;
      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("avatar", action.payload.avatar);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem(
        "defaultPlaylist",
        JSON.stringify(action.payload.defaultPlaylist)
      );
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const User = userSlice.reducer;
