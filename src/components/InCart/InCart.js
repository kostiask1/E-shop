import React, { useState, useContext, useEffect } from "react";
import { catalogContext } from "../../context/catalog/catalog-context";

const InCart = ({ id, ...props }) => {
    const { findInStorage, addToStorage, deleteFromStorage } =
        useContext(catalogContext);

    const [inStorage, setInStorage] = useState(false);

    useEffect(() => {
        setInStorage(findInStorage(id));
        //eslint-disable-next-line
    }, []);

    const addToCart = () => {
        addToStorage(id);
        setInStorage(true);
    };
    const deleteFromCart = () => {
        deleteFromStorage([id]).then(() => {
            if (props.hasOwnProperty("update")) {
                props.update();
            }
        });
        setInStorage(false);
    };

    return inStorage ? (
        <div className="cart-delete">
            <button
                onClick={() => deleteFromCart()}
                className="item-control item-edit"
            >
                {/* <img src="/shopping-cart-remove.svg" alt="remove" width="35" /> */}
                <i className="fas fa-shopping-basket" />
            </button>
        </div>
    ) : (
        <div className="cart-add">
            <button
                className="item-control item-edit"
                data-bs-toggle="modal"
                data-bs-target="#Edit"
                onClick={() => addToCart()}
            >
                {/* <img src="/shopping-cart-add.svg" alt="add" width="35" /> */}
                <i className="fas fa-shopping-basket" />
            </button>
        </div>
    );
};

export default InCart;
