import React, { useContext } from "react";
import { NavLink as RLink, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import { authContext } from "../../context/Auth/auth-context";
import { catalogContext } from "../../context/catalog/catalog-context";
const SHOP_NAME = process.env.REACT_APP_SHOP_NAME;

const Navigation = () => {
    const { storage } = useContext(catalogContext);
    const { admin } = useContext(authContext);
    let props = useLocation();
    let screenWidth = document.documentElement.clientWidth;
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
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" style={{ marginTop: 5 }}>
                                <RLink to="/cart">
                                    <img
                                        src="/shopping-cart.svg"
                                        alt=""
                                        width="25"
                                        height="25"
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
                                    {screenWidth > 450 && +380679029584}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="tel:380679029584">
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
