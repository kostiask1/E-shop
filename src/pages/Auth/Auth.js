import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../../context/Auth/auth-context";

const Auth = () => {
    const { login, admin } = useContext(authContext);
    const [loginValue, setLoginValue] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (admin) {
            let path = `/catalog`;
            history.push(path);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [admin]);

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
        <div className="container">
            <form>
                <div>
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        autoComplete="username"
                        onChange={(e) => setLoginValue(e.target.value)}
                        style={{ marginBottom: ".5em" }}
                    />
                </div>
                <div>
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="exampleInputPassword1"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {!admin && (
                    <button
                        onClick={(e) => submitHandler(e)}
                        className="btn btn-primary"
                        id="login"
                        style={{ marginTop: "1em" }}
                    >
                        Log In
                    </button>
                )}
            </form>
        </div>
    );
};

export default Auth;
