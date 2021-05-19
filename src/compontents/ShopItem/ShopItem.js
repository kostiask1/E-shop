import React from "react";
import { Link } from "react-router-dom";
import "./ShopItem.css";

const ShopItem = (props) => {
  return (
    <div className="col-sm-6 col-lg-3 ">
      <div className="item">
        <Link to={"/catalog/" + props.id}>
          <img src={props.src} className="item-img" alt={props.text} />
        </Link>
        <div className="item-body">
          <p>{props.text}</p>
          <p>{props.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
