import React from "react";
import "./footer.scss";
export const Footer = () => {
    return (
        <div className="footer ">
            <div className="container">
                <div className="row">
                    <a href="tel:380679029584">
                        <i className="fab fa-telegram" />
                    </a>
                    <a
                        href="https://www.instagram.com/apollin_ko_shop/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-instagram" />
                    </a>
                </div>
            </div>
        </div>
    );
};
