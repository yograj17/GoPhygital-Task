import { Navigate } from "react-router";

export const CheckLoginRoute = ({ children }) => {
  const loginKey = localStorage.getItem("login");

  return loginKey == "true" ? children : <Navigate to={"/"} />;
};
