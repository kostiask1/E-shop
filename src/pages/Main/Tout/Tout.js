import React from "react"
import { NavLink } from "react-router-dom"
import "./Tout.scss"

const Tout = () => {
    return (
        <div className="Tout">
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
