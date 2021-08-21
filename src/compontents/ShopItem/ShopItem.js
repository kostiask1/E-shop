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
const Modal = lazy(() => import("../Modal/Modal"));
const ItemCreator = lazy(() => import("../ItemCreator/ItemCreator"));
const db = app.firestore();

const ShopItem = (props) => {
    const { getData } = useContext(catalogContext);
    const { admin } = useContext(authContext);
    const [fading, setFading] = useState(false);
    const modal = useRef(null);

    useEffect(() => {
        setFading(false);
        setTimeout(() => setFading(true), 300);
        return () => {
            setFading(false);
        };
    }, [props.page]);

    const deleteItem = () => {
        let item = db.collection("All").where("id", "==", props.id);
        item.get().then(function (querySnapshot) {
            querySnapshot.docs[0].ref.delete().then(() => {
                getData();
            });
        });
    };
    return (
        <>
            <div className="col-sm-6 col-md-4 col-xl-3 item-wrapper">
                <div
                    className={`item ${fading && "pop-in"}`}
                    style={{ animationDelay: `${props.index * 70}ms` }}
                >
                    <div className="item-controls">
                        <InCart
                            update={() =>
                                props.hasOwnProperty("functions") &&
                                props.functions.getCart()
                            }
                            id={props.id}
                            key={props.page}
                        />
                        {admin ? (
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
                        {admin ? (
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
                            getData={() => getData()}
                        />
                    </Modal>
                </Suspense>
            )}
        </>
    );
};

export default ShopItem;
