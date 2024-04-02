import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthGuard = (props) => {
  const isLoggedInUser = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLoggedInUser) {
      navigate("/login", { replace: true });
    }

    if (isLoggedInUser && pathname === "/") {
      navigate("/home", { replace: true });
    }
  }, [isLoggedInUser, navigate, pathname]);

  return <>{isLoggedInUser && props.children}</>;
};

export default AuthGuard;
