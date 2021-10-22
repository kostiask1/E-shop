import React, { useContext, useEffect, useState, useRef } from "react"
import { NavLink as RLink, useLocation } from "react-router-dom"
import { authContext } from "../../context/Auth/auth-context"
import { catalogContext } from "../../context/catalog/catalog-context"
import "./navigation.scss"
import { PowerOffIcon, DeleteIcon, BarsIcon } from "../../icons"
import NavLinks from "./NavLinks/NavLinks"
import { routes } from "../../pages/routes"
const SHOP_NAME = process.env.REACT_APP_SHOP_NAME

const Navigation = () => {
    const { storage } = useContext(catalogContext)
    const { admin, logout } = useContext(authContext)
    const [width, setWidth] = useState(() => window.innerWidth)
    const [isOpen, setIsOpen] = useState(false)
    let props = useLocation()
    const ref = useRef()

    useEffect(() => {
        document.addEventListener("mouseup", clickMenuListener)
        return () => {
            document.removeEventListener("mouseup", clickMenuListener)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const clickMenuListener = (e) => {
        let inComponent = e.target.matches(`.navbar__wrapper *`)
        if (!inComponent) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--sticky-offset",
            width > 767 ? -ref.current.clientHeight + "px" : 0
        )
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
                        {width < 767 && (
                            <div
                                className="menu-toggler"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <DeleteIcon /> : <BarsIcon />}
                            </div>
                        )}
                        <RLink ref={ref} className="navbar-brand" to="/main">
                            {SHOP_NAME}
                        </RLink>
                        <ul className={`navbar-nav ${isOpen ? "opened" : ""}`}>
                            <NavLinks
                                setIsOpen={setIsOpen}
                                storage={storage}
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
