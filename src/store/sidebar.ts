import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: !localStorage.getItem("sidebarOpen")
    ? true
    : localStorage.getItem("sidebarOpen") === "true",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
      localStorage.setItem("sidebarOpen", state.isOpen.toString());
    },
  },
});

export const getSidebarStatus = () => {
  const sidebarOpen = localStorage.getItem("sidebarOpen");
  if (sidebarOpen === null) {
    localStorage.setItem("sidebarOpen", "true");
    return true;
  }
  return sidebarOpen === "true";
};

export const { toggleSidebar } = sidebarSlice.actions;
export const Sidebar = sidebarSlice.reducer;
