import React, { useEffect, useState, useContext } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { catalogContext } from "../../context/catalog/catalog-context";
import ShopItem from "../../components/ShopItem/ShopItem";
import "./Cart.scss";
import axios from "axios";

const Cart = () => {
    const { data, getById, clearStorage, getStorage } =
        useContext(catalogContext);
    const [loading, setLoading] = useState("Loading cart");
    const [redirect, setRedirect] = useState(false);
    //const link = "https://"+window.location.hostname+"/catalog";
    const link = "https://e-shop-d051e.web.app/catalog";
    console.log(link);

    const sendRequest = ({
        data: items,
        name,
        index,
        phone,
        address,
        service,
        payment,
    }) =>
        axios.get(
            "https://api.telegram.org/bot1967107151:AAEok-UReU_z4E4ntFBIp3jbKCk9v-uYbhE/sendMessage?chat_id=-494447850",
            {
                params: {
                    text: items.length
                        ? `<b>${name} has ordered:</b>${items.map(
                              (item) =>
                                  `\n<a href="${link}/${item.id}">${item.text}</a>: ${item.price} UAH`
                          )}\n\nSend to <b>${name}</b>:\nPhone: <i>${phone}"
                          }</i>\nAddress: <i>${address}</i>\nIndex: <i>${
                              index ?? "unchosen"
                          }</i>\nPrefered post service: ${
                              service ?? `unchosen`
                          }\nPayment type: <i>${payment}`
                        : null,
                    parse_mode: "HTML",
                },
            }
        );

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

    const buyAll = () => {
        sendRequest({ data, name: "John", index: null });
    };
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
