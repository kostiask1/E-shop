import React, { useState, useContext, useEffect } from "react";
import { catalogContext } from "../../context/catalog/catalog-context";

const InCart = ({ id }) => {
    const {
        findInStorage,
        addToStorage,
        deleteFromStorage,
    } = useContext(catalogContext);

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
        deleteFromStorage(id);
        setInStorage(false);
    };

    return inStorage ? (
        <div className="delete">
            <button
                onClick={() => deleteFromCart()}
                className="item-control item-edit"
            >
                <img
                    src="/shopping-cart-remove.svg"
                    alt=""
                    style={{ width: 45 }}
                />
            </button>
        </div>
    ) : (
        <div className="cart">
            <button
                className="item-control item-edit"
                data-bs-toggle="modal"
                data-bs-target="#Edit"
                onClick={() => addToCart()}
            >
                <img
                    src="/shopping-cart-add.svg"
                    alt=""
                    style={{ width: 45 }}
                />
            </button>
        </div>
    );
};

export default InCart;
