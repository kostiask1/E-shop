import React, { useState, useContext, useEffect } from "react";
import Auth from "../../compontents/Auth/Auth";
import { catalogContext } from "../../context/catalog/catalog-context";

export const Footer = () => {
  const { auth, admin, logout } = useContext(catalogContext);
  const [form, setForm] = useState(false);

  useEffect(() => {
    auth();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="footer text-center">
      <div className="container">
        <div className="row align-items-center mb-3 justify-content-center">
          <a href="tel:380679029584">
            <i className="fab fa-telegram" />
          </a>
          <a
            className="pl-3"
            href="https://www.instagram.com/apollin_ko_studio/"
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
            onClick={() => logout(true)}
            className="btn btn-danger btn-sm mt-2"
          >
            <i className="fas fa-power-off" style={{ fontSize: "12px" }} />
          </button>
        )}
      </div>
    </div>
  );
};
