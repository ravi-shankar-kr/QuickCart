import React from "react";
import { Routes, Route } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;