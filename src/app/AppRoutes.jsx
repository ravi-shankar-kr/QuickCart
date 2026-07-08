import React from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/NotFound/NotFound";

import ProtectedRoute from "../components/common/ProtectecdRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/cart"
            element={<div>Cart</div>}
          />

          <Route
            path="/wishlist"
            element={<div>Wishlist</div>}
          />

          <Route
            path="/profile"
            element={<div>Profile</div>}
          />

          <Route
            path="/orders"
            element={<div>Orders</div>}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default AppRoutes;