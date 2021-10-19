import React, { useState, useEffect } from "react"
import "./NavLinks.scss"
import { Link } from "react-scroll"
import { NavLink } from "react-router-dom"

const NavLinks = ({ width, routes, main }) => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        document.addEventListener("mouseup", clickHandler)
        return () => {
            document.removeEventListener("mouseup", clickHandler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const clickHandler = (e) => {
        let inComponent = e.target.matches([".submenu *", ".btn-outline"])
        if (!inComponent) {
            setOpen(false)
        }
    }
    const handleBtnClick = (e) => {
        e.preventDefault()
        setOpen(!open)
    }
    return (
        <>
            {width < 768 && main && (
                <button className="btn-outline" onClick={handleBtnClick}>
                    {open ? "x" : "="}
                </button>
            )}
            <div
                className={`${open ? "slide-in" : ""} navbar-nav ${
                    main && "submenu"
                }`}
            >
                {(!main || open || width > 767) && (
                    <>
                        <li className="nav-item">
                            {main ? (
                                <Link
                                    to="main"
                                    spy={true}
                                    smooth={true}
                                    offset={-78}
                                    duration={500}
                                    containerId="page"
                                    activeClass="active"
                                    className="nav-link"
                                >
                                    Main
                                </Link>
                            ) : (
                                <NavLink
                                    className="nav-link"
                                    activeClassName="current"
                                    to="/main"
                                >
                                    Main
                                </NavLink>
                            )}
                        </li>
                        <div className="nav-item">
                            <NavLink
                                className="nav-link"
                                activeClassName="current"
                                to="/catalog"
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
                                          containerId="page"
                                          activeClass="active"
                                          className="nav-link"
                                      >
                                          {name}
                                      </Link>
                                  </li>
                              ))
                            : null}
                    </>
                )}
            </div>
        </>
    )
}

export default NavLinks
