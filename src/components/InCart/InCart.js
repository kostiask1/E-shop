import React, { useState, useContext, useEffect } from "react";
import { catalogContext } from "../../context/catalog/catalog-context";
import { CartIcon, CartRemoveIcon } from '../../icons';

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
                <CartIcon fill="var(--success)" viewbox="0 0 24 20" />
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
                <CartRemoveIcon fill="var(--alert)" viewbox="0 0 24 20" />
            </button>
        </div>
    );
};

export default InCart;
