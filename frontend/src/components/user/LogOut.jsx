import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const LogOut = () => {
  const { setAuth, setCounter } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to login
    setTimeout(() => {
      // clear localstorage
      localStorage.clear();
      // clear auth state
      setAuth({});
      setCounter({});
      navigate("/loading");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 300);
  });
  return <div>LogOut</div>;
};
