import React from "react"
import { Link } from "react-router-dom"
import { Times } from "../../../icons"
import "./ShortItem.scss"

const ShortItem = (props) => {
  const {
    id,
    text,
    price,
    discountPrice,
    close,
    deleteFromStorage,
    idx,
  } = props
  return (
    <div
      className="cart-item pop-in"
      style={{ animationDelay: 40 + 40 * idx + "ms" }}
    >
      <Link to={"/catalog/" + id} onClick={close}>
        <span className="item-name">{text}</span>
      </Link>
      <div className="flex">
        {!discountPrice ? (
          <span className="price">{price} грн</span>
        ) : (
          <span className="price">{discountPrice} грн</span>
        )}
        <span className="times" onClick={() => deleteFromStorage([id])}>
          <Times
            width="13px"
            height="13px"
            strokeWidth="5px"
            fill="var(--main-2)"
          />
        </span>
      </div>
    </div>
  )
}

export default ShortItem
