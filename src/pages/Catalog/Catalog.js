import React, {
    lazy,
    Suspense,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { local_itemsPerPage, local_page } from "../../localStorage";
import FilterSection from "../../components/FilterSection/FilterSection";
import Pagination from "../../components/Pagination/Pagination";
import ShopItem from "../../components/ShopItem/ShopItem";
import { authContext } from "../../context/Auth/auth-context";
import { catalogContext } from "../../context/catalog/catalog-context";
import { app } from "../../base";
import "./Catalog.scss";
import { DeleteIcon } from "../../icons";
import Cta from "../../components/Cta/Cta";
const Modal = lazy(() => import("../../components/Modal/Modal"));
const ItemCreator = lazy(() =>
    import("../../components/ItemCreator/ItemCreator")
);
const db = app.firestore();

const Catalog = () => {
    const {
        filters,
        data,
        getData,
        category,
        setCategory,
        order,
        setOrder,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        searchText,
        setSearchText,
        deleteFromStorage,
    } = useContext(catalogContext);
    const { admin } = useContext(authContext);
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        const itemsCount =
            JSON.parse(localStorage.getItem(local_itemsPerPage)) || 0;
        if (!itemsCount) {
            if (window.innerWidth > 1850) {
                return 12;
            } else if (window.innerWidth > 1200) return 8;
            else if (window.innerWidth > 500) return 6;
            else if (window.innerWidth < 500) return 4;
        } else {
            return itemsCount;
        }
    });
    const [page, setPage] = useState(
        JSON.parse(localStorage.getItem(local_page)) || 0
    );
    const [newData, setNewData] = useState([]);
    const [deleteArray, setDeleteArray] = useState([]);
    const modal = useRef(null);

    useEffect(() => {
        getData(); //eslint-disable-next-line
    }, []);

    useEffect(() => {
        genNewData();
        //eslint-disable-next-line
    }, [data, itemsPerPage]);

    const handleInput = (e) => {
        const timeOutId = setTimeout(() => {
            setSearchText(e);
        }, 350);
        return () => clearTimeout(timeOutId);
    };

    const handleCheckbox = (e) => {
        handleSetPage(0);
        setCategory(e.target.id);
    };

    let pages = Math.ceil(data.length / itemsPerPage);
    const handleItemsPerPage = (value) => {
        if (page < pages) {
            JSON.stringify(localStorage.setItem(local_itemsPerPage, value));
            setItemsPerPage(value);
        }
    };
    const handleSetPage = (e) => {
        JSON.stringify(localStorage.setItem(local_page, e));
        setPage(e);
    };
    const genNewData = () => {
        if (page >= pages) {
            if (pages > 0) {
                setPage(pages - 1);
                JSON.stringify(localStorage.setItem(local_page, pages - 1));
            }
        }
        let clone = [...data];
        let chunks = function (array, size) {
            let results = [];
            while (array.length) {
                results.push(array.splice(0, size));
            }
            return results;
        };
        setNewData(chunks(clone, itemsPerPage));
    };
    const deleteMultipleItems = () => {
        let promises = [];
        deleteArray.map((id) => {
            return promises.push(
                new Promise((resolve, reject) => {
                    deleteFromStorage([id]);
                    let item = db.collection("All").where("id", "==", id);
                    item.get().then((querySnapshot) => {
                        resolve(querySnapshot.docs[0].ref.delete());
                    });
                })
            );
        });
        Promise.all(promises).then(() => {
            getData();
            setDeleteArray([]);
        });
    };
    const handleDeleteArray = (id) => {
        if (deleteArray.includes(id)) {
            let clone = [...deleteArray];
            clone = clone.filter((item) => item !== id);
            setDeleteArray(clone);
        } else {
            setDeleteArray([...deleteArray, id]);
        }
    };
    return (
        <>
            <Cta />
            <div id="catalog">
                <div className="container">
                    <div className="row">
                        <FilterSection
                            searchText={searchText}
                            category={category}
                            filters={filters}
                            handleInput={handleInput}
                            handleCheckbox={handleCheckbox}
                            handleMin={setMinPrice}
                            handleMax={setMaxPrice}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />
                        <div className="catalog__wrapper">
                            {data.length ? (
                                <Pagination
                                    page={page}
                                    pages={pages}
                                    itemsPerPage={itemsPerPage}
                                    order={order}
                                    handleSetPage={(e) => handleSetPage(e)}
                                    handleItemsPerPage={(e) =>
                                        handleItemsPerPage(e)
                                    }
                                    setOrder={(e) => setOrder(e)}
                                ></Pagination>
                            ) : null}
                            {admin && deleteArray.length ? (
                                <button
                                    className="btn-delete-multiple pop-in"
                                    onClick={deleteMultipleItems}
                                >
                                    <DeleteIcon width={42} height={42} />
                                </button>
                            ) : null}
                            <div className="catalog">
                                {admin && (
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        onClick={() => modal.current.open()}
                                    >
                                        Create new item
                                    </button>
                                )}
                                {newData.length > 0 ? (
                                    Object.values(newData[page]).length > 0 &&
                                    Object.values(newData[page]).map(
                                        (item, index) => {
                                            return (
                                                <ShopItem
                                                    key={item.id}
                                                    page={page}
                                                    index={index}
                                                    id={item.id}
                                                    text={item.text}
                                                    imagesArray={
                                                        item.imagesArray
                                                    }
                                                    image={item.image}
                                                    category={item.category}
                                                    description={
                                                        item.description
                                                    }
                                                    handleDeleteArray={
                                                        handleDeleteArray
                                                    }
                                                    deleteArray={deleteArray}
                                                    price={item.price}
                                                    discountPrice={
                                                        item.discountPrice
                                                    }
                                                    boughtCount={
                                                        item.boughtCount
                                                    }
                                                />
                                            );
                                        }
                                    )
                                ) : (
                                    <span className="fade-in">
                                        No matching results found
                                    </span>
                                )}
                            </div>
                            {itemsPerPage > 7 && data.length > 6 && (
                                <Pagination
                                    page={page}
                                    pages={pages}
                                    itemsPerPage={itemsPerPage}
                                    order={order}
                                    handleSetPage={(e) => handleSetPage(e)}
                                    handleItemsPerPage={(e) =>
                                        handleItemsPerPage(e)
                                    }
                                    setOrder={(e) => setOrder(e)}
                                ></Pagination>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {admin && (
                <Suspense fallback={<p>Loading...</p>}>
                    <Modal ref={modal} size="lg">
                        <ItemCreator
                            new={true}
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

export default Catalog;
