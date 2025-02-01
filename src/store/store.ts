import { configureStore } from "@reduxjs/toolkit";
import { User } from "./user";
import { DefaultPlaylist } from "./defaultPlaylist";
import { AllPlaylist } from "./allPlaylist";
import { Sidebar } from "./sidebar";
import { Jam } from "./jam";

const store = configureStore({
  reducer: {
    user: User,
    defaultPlaylist: DefaultPlaylist,
    playlists: AllPlaylist,
    sidebar: Sidebar,
    joinJam: Jam,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
