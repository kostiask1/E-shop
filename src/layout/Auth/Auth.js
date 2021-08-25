import React, { useState, useContext } from "react";
import { authContext } from "../../context/Auth/auth-context";

const Auth = () => {
    const { login, admin, logout } = useContext(authContext);
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

    return (
        <div className="col-3 ml-auto mr-auto mt-5">
            {!admin && (
                <>
                    <h2>Authorize</h2>
                    <form>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                autoComplete="username"
                                onChange={(e) => setLoginValue(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                autoComplete="current-password"
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
                </>
            )}
            {admin && (
                <div className="text-center">
                    <button
                        onClick={() => logout()}
                        className="btn btn-danger btn-sm mt-2"
                        style={{
                            padding: 11,
                            lineHeight: 0,
                        }}
                    >
                        <i
                            className="fas fa-power-off"
                            style={{
                                fontSize: 15,
                            }}
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Auth;
