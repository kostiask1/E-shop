import React from "react"
import "./footer.scss"
import { TelegramIcon, InstagramIcon } from "../../icons"
export const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <a href="tel:380679029584">
                        <TelegramIcon fill="#fff" width="48" height="48" />
                    </a>
                    <a
                        href="https://www.instagram.com/apollin_ko_shop/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <InstagramIcon fill="#fff" width="42" height="42" />
                    </a>
                </div>
            </div>
        </div>
    )
}
