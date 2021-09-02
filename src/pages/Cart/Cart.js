import React, { useEffect, useState, useContext } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { catalogContext } from "../../context/catalog/catalog-context";
import ShopItem from "../../components/ShopItem/ShopItem";
import "./Cart.scss";

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
                            <div className="fade-in">
                                <h1>Cart is empty</h1>
                                <NavLink to="/catalog">
                                    Go back shoping ->
                                </NavLink>
                            </div>
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

    const buyAll = () => {};
    if (redirect) {
        return <Redirect to="/catalog" />;
    }
    return (
        <div className="cart">
            <div className="container pop-in">
                {data && data.length > 0 ? (
                    <div style={{ width: "100%" }}>
                        <div className="catalog">
                            {data.map((item) => (
                                <ShopItem
                                    key={item.id}
                                    id={item.id}
                                    text={item.text}
                                    image={item.image}
                                    category={item.category}
                                    description={item.description}
                                    price={item.price}
                                    inCart={true}
                                    functions={{
                                        getCart,
                                    }}
                                ></ShopItem>
                            ))}
                        </div>
                        <button
                            className="btn btn-success"
                            onClick={() => buyAll()}
                        >
                            Buy all
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleClean()}
                        >
                            Clear cart
                        </button>
                    </div>
                ) : (
                    <div>{loading}</div>
                )}
            </div>
        </div>
    );
};

export default Cart;
