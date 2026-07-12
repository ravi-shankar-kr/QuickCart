import { createSlice } from "@reduxjs/toolkit";
import { getStorage, setStorage, removeStorage } from "../../utils/storage";

const usersKey = "quickcart_users";
const sessionKey = "quickcart_session";

const initialState = {
  user: getStorage(sessionKey, null),
  isAuthenticated: !!getStorage(sessionKey, null),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;
      const users = getStorage(usersKey, []);
      const exists = users.find((u) => u.email === email);
      if (exists) {
        state.error = "Email already registered";
        return;
      }
      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: "user",
        avatar: "",
        phone: "",
        address: "",
      };
      users.push(newUser);
      setStorage(usersKey, users);
      state.error = null;
    },
    loginUser: (state, action) => {
      const { email, password, rememberMe } = action.payload;
      const users = getStorage(usersKey, []);
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) {
        state.error = "Invalid email or password";
        return;
      }
      const { password: _pw, ...safeUser } = found;
      state.user = safeUser;
      state.isAuthenticated = true;
      state.error = null;
      setStorage(sessionKey, safeUser);
      setStorage("quickcart_remember", !!rememberMe);
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeStorage(sessionKey);
    },
    updateUserProfile: (state, action) => {
      if (!state.user) return;
      const updated = { ...state.user, ...action.payload };
      state.user = updated;
      setStorage(sessionKey, updated);
      const users = getStorage(usersKey, []);
      const idx = users.findIndex((u) => u.id === updated.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...action.payload };
        setStorage(usersKey, users);
      }
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
