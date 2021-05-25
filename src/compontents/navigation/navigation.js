import React from "react";
import { NavLink } from "react-router-dom";

const SHOP_NAME = process.env.REACT_APP_SHOP_NAME;

export const Navigation = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            {SHOP_NAME}
          </a>
          <div className="navbar">
            <ul className="navbar-nav flex-row me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link pl-3"
                  activeClassName="active"
                  to="/catalog"
                >
                  Catalog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link pl-3"
                  activeClassName="active"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link pl-3"
                  activeClassName="active"
                  to="/delivery"
                >
                  Delivery
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link pl-3"
                  activeClassName="active"
                  to="/contacts"
                >
                  Contacts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link pl-3"
                  activeClassName="active"
                  to="/create"
                >
                  Create
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link pl-3" href="tel:380679029584">
                  +380679029584
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link pl-3" href="tel:380679029584">
                  <i className="fab fa-telegram" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link pl-1"
                  href="https://www.instagram.com/apollin_ko_studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
