import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { catalogContext } from "../../../context/catalog/catalog-context";
const LOCAL_STORAGE_KEY = "bloom-shop";

const Cart = (props) => {
  const { data, findWithId } = useContext(catalogContext);
  const [loading, setLoading] = useState("Loading...");

  useEffect(() => {
    promise.then((ids) => {
      findWithId(ids).then(() => {
        if (data.length === 0) {
          setLoading((prev) => (prev = "Nothing was found"));
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCart = () => {
    let storage = localStorage.getItem(LOCAL_STORAGE_KEY) || [];
    if (storage.length > 0) {
      storage = JSON.parse(storage);
    }
    return storage;
  };

  let promise = new Promise((resolve) => resolve(getCart()));

  const deleteFromCart = () => {};

  if (data && data.length > 0) {
    console.log(data);

    return (
      <div className="row">
        {data.map((item) => (
          <div className="col-sm-6 col-md-4 col-xl-3" key={item.id}>
            <div className="item">
              <div className="item-controls">
                <div className="delete">
                  <button
                    onClick={(e) => deleteFromCart(e)}
                    className="item-control item-delete"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <Link to={"/catalog/" + item.id}>
                <img src={item.image} className="item-img" alt={item.text} />
              </Link>
              <div className="item-body">
                <p>{item.text}</p>
                <p>{item.price} UAH</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <h1>{loading}</h1>;
  }
};

export default Cart;
