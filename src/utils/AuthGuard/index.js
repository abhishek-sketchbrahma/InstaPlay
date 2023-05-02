import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const isTokenPresent = Boolean(localStorage.getItem("Token"));

  useEffect(() => {
    if (!isTokenPresent) {
      navigate("/login");
    }
  });

  if (isTokenPresent) {
    return children;
  } else {
    navigate("/login");
  }
};
export default AuthGuard;
