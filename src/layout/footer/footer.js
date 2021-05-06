import React, { useState } from "react";
import Auth from "../../compontents/Auth/Auth";

export const Footer = () => {
  const [auth, setAuth] = useState(false);
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
        <button className="m-auto btn btn-dark" onClick={() => setAuth(!auth)}>
          Authorize
        </button>
      </div>
      {auth ? (
        <div className="col-3 ml-auto mr-auto mt-5">
          <Auth />
        </div>
      ) : null}
    </div>
  );
};
