import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LoginPage from "./Component/LoginPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import StudentDashbord from "./Component/StudentDashbord.jsx";
import AdminDashbord from "./Component/AdminDashbord.jsx";
import { CheckLoginRoute } from "./Router/CheckLoginRoute.jsx";
import { Suspense } from "react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/student-dashbord"
          element={
            <Suspense fallback={<div>Loading......!</div>}>
              <CheckLoginRoute>
                <StudentDashbord />
              </CheckLoginRoute>
            </Suspense>
          }
        />
        <Route
          path="/admin-dashbord"
          element={
            <Suspense fallback={<div>Loading......!</div>}>
              <CheckLoginRoute>
                <AdminDashbord />
              </CheckLoginRoute>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
