import { axiosInstance } from "@/apis/axios";
import { IPlaylist } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: {
  playlists: IPlaylist[];
} = {
  playlists: [],
};

export const allPlaylists = createAsyncThunk("/playlists", async () => {
  try {
    if (localStorage.getItem("playlist")) {
      return JSON.parse(localStorage.getItem("playlist") as string);
    }
    const playlists = await axiosInstance.get("/playlist");
    return playlists.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data.message;
  }
});

const allPlaylistSlice = createSlice({
  name: "All Playlist",
  initialState,
  reducers: {
    setAllPlaylist: (state, action) => {
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allPlaylists.fulfilled, (state, action) => {
      state.playlists = action.payload;

      localStorage.setItem("playlist", JSON.stringify(action.payload));
    });
  },
});

export const { setAllPlaylist } = allPlaylistSlice.actions;
export const AllPlaylist = allPlaylistSlice.reducer;
