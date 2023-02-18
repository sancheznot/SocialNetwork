import React, { createContext, useState, useEffect } from "react";
import { Global } from "../helpers/Global";

const AuthContext = createContext();
const { Url } = Global;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [counters, setCounter] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    // get token and user from localstorage and set the auth state with them
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    // check if token and user have a value
    if (!token || !user) {
      setLoading(false);
      return false;
    }
    // transform user to object
    const userOBJ = JSON.parse(user);
    const userID = userOBJ.id;
    // request to the server to check if the token is valid
    const request = await fetch(`${Url}/user/profile/${userID}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    });
    const data = await request.json();
    // if the token is valid, set the auth state with the user and token
    const requestCounters = await fetch(`${Url}/user/counters/${userID}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: token,
      },
    });
    const dataCounters = await requestCounters.json();
    setAuth(data.user);
    setCounter(dataCounters);
    setLoading(false);
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth, counters, loading, setCounter }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
