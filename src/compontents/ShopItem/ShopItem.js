import React from "react";
import { Link } from "react-router-dom";
import "./ShopItem.css";

const ShopItem = (props) => {
  return (
    <div className="col-sm-6 col-md-4 col-xl-3">
      <div className="item">
        <div className="item-controls">
          <div className="edit">
            <Link className="item-control item-edit" to="/">
              <i className="fas fa-pen" />
            </Link>
          </div>
          <div className="delete">
            <button className="item-control item-delete">
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        <Link to={"/catalog/" + props.id}>
          <img src={props.src} className="item-img" alt={props.text} />
        </Link>
        <div className="item-body">
          <p>{props.text}</p>
          <p>{props.price} UAH</p>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
