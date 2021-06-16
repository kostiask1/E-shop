import React, { useState, useContext } from "react";
import { authContext } from "../../context/Auth/auth-context";
import Auth from "../Auth/Auth";

export const Footer = () => {
  const { admin, logout } = useContext(authContext);
  const [form, setForm] = useState(false);

  return (
    <div className="footer text-center">
      <div className="container">
        <div className="row align-items-center mb-3 justify-content-center">
          <a href="tel:380679029584">
            <i className="fab fa-telegram" />
          </a>
          <a
            className="pl-3"
            href="https://www.instagram.com/apollin_ko_shop/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram" />
          </a>
        </div>
        {!admin ? (
          <button
            className="m-auto btn btn-dark"
            onClick={() => setForm(!form)}
          >
            Authorize
          </button>
        ) : null}
        {!admin && form ? (
          <div className="col-3 ml-auto mr-auto mt-5">
            <Auth />
          </div>
        ) : null}
        {admin && (
          <button
            onClick={() => logout()}
            className="btn btn-danger btn-sm mt-2"
          >
            <i className="fas fa-power-off" style={{ fontSize: "12px" }} />
          </button>
        )}
      </div>
    </div>
  );
};
