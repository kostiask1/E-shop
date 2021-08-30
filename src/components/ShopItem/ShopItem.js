import React, {
    useContext,
    useEffect,
    useState,
    useRef,
    lazy,
    Suspense,
} from "react";
import { Link } from "react-router-dom";
import { catalogContext } from "../../context/catalog/catalog-context";
import { app } from "../../base";
import { authContext } from "../../context/Auth/auth-context";
import InCart from "../InCart/InCart";
import "./ShopItem.scss";
const Modal = lazy(() => import("../Modal/Modal"));
const ItemCreator = lazy(() => import("../ItemCreator/ItemCreator"));
const db = app.firestore();

const ShopItem = (props) => {
    const {
        handleDeleteArray,
        deleteArray,
        page,
        id,
        index,
        image,
        text,
        price,
        discountPrice,
        description,
        category,
        inCart,
        boughtCount,
    } = props;
    const { getData, deleteFromStorage } = useContext(catalogContext);
    const { admin } = useContext(authContext);
    const [fading, setFading] = useState(false);
    const [selected, setSelected] = useState(
        deleteArray && deleteArray.includes(id) ? true : false
    );
    const modal = useRef(null);

    useEffect(() => {
        setFading(false);
        setTimeout(() => setFading(true), 300);
        return () => {
            setFading(false);
        };
    }, [page]);

    const deleteItem = () => {
        setFading(false);
        deleteFromStorage([id]);
        let item = db.collection("All").where("id", "==", id);
        item.get().then(function (querySnapshot) {
            querySnapshot.docs[0].ref.delete().then(() => {
                getData();
            });
        });
    };
    const handleCheckbox = (event) => {
        event.preventDefault();
        setSelected(!selected);
        handleDeleteArray(id);
    };

    return (
        <>
            <div className="item-wrapper">
                <div
                    className={`item ${fading && "pop-in"}`}
                    style={{ animationDelay: `${index * 70}ms` }}
                >
                    <div className="item-controls">
                        <span className={discountPrice && "price-discount"}>
                            {discountPrice &&
                                100 -
                                    Math.ceil((discountPrice / price) * 100) +
                                    "%"}
                        </span>
                        {admin ? (
                            <div className="admin">
                                <div className="edit">
                                    <button
                                        className="item-control item-edit"
                                        data-bs-toggle="modal"
                                        data-bs-target="#Edit"
                                        onClick={() => modal.current.open()}
                                    >
                                        <i className="fas fa-pen" />
                                    </button>
                                </div>
                                <div className="delete">
                                    <button
                                        onClick={() => deleteItem()}
                                        className="item-control item-delete"
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                                {!inCart && (
                                    <input
                                        key={selected}
                                        className="item-control "
                                        type="checkbox"
                                        checked={selected ? "checked" : ""}
                                        onChange={handleCheckbox}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            marginLeft: ".4rem",
                                        }}
                                    />
                                )}
                            </div>
                        ) : null}
                    </div>

                    <Link to={"/catalog/" + id}>
                        <img src={image} className="item-img img-fluid" alt={text} />
                    </Link>
                    <div className="item-body">
                        <p>{text}</p>
                        {!discountPrice ? (
                            <span>{price} UAH</span>
                        ) : (
                            <>
                                <del className="price-was">{price}</del>
                                <span className="price-now">
                                    {discountPrice} Uah
                                </span>
                            </>
                        )}
                        <InCart
                            update={() =>
                                props.hasOwnProperty("functions") &&
                                props.functions.getCart()
                            }
                            id={id}
                            key={page}
                        />
                    </div>
                </div>
            </div>
            {admin && (
                <Suspense fallback={<p></p>}>
                    <Modal ref={modal} size="lg">
                        <ItemCreator
                            title={text}
                            image={image}
                            id={id}
                            description={description}
                            price={price}
                            discountPrice={discountPrice}
                            boughtCount={boughtCount}
                            category={category}
                            close={() => modal.current.close()}
                            getData={() => getData()}
                        />
                    </Modal>
                </Suspense>
            )}
        </>
    );
};

export default ShopItem;
