import React, { useContext, useEffect, useState, useRef } from "react"
import { NavLink as RLink, useLocation } from "react-router-dom"
import { authContext } from "../../context/Auth/auth-context"
import { catalogContext } from "../../context/catalog/catalog-context"
import "./navigation.scss"
import { PowerOffIcon, BarsIcon, CartIcon } from "../../icons"
import NavLinks from "./NavLinks/NavLinks"
import { routes } from "../../pages/routes"
import Drawer from "../Drawer/Drawer"
import Cart from "../../components/Cart/Cart"
const SHOP_NAME = process.env.REACT_APP_SHOP_NAME

const Navigation = () => {
    const { storage } = useContext(catalogContext)
    const { admin, logout } = useContext(authContext)
    const [width, setWidth] = useState(() => window.innerWidth)
    let props = useLocation()
    const ref = useRef()
    const navigationRef = useRef()
    const cartRef = useRef()

    useEffect(() => {
        let root = document.getElementById("root")
        document.addEventListener("mouseup", clickMenuListener)
        document.addEventListener("mousemove", mouseMoveListener)
        root.addEventListener("scroll", handleSize)
        return () => {
            document.removeEventListener("mouseup", clickMenuListener)
            document.removeEventListener("mousemove", mouseMoveListener)
            root.removeEventListener("scroll", handleSize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSize = () => {
        let root = document.getElementById("root")
        const distanceY = root.scrollTop,
            shrinkOn = 200
        if (distanceY > shrinkOn) {
            ref.current.classList.add("smaller")
        } else {
            ref.current.classList.remove("smaller")
        }
    }

    const mouseMoveListener = (e) => {
        if (e.screenX === 0) {
            navigationRef.current && navigationRef.current.open()
        }
        if (e.screenX >= window.innerWidth - 20) {
            cartRef.current && cartRef.current.open()
        }
    }

    const clickMenuListener = (e) => {
        let inComponent = e.target.matches(`.navbar__wrapper *`)
        if (!inComponent) {
            navigationRef.current.close()
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (width < 767 && window.innerWidth > 767) {
                navigationRef.current.close()
                return setWidth(window.innerWidth)
            } else if (width >= 767 && window.innerWidth <= 767) {
                return setWidth(window.innerWidth)
            }
        }
        window.removeEventListener("resize", handleResize)
        window.addEventListener("resize", handleResize)
        return (_) => window.removeEventListener("resize", handleResize)
    }, [width])

    const handleClose = () => {
        navigationRef.current.close()
    }
    const handleOpen = () => {
        navigationRef.current.open()
    }

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar__wrapper">
                    <div className="menu-toggler" onClick={handleOpen}>
                        <BarsIcon
                            fill="var(--main-2)"
                            width="3em"
                            height="3em"
                        />
                    </div>
                    <RLink ref={ref} className="navbar-brand" to="/main">
                        {SHOP_NAME}
                    </RLink>
                    <div
                        className="nav-cart"
                        onClick={() => cartRef.current.open()}
                    >
                        <CartIcon fill="var(--main-2)" />
                        {storage.length}
                    </div>
                </div>
            </div>
            <Drawer ref={navigationRef} position="left">
                <ul>
                    <NavLinks
                        close={handleClose}
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
            </Drawer>
            <Drawer ref={cartRef} position="right">
                {cartRef.current && cartRef.current.visible && (
                    <Cart close={cartRef.current.close} />
                )}
            </Drawer>
        </nav>
    )
}
function arePropsEqual(prevProps, nextProps) {
    return prevProps.storage === nextProps.storage
}
export default React.memo(Navigation, arePropsEqual)
