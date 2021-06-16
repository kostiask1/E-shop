import React, { useReducer } from "react";
import axios from "axios";
import { authReducer } from "./auth-reducer";
import { authContext } from "./auth-context";
const LOGIN = "LOGIN";

export const AuthState = ({ children }) => {
  const initialState = {
    admin: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credits) => {
    let url = "";
    credits.type === "login"
      ? (url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACbkEzWwbaNw9RYxCQxaMygVljKavpdxg")
      : credits.type === "signup"
      ? (url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACbkEzWwbaNw9RYxCQxaMygVljKavpdxg")
      : (url = false);
    if (!url) return false;

    const request = axios.post(url, credits);
    request.then((response) => {
      let data = response.data;
      console.log(response);

      const expirationDate = new Date(new Date().getTime() + 36 * 1000);
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userId", data.localId);
      localStorage.setItem("expirationDate", expirationDate);
      auth();
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    dispatch({ type: LOGIN, payload: false });
  };

  const auth = () => {
    if (
      new Date(localStorage.getItem("expirationDate")) >=
        new Date().getTime() &&
      localStorage.getItem("token")
    ) {
      let expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem("expirationDate", expirationDate);
      return dispatch({ type: LOGIN, payload: true });
    } else {
      return logout();
    }
  };

  const { admin } = state;

  return (
    <authContext.Provider
      value={{
        login,
        auth,
        logout,
        admin,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
