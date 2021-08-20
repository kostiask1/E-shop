import React, { useEffect, useState, useContext, Fragment } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { catalogContext } from "../../../context/catalog/catalog-context";
import ShopItem from "../../ShopItem/ShopItem";

const Cart = () => {
    const { data, getById, clearStorage, getStorage } =
        useContext(catalogContext);
    const [loading, setLoading] = useState("Loading cart");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        getCart();
        const timeout = setTimeout(
            () =>
                setLoading(
                    (prev) =>
                        (prev = (
                            <Fragment>
                                <h1>Cart is empty</h1>
                                <NavLink to="/catalog">
                                    Go back shoping ->
                                </NavLink>
                            </Fragment>
                        ))
                ),
            2000
        );
        return () => {
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCart = () => {
        getById(getStorage());
    };

    const handleClean = () => {
        clearStorage().then(() => {
            setRedirect(true);
        });
    };
    if (redirect) {
        return <Redirect to="/catalog" />;
    }
    if (data && data.length > 0) {
        return (
            <div className="container-fluid pop-in pt-4 pb-4">
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
                                getCart: getCart,
                            }}
                        ></ShopItem>
                    ))}
                </div>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleClean()}
                >
                    Clear cart
                </button>
            </div>
        );
    } else {
        return <div className="container-fluid pop-in">{loading}</div>;
    }
};

export default Cart;
