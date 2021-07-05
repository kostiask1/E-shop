import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { catalogContext } from "../../../context/catalog/catalog-context";
import ShopItem from "../../ShopItem/ShopItem";

const Cart = (props) => {
    const { data, getById, clearStorage, getStorage } =
        useContext(catalogContext);
    const [loading, setLoading] = useState("Loading cart");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        getCart();
        const timeout = setTimeout(
            () => setLoading((prev) => (prev = "Cart is empty")),
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
            <div className="container-fluid fade-in">
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
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleClean()}
                >
                    Clear cart
                </button>
            </div>
        );
    } else {
        return <h3 className="container-fluid fade-in">{loading}</h3>;
    }
};

export default Cart;
