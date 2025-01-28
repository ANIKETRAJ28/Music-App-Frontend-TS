import { axiosInstance } from "@/apis/axios";
import { IPlaylist } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IPlaylist = {
  id: "",
  name: "",
  userId: "",
  songs: [],
};

export const getDefaultPlaylist = createAsyncThunk(
  "/playlist",
  async (id: string) => {
    try {
      const response = await axiosInstance.get(`/playlist/${id}`);
      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

const defaultPlaylistSlice = createSlice({
  name: "Default Playlist",
  initialState,
  reducers: {
    setDefaultPlaylist: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.songs = action.payload.songs;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDefaultPlaylist.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.songs = action.payload.songs;

      localStorage.setItem("defaultPlaylist", JSON.stringify(action.payload));
    });
  },
});

export const { setDefaultPlaylist } = defaultPlaylistSlice.actions;
export const DefaultPlaylist = defaultPlaylistSlice.reducer;
