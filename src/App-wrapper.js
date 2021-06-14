import React from "react";
import App from "./App";
import { AuthState } from "./context/Auth/auth-state";

const AppWrapper = () => {
  return (
    <AuthState>
      <App />
    </AuthState>
  );
};

export default AppWrapper;
