import { configureStore } from "@reduxjs/toolkit";
import { User } from "./user";
import { DefaultPlaylist } from "./defaultPlaylist";

const store = configureStore({
  reducer: {
    user: User,
    defaultPlaylist: DefaultPlaylist,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
