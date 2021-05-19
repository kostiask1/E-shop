import React from "react";
import { Link } from "react-router-dom";
import "./ShopItem.css";

const ShopItem = (props) => {
  return (
    <div className="col-sm-6 col-md-4 col-xl-3">
      <div className="item">
        <Link to={"/catalog/" + props.id}>
          <img src={props.src} className="item-img" alt={props.text} />
        </Link>
        <div className="item-body">
          <p>{props.text}</p>
          <p>{props.price} uah</p>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
