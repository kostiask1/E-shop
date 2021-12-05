import React from "react"
import { NavLink } from "react-router-dom"
import "./Tout.scss"

const Tout = () => {
    return (
        <div className="Tout">
            <div className="text">
                <p>
                    Мы подобрали для тебя варианты и идеи рисунков, но ты всегда
                    можешь сам предложить свою идею, и мы выполним ее на заказ.
                </p>
                <div className="links">
                    <NavLink className="link" to="catalog">
                        Просмотреть каталог
                    </NavLink>
                    <a
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://t.me/apollin_ko"
                    >
                        Заказать свой принт
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Tout
