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
    const [requestCount, setRequestCount] = useState(
        JSON.parse(localStorage.getItem("requestCount")) ?? 0
    )
    const [requestTimestamp, setRequestTimestamp] = useState(
        JSON.parse(localStorage.getItem("requestTimestamp"))
    )
    const [requestFinished, setRequestFinished] = useState(false)
    const link = "https://" + window.location.hostname + "/catalog"
    const modal = useRef(null)
    const day = 86400000
    const now = () => new Date().getTime()
    const sendRequest = ({
        name,
        code,
        phone,
        address,
        city,
        service,
        payment,
        message,
        department,
        deliveryType,
        email,
    }) => {
        requestCount < 5 &&
            fetch("https://www.cloudflare.com/cdn-cgi/trace").then(
                async (data) => {
                    let response = await data.text()
                    let ip = response.split("\n")[2]
                    ip = ip.slice(3, -1)
                    axios
                        .get(
                            `https://api.telegram.org/bot${process.env.REACT_APP_BOT_ID}/sendMessage?chat_id=${process.env.REACT_APP_CHAT_ID}`,
                            {
                                params: {
                                    text: cart.length
                                        ? `<b>${name} (${ip}) заказал(а):</b>${cart.map(
                                              (item) =>
                                                  `\n<a href="${link}/${
                                                      item.id
                                                  }"> - ${item.text}</a>: ${
                                                      item.discountPrice
                                                          ? `${item.discountPrice} грн. (со скидкой)`
                                                          : `${item.price} грн.`
                                                  }`
                                          )}\n\nПолучатель <b>${name}</b>:
                              \nТелефон: <i>${phone}</i>\n${
                                              email && `E-mail: <i>${email}</i>`
                                          }\nТип Доставки: ${
                                              deliveryType === "department"
                                                  ? "<i>Отделение почты</i>"
                                                  : "<i>Курьерская доставка</i>"
                                          }
                              \nГород: <i>${city}</i>\nАдрес доставки: <i>${address}</i>\nТип почты: ${
                                              service === "nova"
                                                  ? "Нова пошта"
                                                  : "Укр пошта"
                                          }\n${
                                              code
                                                  ? `Почтовый индекс: <i>${code}</i>`
                                                  : `Отделение новой почты: <i>${department}</i>`
                                          }\nТип платежа: <i>${
                                              payment === "cod"
                                                  ? "Наложенный платёж"
                                                  : "Картой"
                                          }</i>
                              \nОбщая сумма заказа: <b>${cart.reduce(
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
                            setRequestCount((requests) => requests + 1)
                            localStorage.setItem(
                                "requestCount",
                                requestCount + 1
                            )
                            localStorage.setItem("requestTimestamp", now())
                        })
                }
            )
    }
    useEffect(() => {
        if (requestTimestamp && now() - day > requestTimestamp) {
            setRequestCount(0)
            setRequestTimestamp(null)
            localStorage.setItem("requestCount", 0)
            localStorage.setItem("requestTimestamp", null)
        }
        getCart()
        const timeout = setTimeout(() => setLoading(""), 2000)
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
            <h2>Корзина</h2>
            {cart && cart.length > 0 ? (
                <>
                    <div className="catalog">
                        {cart.map((item, idx) => (
                            <ShortItem
                                key={item.id}
                                idx={idx}
                                id={item.id}
                                text={item.text}
                                price={item.price}
                                discountPrice={item.discountPrice}
                                deleteFromStorage={deleteFromStorage}
                                close={close}
                            ></ShortItem>
                        ))}
                    </div>
                    <div className="divider"></div>
                    <div className="total">
                        <p>Сумма</p>
                        <p className="total-price">
                            {cart.reduce(
                                (acc, obj) =>
                                    acc +
                                    (obj.discountPrice
                                        ? obj.discountPrice
                                        : obj.price),
                                0
                            )}{" "}
                            грн
                        </p>
                    </div>
                    {requestCount < 5 ? (
                        <div className="cart-actions">
                            <p onClick={() => modal.current.open()}>Купить</p>
                            <p onClick={() => handleClean()}>
                                Очистить корзину
                            </p>
                        </div>
                    ) : (
                        <div>
                            You have made too many requests for today, try
                            tomorrow
                        </div>
                    )}
                </>
            ) : (
                <div>{loading}</div>
            )}
            <Suspense fallback={<p></p>}>
                <Modal ref={modal} {...(requestFinished ? { size: "sm" } : "")}>
                    {requestFinished ? (
                        <div className="purchase-form">
                            <h3>
                                Ваша заявка была отправлена, вы получите
                                сообщение в ближайшее время
                            </h3>
                            <button
                                onClick={() => {
                                    modal.current.close()
                                    setRequestFinished(false)
                                }}
                                className="btn-success"
                                style={{ marginTop: "1.5rem" }}
                            >
                                ОК
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
