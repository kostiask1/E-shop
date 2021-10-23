import React from "react"
import { NavLink } from "react-router-dom"
import "./Tout.scss"

const Tout = () => {
    return (
        <div className="Tout">
            <div className="img-wrapper">
                <img
                    src="./main/59d8d068b5b04944459e272c7fe7d99d 1.webp"
                    alt=""
                />
                <img
                    src="./main/aaeef37b370f6b068ba35cd741fb587c 1.webp"
                    alt=""
                />
            </div>
            <div className="text">
                <p>
                    Ми підібрали для тебе варіанти та ідеї рисунків, але ти
                    завжди можеш сам запропонувати свою ідею, та ми виконаємо її
                    на замовлення
                </p>
                <div className="links">
                    <NavLink className="link" to="catalog">
                        Переглянути каталог
                    </NavLink>
                    <a
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://t.me/apollin_ko"
                    >
                        Замовити свій принт
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Tout
