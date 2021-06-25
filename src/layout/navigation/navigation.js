import React, { useContext } from "react";
import { NavLink as RLink, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { authContext } from "../../context/Auth/auth-context";
const SHOP_NAME = process.env.REACT_APP_SHOP_NAME;

export const Navigation = () => {
    const { admin } = useContext(authContext);

    let props = useLocation();

    let routes = [
        { to: "about", name: "About" },
        { to: "delivery", name: "Delivery" },
        { to: "contacts", name: "Contacts" },
    ];

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <RLink className="navbar-brand" to="/catalog">
                        {SHOP_NAME}
                    </RLink>
                    <div className="navbar">
                        <ul className="navbar-nav flex-row me-auto mb-2 mb-lg-0">
                            <li className="nav-item" style={{ marginTop: 5 }}>
                                <RLink to="/cart">
                                    <img
                                        src="/shopping-cart.svg"
                                        alt=""
                                        style={{ width: 30 }}
                                    />
                                </RLink>
                            </li>
                            <li className="nav-item">
                                {props.pathname === "/catalog" ? (
                                    <Link
                                        to="catalog"
                                        spy={true}
                                        smooth={true}
                                        offset={570}
                                        duration={500}
                                        containerId="page"
                                        activeClass="active"
                                        className="nav-link pl-3"
                                    >
                                        Catalog
                                    </Link>
                                ) : (
                                    <RLink
                                        className="nav-link pl-3"
                                        activeClassName="current"
                                        to="/catalog"
                                    >
                                        Catalog
                                    </RLink>
                                )}
                            </li>
                            {routes.map(({ to, name }) => {
                                if (props.pathname === "/catalog") {
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
                                                className="nav-link pl-3"
                                            >
                                                {name}
                                            </Link>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                            {admin && (
                                <li className="nav-item">
                                    <RLink
                                        className="nav-link pl-3"
                                        activeClassName="current"
                                        to="/create"
                                    >
                                        Create
                                    </RLink>
                                </li>
                            )}
                            <li className="nav-item">
                                <a
                                    className="nav-link pl-3"
                                    href="tel:380679029584"
                                >
                                    +380679029584
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link pl-3"
                                    href="tel:380679029584"
                                >
                                    <i className="fab fa-telegram" />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link pl-1"
                                    href="https://www.instagram.com/apollin_ko_shop/"
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
