import React from "react"
import "./NavLinks.scss"
import { Link } from "react-scroll"
import { NavLink } from "react-router-dom"

const NavLinks = ({ routes, main, storage, close }) => {
    return (
        <>
            <li className="nav-item">
                {main ? (
                    <Link
                        to="main"
                        spy={true}
                        smooth={true}
                        offset={-150}
                        duration={500}
                        containerId="root"
                        activeClass="active"
                        className="nav-link"
                        onClick={close}
                    >
                        Main
                    </Link>
                ) : (
                    <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/main"
                        onClick={close}
                    >
                        Main
                    </NavLink>
                )}
            </li>
            <div className="nav-item">
                <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/catalog"
                    onClick={close}
                >
                    Catalog
                </NavLink>
            </div>
            {main
                ? routes.map(({ to, name }) => (
                      <li className="nav-item" key={name}>
                          <Link
                              to={to}
                              spy={true}
                              smooth={true}
                              offset={-125}
                              duration={500}
                              containerId="root"
                              activeClass="active"
                              className="nav-link fade-in"
                              onClick={close}
                          >
                              {name}
                          </Link>
                      </li>
                  ))
                : null}
            {storage.length > 0 && (
                <li className="nav-item pop-in">
                    <NavLink
                        activeClassName="active"
                        to="/cart"
                        onClick={close}
                    >
                        Cart
                        <div className="counter">
                            <div id="burst-8"></div>
                            <span className="cart-counter">
                                {storage.length}
                            </span>
                        </div>
                    </NavLink>
                </li>
            )}
        </>
    )
}

export default NavLinks
