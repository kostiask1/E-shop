import React, {
    useContext,
    useEffect,
    useRef,
    useState,
    lazy,
    Suspense,
} from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Link, useHistory } from "react-router-dom"
import InCart from "../../components/InCart/InCart"
import { authContext } from "../../context/Auth/auth-context"
import { catalogContext } from "../../context/catalog/catalog-context"
import { DeleteIcon, EditIcon } from "../../icons"
import "./Card.scss"
const Modal = lazy(() => import("./../../components/Modal/Modal"))
const ItemCreator = lazy(() =>
    import("../../pages/Create/ItemCreator/ItemCreator")
)

const Card = (match) => {
    const { data, getById, deleteItemById, toggleArchiveItem } =
        useContext(catalogContext)
    const { admin } = useContext(authContext)
    const history = useHistory()
    const [loading, setLoading] = useState("")
    const id = match && match.params && match.params.name
    const modal = useRef(null)
    useEffect(() => {
        let timeout
        if (id) {
            getById([id])
            timeout = setTimeout(
                () =>
                    setLoading(
                        (prev) => (prev = "Произошла ошибка во время загрузки")
                    ),
                2000
            )
        }
        return () => {
            clearTimeout(timeout)
        }
        //eslint-disable-next-line
    }, [id])

    const deleteItem = () => {
        deleteItemById([id]).then(() => {
            let path = `/catalog`
            history.push(path)
        })
    }

    const handleToggle = (event, item) => {
        toggleArchiveItem(event, item).then(() => getById([id]))
    }

    if (data && data.length === 1) {
        const {
            id,
            text,
            imagesArray,
            price,
            description,
            discountPrice,
            boughtCount,
            category,
            archived,
        } = data[0]
        return (
            <>
                <div
                    className={`card container pop-in ${
                        archived ? "archived" : ""
                    }`}
                >
                    <div className="row">
                        {Object.keys(data).length !== 0 ? (
                            <>
                                {admin ? (
                                    <div className="admin">
                                        <div className="archive">
                                            <button
                                                className="item-control item-archive"
                                                onClick={(event) =>
                                                    handleToggle(event, {
                                                        id,
                                                        text,
                                                        imagesArray,
                                                        price,
                                                        description,
                                                        discountPrice,
                                                        boughtCount,
                                                        category,
                                                        archived,
                                                    })
                                                }
                                            >
                                                {archived ? "архив" : "каталог"}
                                            </button>
                                        </div>
                                        <div
                                            className="edit"
                                            style={{ marginTop: 5 }}
                                        >
                                            <button
                                                className="item-control item-edit"
                                                data-bs-toggle="modal"
                                                data-bs-target="#Edit"
                                                onClick={() =>
                                                    modal.current.open()
                                                }
                                            >
                                                <EditIcon
                                                    height="1em"
                                                    width="1em"
                                                />
                                            </button>
                                        </div>
                                        <div
                                            className="delete"
                                            style={{ marginTop: 5 }}
                                        >
                                            <button
                                                onClick={() => deleteItem()}
                                                className="item-control item-delete"
                                            >
                                                <DeleteIcon
                                                    width="1em"
                                                    height="1em"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="img">
                                    {imagesArray && imagesArray.length > 1 ? (
                                        <Carousel
                                            showStatus={false}
                                            infiniteLoop={true}
                                            emulateTouch={true}
                                            showThumbs={false}
                                        >
                                            {imagesArray.map((img) => (
                                                <img
                                                    src={img}
                                                    alt={text}
                                                    key={img}
                                                />
                                            ))}
                                        </Carousel>
                                    ) : (
                                        <img
                                            src={imagesArray && imagesArray[0]}
                                            alt={text}
                                        />
                                    )}
                                </div>
                                <div className="text-info">
                                    <h1>{text}</h1>
                                    {!discountPrice ? (
                                        <p className="price-now">{price} грн</p>
                                    ) : (
                                        <>
                                            <del className="price-was">
                                                {price}
                                            </del>
                                            <span className="price-now">
                                                {discountPrice} грн
                                            </span>
                                        </>
                                    )}
                                    <div className="description">
                                        {description}
                                    </div>
                                    {!archived && (
                                        <InCart id={id} inCard={true} />
                                    )}
                                </div>
                            </>
                        ) : (
                            <div>
                                <p>Broken item id</p>
                                <Link to="/">Go to Home Page</Link>
                            </div>
                        )}
                    </div>
                </div>
                {admin && (
                    <Suspense fallback={<p></p>}>
                        <Modal ref={modal} size="lg">
                            <ItemCreator
                                item={data[0]}
                                close={() => modal.current.close()}
                                getData={() => getById([id])}
                            />
                        </Modal>
                    </Suspense>
                )}
            </>
        )
    } else return <h1 className="pop-in">{loading}</h1>
}

export default Card
