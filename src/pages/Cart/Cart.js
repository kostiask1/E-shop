import React, {
    useEffect,
    useState,
    useRef,
    useContext,
    Suspense,
    lazy,
} from "react";
import { Redirect, NavLink } from "react-router-dom";
import { catalogContext } from "../../context/catalog/catalog-context";
import ShopItem from "../../components/ShopItem/ShopItem";
import "./Cart.scss";
import axios from "axios";
import PurchaseForm from "../../components/PurchaseForm/PurchaseForm";
const Modal = lazy(() => import("../../components/Modal/Modal"));

const Cart = () => {
    const { data, getById, clearStorage, getStorage } =
        useContext(catalogContext);
    const [loading, setLoading] = useState("Loading cart");
    const [redirect, setRedirect] = useState(false);
    const link = "https://" + window.location.hostname + "/catalog";
    const modal = useRef(null);

    const sendRequest = ({
        name,
        code,
        phone,
        address,
        service,
        payment,
        message,
    }) =>
        axios
            .get(
                `https://api.telegram.org/bot${process.env.REACT_APP_BOT_ID}/sendMessage?chat_id=${process.env.REACT_APP_CHAT_ID}`,
                {
                    params: {
                        text: data.length
                            ? `<b>${name} has ordered:</b>${data.map(
                                  (item) =>
                                      `\n<a href="${link}/${item.id}">${
                                          item.text
                                      }</a>: ${
                                          item.discountPrice
                                              ? `${item.discountPrice} UAH (with discount)`
                                              : `${item.price} UAH`
                                      }`
                              )}\n\nSend to <b>${name}</b>:\nPhone: <i>${phone}</i>\nAddress: <i>${address}</i>\nIndex: <i>${
                                  code ?? "unchosen"
                              }</i>\nPrefered post service: ${
                                  service ?? `unchosen`
                              }\nPayment type: <i>${payment}</i>\nTotal price: <b>${data.reduce(
                                  (acc, obj) => {
                                      return (
                                          acc + obj.discountPrice ?? obj.price
                                      );
                                  },
                                  0
                              )} UAH</b>\n${
                                  message &&
                                  `${name} has left message: "<i>${message}</i>"`
                              }`
                            : null,
                        parse_mode: "HTML",
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    modal.current.close();
                    handleClean();
                }
            });

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
                                    discountPrice={item.discountPrice}
                                    inCart={true}
                                    functions={{
                                        getCart,
                                    }}
                                ></ShopItem>
                            ))}
                        </div>
                        <button
                            className="btn btn-success"
                            onClick={() => modal.current.open()}
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
            <Suspense fallback={<p></p>}>
                <Modal ref={modal}>
                    <PurchaseForm buy={sendRequest} />
                </Modal>
            </Suspense>
        </div>
    );
};

export default Cart;
