import React, { useContext, useEffect, useState } from "react"
import { NavLink as RLink, useLocation } from "react-router-dom"
import { authContext } from "../../context/Auth/auth-context"
import { catalogContext } from "../../context/catalog/catalog-context"
import "./navigation.scss"
import {
    TelegramIcon,
    InstagramIcon,
    PowerOffIcon,
    PhoneIcon,
} from "../../icons"
import NavLinks from "../../components/NavLinks/NavLinks"
import { useTranslation } from "react-i18next"
import { DropDown } from "../../components/DropDown/DropDown"
const SHOP_NAME = process.env.REACT_APP_SHOP_NAME

const Navigation = () => {
    const { storage } = useContext(catalogContext)
    const { admin, logout } = useContext(authContext)
    const { t, i18n } = useTranslation()
    const [language, setLanguage] = useState(i18n.language)

    const [width, setWidth] = useState(() => window.innerWidth)
    let props = useLocation()
    let routes = [
        { to: "about", name: t("nav.about") },
        { to: "delivery", name: t("nav.delivery") },
        { to: "contacts", name: t("nav.contacts") },
    ]

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

    useEffect(() => {
        setLanguage(i18n.language)
    }, [i18n.language])

    const languages = [
        { code: "en", name: "English" },
        { code: "ru", name: "Русский" },
        { code: "ua", name: "Українська" },
    ]

    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="navbar__wrapper">
                        <RLink className="navbar-brand" to="/catalog">
                            {SHOP_NAME}
                        </RLink>
                        <DropDown
                            key={language}
                            defaultValue={language}
                            change={(e) => i18n.changeLanguage(e)}
                            imagesArray={languages.map(
                                (lang) => `/flags/${lang.code}.svg`
                            )}
                            optionsLabels={languages.map((lang) => lang.name)}
                            options={languages.map((lang) => lang.code)}
                            searchable={false}
                            placeholder="Choose a category"
                        ></DropDown>

                        <ul className="navbar-nav">
                            {storage.length > 0 && (
                                <li className="nav-item pop-in">
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
                                        <span>{storage.length}</span>
                                    </RLink>
                                </li>
                            )}
                            <NavLinks
                                width={width}
                                routes={routes}
                                catalog={props.pathname === "/catalog"}
                            />
                            {admin && (
                                <li className="nav-item">
                                    <RLink
                                        className="nav-link"
                                        activeClassName="current"
                                        to="/create"
                                    >
                                        {t('nav.create')}
                                    </RLink>
                                </li>
                            )}
                            <li className="nav-item">
                                <a className="nav-link" href="tel:380679029584">
                                    <PhoneIcon width="1.5em" height="1.5em" />
                                    {width > 767 && "\xa0+380679029584"}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="https://t.me/apollin_ko"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <TelegramIcon width="2em" height="2em" />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="https://www.instagram.com/apollinko_shop/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <InstagramIcon
                                        width="1.8em"
                                        height="1.8em"
                                    />
                                </a>
                            </li>
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

export default Navigation
