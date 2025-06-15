import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LoginPage from "./Component/LoginPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import StudentDashbord from "./Component/StudentDashbord.jsx";
import AdminDashbord from "./Component/AdminDashbord.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student-dashbord" element={<StudentDashbord />} />
        <Route path="/admin-dashbord" element={<AdminDashbord />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
