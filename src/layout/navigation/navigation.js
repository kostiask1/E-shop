import React, { useContext } from "react";
import { NavLink as RLink, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { authContext } from "../../context/Auth/auth-context";
import { catalogContext } from "../../context/catalog/catalog-context";
import "./navigation.scss";
const SHOP_NAME = process.env.REACT_APP_SHOP_NAME;

const Navigation = () => {
    const { storage } = useContext(catalogContext);
    const { admin, logout } = useContext(authContext);
    let props = useLocation();
    let screenWidth = document.documentElement.clientWidth;
    let routes = [
        { to: "about", name: "About" },
        { to: "delivery", name: "Delivery" },
        { to: "contacts", name: "Contacts" },
    ];
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="navbar__wrapper">
                        <RLink className="navbar-brand" to="/catalog">
                            {SHOP_NAME}
                        </RLink>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <RLink to="/cart">
                                    <img
                                        src="/cart.png"
                                        alt=""
                                        width="30"
                                        height="30"
                                        style={{
                                            filter: "brightness(0%)",
                                        }}
                                    />
                                    {storage.length > 0 && (
                                        <span>{storage.length}</span>
                                    )}
                                </RLink>
                            </li>
                            <li className="nav-item">
                                {props.pathname === "/catalog" ? (
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
                                    <RLink
                                        className="nav-link"
                                        activeClassName="current"
                                        to="/catalog"
                                    >
                                        Catalog
                                    </RLink>
                                )}
                            </li>
                            {routes.map(({ to, name }) => {
                                if (
                                    props.pathname === "/catalog" &&
                                    screenWidth > 767
                                ) {
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
                            {admin && (
                                <li className="nav-item">
                                    <RLink
                                        className="nav-link"
                                        activeClassName="current"
                                        to="/create"
                                    >
                                        Create
                                    </RLink>
                                </li>
                            )}
                            <li className="nav-item">
                                <a className="nav-link" href="tel:380679029584">
                                    <i className="fa fa-phone" />
                                    &nbsp;
                                    {screenWidth > 450 && +380679029584}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="https://t.me/apollin_ko"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-telegram" />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="https://www.instagram.com/apollin_ko_shop/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-instagram" />
                                </a>
                            </li>
                            {admin && (
                                <li className="nav-item">
                                    <div className="nav-link">
                                        <button
                                            onClick={() => logout()}
                                            className="btn btn-danger"
                                        >
                                            <i className="fas fa-power-off" />
                                        </button>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};
function arePropsEqual(prevProps, nextProps) {
    return prevProps.storage === nextProps.storage;
}
export default React.memo(Navigation, arePropsEqual);
