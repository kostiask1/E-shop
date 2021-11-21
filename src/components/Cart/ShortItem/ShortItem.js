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
                <span className="price-default">{price} uah</span>
            ) : (
                <span className="price-now">{discountPrice} uah</span>
            )}
            <span onClick={() => deleteFromStorage([id])}>
                <Times
                    width="14px"
                    height="14px"
                    strokeWidth="12px"
                    fill="var(--alert)"
                />
            </span>
        </div>
    )
}

export default ShortItem
