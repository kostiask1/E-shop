import React, { lazy, Suspense, useRef } from "react"
import "./footer.scss"
import { TelegramIcon, InstagramIcon } from "../../icons"
const Modal = lazy(() => import("../../components/Modal/Modal"))
export const Footer = () => {
    const rights = useRef()
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="developer">
                        Developed by&nbsp;
                        <a
                            href="https://www.linkedin.com/in/constantine-front/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Constantine
                        </a>
                    </div>
                    <div
                        className="rights"
                        onClick={() => rights.current && rights.current.open()}
                    >
                        &copy; Все права защищены.
                    </div>
                    <div>
                        <div className="links">
                            <a
                                href="https://t.me/apollin_ko"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TelegramIcon
                                    fill="#fff"
                                    width="48"
                                    height="48"
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/apollin_ko_shop/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <InstagramIcon
                                    fill="#fff"
                                    width="42"
                                    height="42"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Suspense fallback={<p></p>}>
                <Modal ref={rights} size="lg">
                    <div>teet</div>
                </Modal>
            </Suspense>
        </div>
    )
}
