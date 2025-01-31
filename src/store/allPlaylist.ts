import { axiosInstance } from "@/apis/axios";
import { toast } from "@/hooks/use-toast";
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

export const addSongToPlaylist = createAsyncThunk(
  "/playlist/add/song",
  async ({ id, url }: { id: string; url: string }) => {
    try {
      const response = await axiosInstance.post(`/playlist/${id}`, { url });
      return { ...response.data.data, playlistId: id };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

const allPlaylistSlice = createSlice({
  name: "All Playlist",
  initialState,
  reducers: {
    setAllPlaylist: (state, action) => {
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allPlaylists.fulfilled, (state, action) => {
        state.playlists = action.payload;
        localStorage.setItem("playlist", JSON.stringify(action.payload));
      })
      .addCase(addSongToPlaylist.fulfilled, (state, action) => {
        const playlists = state.playlists.map((playlist) => {
          if (playlist.id === action.payload.playlistId) {
            playlist.songs.push({
              id: action.payload.id,
              url: action.payload.url,
              title: action.payload.title,
              thumbnail: action.payload.thumbnail,
              description: action.payload.description,
            });
          }
          return playlist;
        });
        state.playlists = playlists;
        localStorage.setItem("playlist", JSON.stringify(state.playlists));
      })
      .addCase(addSongToPlaylist.rejected, (state, action) => {
        toast({ title: action.error.message, variant: "destructive" });
      });
  },
});

export const { setAllPlaylist } = allPlaylistSlice.actions;
export const AllPlaylist = allPlaylistSlice.reducer;
