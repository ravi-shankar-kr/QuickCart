import { STORAGE_KEYS } from "../../constants/storageKeys";
import {
  getStorageData,
  removeStorageData,
  setStorageData,
} from "../../services/storage";

export const registerUser = (user) => {
  const users = getStorageData(STORAGE_KEYS.USERS) || [];

  const exists = users.find(
    (item) => item.email.toLowerCase() === user.email.toLowerCase()
  );

  if (exists) {
    throw new Error("Email already exists");
  }

  const newUser = {
    id: crypto.randomUUID(),
    role: "user",
    ...user,
  };

  users.push(newUser);

  setStorageData(STORAGE_KEYS.USERS, users);

  return newUser;
};

export const loginUser = ({ email, password }) => {
  const users = getStorageData(STORAGE_KEYS.USERS) || [];

  const user = users.find(
    (item) =>
      item.email === email &&
      item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  setStorageData(STORAGE_KEYS.AUTH, user);

  return user;
};

export const logoutUser = () => {
  removeStorageData(STORAGE_KEYS.AUTH);
};

export const getCurrentUser = () => {
  return getStorageData(STORAGE_KEYS.AUTH);
};