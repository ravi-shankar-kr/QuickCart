import { createSlice } from "@reduxjs/toolkit";
import { getStorage, setStorage } from "../../utils/storage";

const themeKey = "quickcart_theme";

const initialState = {
  mode: getStorage(themeKey, "light"),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      setStorage(themeKey, state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      setStorage(themeKey, state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
