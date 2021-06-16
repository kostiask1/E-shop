import React, { useState, useContext } from "react";
import { authContext } from "../../context/Auth/auth-context";

const Auth = () => {
  const { login, admin } = useContext(authContext);
  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const authData = {
      email: loginValue,
      password,
      returnSecureToken: true,
      type: e.target.id,
    };
    login(authData);
  };

  console.log(admin);

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => setLoginValue(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-around">
        {!admin && (
          <>
            <button
              onClick={(e) => submitHandler(e)}
              className="btn btn-primary"
              id="login"
            >
              Log In
            </button>
            {/* <button
              onClick={(e) => submitHandler(e)}
              className="btn btn-primary"
              id="signup"
            >
              Sign Up
            </button> */}
          </>
        )}
      </div>
    </form>
  );
};

export default Auth;
