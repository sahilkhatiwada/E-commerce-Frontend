import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GuestGuard = (props) => {
  const loggedInUser = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/home", { replace: true });
    }

    if (pathname === "/" && !loggedInUser) {
      navigate("/login", { replace: true });
    }
  }, [loggedInUser, navigate, pathname]);

  return <>{!loggedInUser && props.children}</>;
};

export default GuestGuard;
