import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { catalogContext } from "../../../context/catalog/catalog-context";
import ShopItem from "../../ShopItem/ShopItem";
const LOCAL_STORAGE_KEY = "bloom-shop";

const Cart = (props) => {
  const { data, getById } = useContext(catalogContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCart = () => {
    let storage = localStorage.getItem(LOCAL_STORAGE_KEY) || null;
    if (!storage || storage === "[]") return setRedirect(true);
    if (storage && storage.length > 0) {
      storage = JSON.parse(storage);
    }
    getById(storage);
  };

  const clearCart = () => {
    let promise = new Promise((resolve) => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      resolve(true);
    });
    promise.then(() => {
      setRedirect(true);
    });
  };
  if (redirect) {
    return <Redirect to="/catalog" />;
  }
  if (data && data.length > 0) {
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
    return null;
  }
};

export default Cart;
