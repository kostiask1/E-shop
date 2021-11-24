import React from "react"
import { Link } from "react-router-dom"
import { Times } from "../../../icons"
import "./ShortItem.scss"

const ShortItem = (props) => {
    const { id, text, price, discountPrice, close, deleteFromStorage } = props
    return (
        <div className="cart-item pop-in">
            <Link to={"/catalog/" + id} onClick={close}>
                <span className="item-name">{text} - </span>
            </Link>
            {!discountPrice ? (
                <span className="price-default">{price} грн</span>
            ) : (
                <span className="price-now">{discountPrice} грн</span>
            )}
            <span onClick={() => deleteFromStorage([id])}>
                <Times
                    width="14px"
                    height="14px"
                    strokeWidth="8px"
                    fill="var(--main-2)"
                />
            </span>
        </div>
    )
}

export default ShortItem
