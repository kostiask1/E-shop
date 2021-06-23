import React, { useContext, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { catalogContext } from "../../context/catalog/catalog-context";

import { app } from "../../base";
const Modal = lazy(() => import("../Modal/Modal"));
const ItemCreator = lazy(() => import("../ItemCreator/ItemCreator"));
const db = app.firestore();
const LOCAL_STORAGE_KEY = "bloom-shop";

const ShopItem = (props) => {
  const { filterData, getData } = useContext(catalogContext);
  const modal = useRef(null);

  const handleUpdate = () => {
    let get = Promise.resolve(getData());
    get.then(() => filterData());
  };

  let addToCart, deleteFromCart, deleteItem, getCart;

  if (props.functions.deleteItem) {
    deleteItem = () => {
      let item = db.collection("All").where("id", "==", props.id);
      item.get().then(function (querySnapshot) {
        querySnapshot.docs[0].ref.delete().then(() => {
          filterData();
        });
      });
    };
  }

  if (props.functions.hasOwnProperty("getCart")) {
    getCart = props.functions.getCart;
  }

  if (props.functions.addToCart) {
    addToCart = () => {
      let storage = localStorage.getItem(LOCAL_STORAGE_KEY) || [];
      if (storage.length > 0) {
        storage = JSON.parse(storage);
      }
      if (storage.includes(props.id)) return;
      storage = storage.concat(props.id);
      storage = JSON.stringify(storage);
      console.log(storage);
      localStorage.setItem(LOCAL_STORAGE_KEY, storage);
    };
  }

  if (props.functions.deleteFromCart) {
    deleteFromCart = () => {
      let promise = new Promise((resolve) => {
        console.log(props.id);
        let storage = localStorage.getItem(LOCAL_STORAGE_KEY);
        storage = JSON.parse(storage);
        storage.splice(storage.indexOf(props.id), 1);
        storage = JSON.stringify(storage);
        localStorage.setItem(LOCAL_STORAGE_KEY, storage);
        resolve(true);
      });
      promise.then(getCart());
    };
  }

  return (
    <>
      <div className="col-sm-6 col-md-4 col-xl-3">
        <div className="item">
          <div className="item-controls">
            {props.functions.addToCart && (
              <div className="cart">
                <button
                  className="item-control item-edit"
                  data-bs-toggle="modal"
                  data-bs-target="#Edit"
                  onClick={() => addToCart()}
                >
                  <i className="fas fa-shopping-cart" />
                </button>
              </div>
            )}
            {props.admin ? (
              <div className="edit">
                <button
                  className="item-control item-edit"
                  data-bs-toggle="modal"
                  data-bs-target="#Edit"
                  onClick={() => modal.current.open()}
                >
                  <i className="fas fa-pen" />
                </button>
              </div>
            ) : null}
            {props.admin ? (
              <div className="delete">
                <button
                  onClick={() => deleteItem()}
                  className="item-control item-delete"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            ) : null}
            {props.functions.deleteFromCart && (
              <div className="delete">
                <button
                  onClick={(e) => deleteFromCart(e)}
                  className="item-control item-delete"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            )}
          </div>
          <Link to={"/catalog/" + props.id}>
            <img src={props.image} className="item-img" alt={props.text} />
          </Link>
          <div className="item-body">
            <p>{props.text}</p>
            <p>{props.price} UAH</p>
          </div>
        </div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Modal ref={modal} size="lg">
          <ItemCreator
            title={props.text}
            image={props.image}
            id={props.id}
            description={props.description}
            price={props.price}
            category={props.category}
            close={() => modal.current.close()}
            find={() => handleUpdate()}
          />
        </Modal>
      </Suspense>
    </>
  );
};

export default ShopItem;
