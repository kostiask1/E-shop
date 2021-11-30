import React, { useState, useContext, useEffect } from "react"
import { catalogContext } from "../../context/catalog/catalog-context"

const InCart = ({ id, inCard = false, ...props }) => {
    const { findInStorage, addToStorage, deleteFromStorage, storage } =
        useContext(catalogContext)

    const [inStorage, setInStorage] = useState(false)

    useEffect(() => {
        setInStorage(findInStorage(id))
        //eslint-disable-next-line
    }, [storage.length])

    const addToCart = () => {
        addToStorage(id)
        setInStorage(true)
    }
    const deleteFromCart = () => {
        deleteFromStorage([id]).then(() => {
            if (props.hasOwnProperty("update")) {
                props.update()
            }
        })
        setInStorage(false)
    }

    return (
        <div className="cart-control">
            {inStorage ? (
                <button
                    onClick={() => deleteFromCart()}
                    className="item-control cart-in"
                >
                    В корзине
                </button>
            ) : (
                <button
                    className="item-control cart-out"
                    onClick={() => addToCart()}
                >
                    {!inCard ? "Добавить в корзину" : "В корзину"}
                </button>
            )}
        </div>
    )
}

export default InCart
