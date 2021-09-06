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
import { DeleteIcon, EditIcon } from "../../icons";
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
        disabledControls,
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
        if (!disabledControls) setTimeout(() => setFading(true), 300);
        return () => {
            setFading(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    className={`item ${fading && "pop-in"} ${
                        disabledControls && "show"
                    }`}
                    style={{ animationDelay: `${index * 70}ms` }}
                >
                    <div className="item-controls">
                        <span className={discountPrice && "price-discount"}>
                            {discountPrice
                                ? 100 -
                                  Math.ceil((discountPrice / price) * 100) +
                                  "%"
                                : null}
                        </span>
                        {!disabledControls && admin ? (
                            <div className="admin">
                                <div className="edit">
                                    <button
                                        className="item-control item-edit"
                                        data-bs-toggle="modal"
                                        data-bs-target="#Edit"
                                        onClick={() => modal.current.open()}
                                    >
                                        <EditIcon height="1em" width="1em" />
                                    </button>
                                </div>
                                <div className="delete">
                                    <button
                                        onClick={() => deleteItem()}
                                        className="item-control item-delete"
                                    >
                                        <DeleteIcon width="1em" height="1em" />
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
                                            marginLeft: ".4em",
                                        }}
                                    />
                                )}
                            </div>
                        ) : null}
                    </div>

                    <Link to={"/catalog/" + id}>
                        <img
                            src={image}
                            className="item-img img-fluid"
                            alt={text}
                        />
                    </Link>
                    <div className="item-body">
                        <p>{text}</p>
                        <div>
                            {!discountPrice ? (
                                <span className="price-default">
                                    {price} UAH
                                </span>
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
