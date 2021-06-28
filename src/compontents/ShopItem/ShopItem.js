import React, {
    useContext,
    useState,
    useEffect,
    useRef,
    lazy,
    Suspense,
} from "react";
import { Link } from "react-router-dom";
import { catalogContext } from "../../context/catalog/catalog-context";
import { app } from "../../base";
import { authContext } from "../../context/Auth/auth-context";
const Modal = lazy(() => import("../Modal/Modal"));
const ItemCreator = lazy(() => import("../ItemCreator/ItemCreator"));
const db = app.firestore();

const ShopItem = (props) => {
    const {
        filterData,
        getData,
        findInStorage,
        addToStorage,
        deleteFromStorage,
    } = useContext(catalogContext);
    const { admin } = useContext(authContext);
    const [inStorage, setInStorage] = useState(false);
    const modal = useRef(null);

    useEffect(() => {
        setInStorage(findInStorage(props.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.page]);

    const handleUpdate = () => {
        let get = Promise.resolve(getData());
        get.then(() => filterData());
    };

    let addToCart, deleteFromCart, deleteItem, getCart;

    if (props.functions.deleteItem) {
        deleteItem = () => {
            let item = db.collection("All").where("id", "==", props.id);
            item.get().then(function (querySnapshot) {
                querySnapshot.docs[0].ref.delete().then(() => {
                    filterData();
                });
            });
        };
    }
    if (props.functions.addToCart) {
        addToCart = (e) => {
            addToStorage(e);
            setInStorage(true);
        };
    }

    if (props.functions.deleteFromCart) {
        if (props.functions.hasOwnProperty("getCart")) {
            getCart = props.functions.getCart;
            deleteFromCart = (e) => {
                deleteFromStorage(e).then(() => getCart());
            };
        } else {
            deleteFromCart = (e) => {
                deleteFromStorage(e);
                setInStorage(false);
            };
        }
    }
    return (
        <>
            <div className="col-sm-6 col-md-4 col-xl-3">
                <div className="item fade-in">
                    <div className="item-controls">
                        {!inStorage && props.functions.addToCart && (
                            <div className="cart">
                                <button
                                    className="item-control item-edit"
                                    data-bs-toggle="modal"
                                    data-bs-target="#Edit"
                                    onClick={() => addToCart(props.id)}
                                >
                                    <img
                                        src="/shopping-cart-add.svg"
                                        alt=""
                                        style={{ width: 45 }}
                                    />
                                </button>
                            </div>
                        )}
                        {props.functions.deleteFromCart && inStorage && (
                            <div className="delete">
                                <button
                                    onClick={() => deleteFromCart(props.id)}
                                    className="item-control item-edit"
                                >
                                    <img
                                        src="/shopping-cart-remove.svg"
                                        alt=""
                                        style={{ width: 45 }}
                                    />
                                </button>
                            </div>
                        )}
                        {props.admin ? (
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
                        ) : null}
                        {props.admin ? (
                            <div className="delete">
                                <button
                                    onClick={() => deleteItem()}
                                    className="item-control item-delete"
                                >
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        ) : null}
                    </div>
                    <Link to={"/catalog/" + props.id}>
                        <img
                            src={props.image}
                            className="item-img"
                            alt={props.text}
                        />
                    </Link>
                    <div className="item-body">
                        <p>{props.text}</p>
                        <p>{props.price} UAH</p>
                    </div>
                </div>
            </div>
            {admin && (
                <Suspense fallback={<p></p>}>
                    <Modal ref={modal} size="lg">
                        <ItemCreator
                            title={props.text}
                            image={props.image}
                            id={props.id}
                            description={props.description}
                            price={props.price}
                            category={props.category}
                            close={() => modal.current.close()}
                            find={() => handleUpdate()}
                        />
                    </Modal>
                </Suspense>
            )}
        </>
    );
};

export default ShopItem;
