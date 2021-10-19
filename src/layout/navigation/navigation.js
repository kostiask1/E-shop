import React, { useContext, useEffect, useState, useRef } from "react"
import { NavLink as RLink, useLocation } from "react-router-dom"
import { authContext } from "../../context/Auth/auth-context"
import { catalogContext } from "../../context/catalog/catalog-context"
import "./navigation.scss"
import { PowerOffIcon } from "../../icons"
import NavLinks from "../../components/NavLinks/NavLinks"
import { routes } from "../../pages/routes"
const SHOP_NAME = process.env.REACT_APP_SHOP_NAME

const Navigation = () => {
    const { storage } = useContext(catalogContext)
    const { admin, logout } = useContext(authContext)
    const [width, setWidth] = useState(() => window.innerWidth)
    let props = useLocation()
    const ref = useRef()
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--sticky-offset",
            -ref.current.clientHeight + "px"
        )
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (width < 767 && window.innerWidth > 767) {
                return setWidth(window.innerWidth)
            } else if (width >= 767 && window.innerWidth <= 767) {
                return setWidth(window.innerWidth)
            }
        }
        window.removeEventListener("resize", handleResize)
        window.addEventListener("resize", handleResize)
        return (_) => window.removeEventListener("resize", handleResize)
    }, [width])
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="navbar__wrapper">
                        <RLink ref={ref} className="navbar-brand" to="/catalog">
                            {SHOP_NAME}
                        </RLink>
                        <ul className="navbar-nav">
                            {storage.length > 0 && (
                                <li className="nav-item pop-in">
                                    <RLink to="/cart">
                                        <span className="cart-link">Cart</span>
                                        <span className="cart-counter">
                                            {storage.length}
                                        </span>
                                    </RLink>
                                </li>
                            )}
                            <NavLinks
                                width={width}
                                routes={routes}
                                main={props.pathname === "/main"}
                            />
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
                            {admin && (
                                <li className="nav-item">
                                    <div className="nav-link">
                                        <button
                                            onClick={() => logout()}
                                            className="btn btn-danger"
                                        >
                                            <PowerOffIcon
                                                width="1.5em"
                                                height="1.5em"
                                                fill="var(--main)"
                                            />
                                        </button>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
function arePropsEqual(prevProps, nextProps) {
    return prevProps.storage === nextProps.storage
}
export default React.memo(Navigation, arePropsEqual)
