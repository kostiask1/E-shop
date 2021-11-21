import React, {
    useEffect,
    useState,
    useRef,
    useContext,
    Suspense,
    lazy,
} from "react"
import { catalogContext } from "../../context/catalog/catalog-context"
import "./Cart.scss"
import axios from "axios"
import PurchaseForm from "./PurchaseForm/PurchaseForm"
import ShortItem from "./ShortItem/ShortItem"
const Modal = lazy(() => import("../../components/Modal/Modal"))

const Cart = ({ close }) => {
    const { cart, clearStorage, getStorage, deleteFromStorage } =
        useContext(catalogContext)
    const [loading, setLoading] = useState("")
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
                        text: cart.length
                            ? `<b>${name} заказал(а):</b>${cart.map(
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
                              }</i>\nОбщая сумма заказа: <b>${cart.reduce(
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
        getStorage()
    }

    const handleClean = () => {
        clearStorage()
    }
    return (
        <div className="cart">
            {cart && cart.length > 0 ? (
                <>
                    <div className="catalog">
                        {cart.map((item) => (
                            <ShortItem
                                key={item.id}
                                id={item.id}
                                text={item.text}
                                price={item.price}
                                discountPrice={item.discountPrice}
                                deleteFromStorage={deleteFromStorage}
                                close={close}
                            ></ShortItem>
                        ))}
                    </div>
                    <p className="total-price">
                        {cart.reduce(
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
                </>
            ) : (
                <div>{loading}</div>
            )}
            <Suspense fallback={<p></p>}>
                <Modal ref={modal}>
                    {requestFinished ? (
                        <div className="purchase-form">
                            <h3>
                                Your purchase was successfully send, you will
                                receive a message soon
                            </h3>
                            <button
                                onClick={() => modal.current.close()}
                                className="btn-success"
                                style={{ marginTop: "1.5rem" }}
                            >
                                OK
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
