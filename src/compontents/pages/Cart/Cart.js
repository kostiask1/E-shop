import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { catalogContext } from "../../../context/catalog/catalog-context";
import ShopItem from "../../ShopItem/ShopItem";
const LOCAL_STORAGE_KEY = "bloom-shop";

const Cart = (props) => {
  const { data, findWithId } = useContext(catalogContext);
  const [loading, setLoading] = useState("Loading...");

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCart = () => {
    let promise = new Promise((resolve) => {
      let storage = localStorage.getItem(LOCAL_STORAGE_KEY) || null;
      if (storage && storage.length > 0) {
        storage = JSON.parse(storage);
      }
      resolve(storage);
    });
    promise.then((ids) => {
      findWithId(ids).then(() => {
        if (data.length === 0) {
          setLoading((prev) => (prev = "Cart is empty"));
        }
      });
    });
  };

  const clearCart = () => {
    let promise = new Promise((resolve) => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      resolve(true);
    });
    promise.then(() => {
      findWithId().then(setLoading((prev) => (prev = "Cart is empty")));
    });
  };

  if (data && data.length > 0) {
    console.log(data);

    return (
      <div className="container-fluid">
        <div className="row">
          {data.map((item) => (
            <ShopItem
              key={item.id}
              id={item.id}
              text={item.text}
              image={item.image}
              category={item.category}
              description={item.description}
              price={item.price}
              functions={{
                deleteFromCart: true,
                getCart: () => getCart(),
              }}
            ></ShopItem>
          ))}
        </div>
        <button className="btn btn-sm btn-danger" onClick={() => clearCart()}>
          Clear cart
        </button>
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <Link to={"/catalog"}>
          <h1>{loading} go to catalog --></h1>
        </Link>
      </div>
    );
  }
};

export default Cart;
