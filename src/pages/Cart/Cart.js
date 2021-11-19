import React, {
    useEffect,
    useState,
    useRef,
    useContext,
    Suspense,
    lazy,
} from "react"
import { Redirect, NavLink } from "react-router-dom"
import { catalogContext } from "../../context/catalog/catalog-context"
import ShopItem from "../../components/ShopItem/ShopItem"
import "./Cart.scss"
import axios from "axios"
import PurchaseForm from "./PurchaseForm/PurchaseForm"
const Modal = lazy(() => import("../../components/Modal/Modal"))

const Cart = () => {
    const { data, getById, clearStorage, getStorage } =
        useContext(catalogContext)
    const [loading, setLoading] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [requestFinished, setRequestFinished] = useState(false)
    const link = "https://" + window.location.hostname + "/catalog"
    const modal = useRef(null)

    const sendRequest = ({
        name,
        code,
        phone,
        address,
        service,
        payment,
        message,
        department,
        deliveryType,
        email,
    }) =>
        axios
            .get(
                `https://api.telegram.org/bot${process.env.REACT_APP_BOT_ID}/sendMessage?chat_id=${process.env.REACT_APP_CHAT_ID}`,
                {
                    params: {
                        text: data.length
                            ? `<b>${name} заказал(а):</b>${data.map(
                                  (item) =>
                                      `\n<a href="${link}/${item.id}">${
                                          item.text
                                      }</a>: ${
                                          item.discountPrice
                                              ? `${item.discountPrice} грн. (со скидкой)`
                                              : `${item.price} грн.`
                                      }`
                              )}\n\nПолучатель <b>${name}</b>:\nТелефон: <i>${phone}</i>\n${
                                  email && `E-mail: <i>${email}</i>`
                              }\nТип Доставки: ${
                                  deliveryType === "department"
                                      ? "<i>Отделение почты</i>"
                                      : "<i>Курьерская доставка</i>"
                              }\nАдрес доставки: <i>${address}</i>\nТип почты: ${
                                  service === "nova"
                                      ? "Нова пошта"
                                      : "Укр пошта"
                              }\n${
                                  code
                                      ? `Почтовый индекс: <i>${code}</i>\n`
                                      : `Отделение новой почты: <i>${department}</i>\n`
                              }Тип платежа: <i>${
                                  payment === "Cash" ? "Наличными" : "Картой"
                              }</i>\nОбщая сумма заказа: <b>${data.reduce(
                                  (acc, obj) => {
                                      return (
                                          acc +
                                          (obj.discountPrice
                                              ? obj.discountPrice
                                              : obj.price)
                                      )
                                  },
                                  0
                              )} грн.</b>\n${
                                  message &&
                                  `<b>${name}</b> оставил(а) сообщение: "<i>${message}</i>"`
                              }`
                            : null,
                        parse_mode: "HTML",
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    setRequestFinished(true)
                    clearStorage()
                    getCart()
                }
            })

    useEffect(() => {
        getCart()
        const timeout = setTimeout(
            () =>
                setLoading(
                    (prev) =>
                        (prev = (
                            <div className="fade-in">
                                <h1>Cart is empty</h1>
                                <NavLink to="/catalog">Go back shoping</NavLink>
                            </div>
                        ))
                ),
            2000
        )
        return () => {
            clearTimeout(timeout)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getCart = () => {
        getById(getStorage())
    }

    const handleClean = () => {
        clearStorage().then(() => {
            setRedirect(true)
        })
    }
    if (redirect) {
        return <Redirect to="/catalog" />
    }
    return (
        <div className="cart">
            <div className="container pop-in">
                {data && data.length > 0 ? (
                    <div style={{ width: "100%" }}>
                        <div className="catalog">
                            {data.map((item, index) => (
                                <ShopItem
                                    key={item.id}
                                    index={index}
                                    id={item.id}
                                    text={item.text}
                                    imagesArray={item.imagesArray}
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
                        <p className="total-price">
                            {data.reduce(
                                (acc, obj) =>
                                    acc +
                                    (obj.discountPrice
                                        ? obj.discountPrice
                                        : obj.price),
                                0
                            )}
                            &nbsp;Uah's to pay (+ delivery)
                        </p>
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
                    {requestFinished ? (
                        <div className="purchase-form">
                            <h3>
                                Your purchase was successfully send, you will
                                receive a message soon
                            </h3>
                            <button
                                onClick={() => setRedirect(true)}
                                className="btn-success"
                                style={{ marginTop: "1.5rem" }}
                            >
                                Go shopping
                            </button>
                        </div>
                    ) : (
                        <PurchaseForm buy={sendRequest} />
                    )}
                </Modal>
            </Suspense>
        </div>
    )
}

export default Cart
