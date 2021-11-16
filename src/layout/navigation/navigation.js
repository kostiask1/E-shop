import React, { useContext, useEffect, useState, useRef } from "react"
import { NavLink as RLink, useLocation } from "react-router-dom"
import { authContext } from "../../context/Auth/auth-context"
import { catalogContext } from "../../context/catalog/catalog-context"
import "./navigation.scss"
import { PowerOffIcon, BarsIcon, CartIcon } from "../../icons"
import NavLinks from "./NavLinks/NavLinks"
import { routes } from "../../pages/routes"
import Drawer from "../../components/Drawer/Drawer"
const SHOP_NAME = process.env.REACT_APP_SHOP_NAME

const Navigation = () => {
    const { storage } = useContext(catalogContext)
    const { admin, logout } = useContext(authContext)
    const [width, setWidth] = useState(() => window.innerWidth)
    let props = useLocation()
    const ref = useRef()
    const drawer = useRef()

    useEffect(() => {
        let root = document.getElementById("root")
        document.addEventListener("mouseup", clickMenuListener)
        root.addEventListener("scroll", handleSize)
        return () => {
            document.removeEventListener("mouseup", clickMenuListener)
            root.removeEventListener("scroll", handleSize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSize = () => {
        let root = document.getElementById("root")
        const distanceY = root.scrollTop,
            shrinkOn = 200
        console.log(distanceY)
        if (distanceY > shrinkOn) {
            ref.current.classList.add("smaller")
        } else {
            ref.current.classList.remove("smaller")
        }
    }

    const clickMenuListener = (e) => {
        let inComponent = e.target.matches(`.navbar__wrapper *`)
        if (!inComponent) {
            drawer.current.close()
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (width < 767 && window.innerWidth > 767) {
                drawer.current.close()
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
        drawer.current.close()
    }
    const handleOpen = () => {
        drawer.current.open()
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
                    <RLink className="nav-cart" to="/cart">
                        <CartIcon fill="var(--main-2)" />
                    </RLink>
                </div>
            </div>
            <Drawer ref={drawer}>
                <NavLinks
                    close={handleClose}
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
            </Drawer>
        </nav>
    )
}
function arePropsEqual(prevProps, nextProps) {
    return prevProps.storage === nextProps.storage
}
export default React.memo(Navigation, arePropsEqual)
