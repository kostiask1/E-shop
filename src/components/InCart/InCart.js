import React, { useState, useContext, useEffect } from "react"
import { catalogContext } from "../../context/catalog/catalog-context"
import { CartIcon } from "../../icons"

const InCart = ({ id, ...props }) => {
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
                    className="item-control in-cart"
                >
                    В корзине
                </button>
            ) : (
                <button className="item-control" onClick={() => addToCart()}>
                    Добавить в корзину
                </button>
            )}
        </div>
    )
}

export default InCart
