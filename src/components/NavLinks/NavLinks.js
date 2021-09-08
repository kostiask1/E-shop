import React, { useState, useEffect } from "react";
import "./NavLinks.scss";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

const NavLinks = ({ width, routes, catalog }) => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        document.addEventListener("mouseup", clickHandler);
        return () => {
            document.removeEventListener("mouseup", clickHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clickHandler = (e) => {
        let inComponent = e.target.matches([".submenu *", ".btn-outline"]);
        if (!inComponent) {
            setOpen(false);
        }
    };
    const handleBtnClick = (e) => {
        e.preventDefault();
        setOpen(!open);
    };
    return (
        <>
            {width < 768 && catalog && (
                <button className="btn-outline" onClick={handleBtnClick}>
                    {open ? "x" : "="}
                </button>
            )}
            <div
                className={`${open ? "slide-in" : ""} navbar-nav ${
                    catalog && "submenu"
                }`}
            >
                {(!catalog || open || width > 767) && (
                    <>
                        <li className="nav-item">
                            {catalog ? (
                                <Link
                                    to="catalog"
                                    spy={true}
                                    smooth={true}
                                    offset={-78}
                                    duration={500}
                                    containerId="page"
                                    activeClass="active"
                                    className="nav-link"
                                >
                                    Catalog
                                </Link>
                            ) : (
                                <NavLink
                                    className="nav-link"
                                    activeClassName="current"
                                    to="/catalog"
                                >
                                    Catalog
                                </NavLink>
                            )}
                        </li>
                        {routes.map(({ to, name }) => {
                            if (catalog) {
                                return (
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
                                );
                            }
                            return null;
                        })}
                    </>
                )}
            </div>
        </>
    );
};

export default NavLinks;
