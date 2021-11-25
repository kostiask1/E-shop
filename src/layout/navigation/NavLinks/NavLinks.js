import React from "react"
import { Link } from "react-scroll"
import { NavLink } from "react-router-dom"

const NavLinks = ({ routes, main, close }) => {
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
                        Главная
                    </Link>
                ) : (
                    <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/main"
                        onClick={close}
                    >
                        Главная
                    </NavLink>
                )}
            </li>
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/catalog"
                    onClick={close}
                >
                    Каталог
                </NavLink>
            </li>
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
        </>
    )
}

export default NavLinks
