import { Routes, Route } from "react-router-dom";

function HomePage() {
  return <h1>Home Page</h1>;
}

function NotFoundPage() {
  return <h1>404 | Page Not Found</h1>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;