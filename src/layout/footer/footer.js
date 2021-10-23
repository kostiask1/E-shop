import React, { useContext, useState, useEffect } from "react"
import "./footer.scss"
import { TelegramIcon, InstagramIcon } from "../../icons"
import { catalogContext } from "../../context/catalog/catalog-context"
export const Footer = () => {
    const { data } = useContext(catalogContext)
    const [clone, setClone] = useState([])
    const [width, setWidth] = useState(() => window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            return setWidth(window.innerWidth)
        }
        window.removeEventListener("resize", handleResize)
        window.addEventListener("resize", handleResize)
        return (_) => window.removeEventListener("resize", handleResize)
    }, [width])

    useEffect(() => {
        let newClone = [...data]
        newClone.sort((a, b) => {
            if (+a.boughtCount < +b.boughtCount) {
                return 1
            }
            if (+a.boughtCount > +b.boughtCount) {
                return -1
            }
            return 0
        })
        newClone = newClone.splice(0, Math.floor(window.innerWidth / 350))
        setClone(newClone)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, width])

    console.log(clone)
    if (clone.length) {
        return (
            <div className="footer">
                <div className="container">
                    <div className="container-fluid">
                        <div className="blocks-wrapper">
                            <div className="block-sm">
                                <h4>About us</h4>
                                <ul>
                                    <li>Доставка і оплата</li>
                                    <li>Контакти</li>
                                </ul>
                            </div>
                            <div className="block-lg">
                                <b>Catalog</b>
                                <div className="showcase">
                                    {clone.map((item) => (
                                        <div key={item.id}>
                                            <img
                                                src={item.imagesArray[0]}
                                                alt={item.imagesArray[0]}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <a href="tel:380679029584">
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
        )
    } else return null
}
