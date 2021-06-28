import React, {
    useEffect,
    useState,
    useContext,
    useRef,
    lazy,
    Suspense,
} from "react";
import { authContext } from "../../../context/Auth/auth-context";
import { catalogContext } from "../../../context/catalog/catalog-context";
import Category from "../../Category/Category";
import Pagination from "../../Pagination/Pagination";
import ShopItem from "../../ShopItem/ShopItem";
const Modal = lazy(() => import("../../Modal/Modal"));
const ItemCreator = lazy(() => import("../../ItemCreator/ItemCreator"));

const SHOP_NAME = process.env.REACT_APP_SHOP_NAME;

const Catalog = (props) => {
    const {
        filters,
        data,
        setCategory,
        setSearchText,
        getData,
        setPriceRange,
        filterData,
        setOrder,
        minPrice,
        maxPrice,
    } = useContext(catalogContext);
    const { admin } = useContext(authContext);
    const [orderS, setOrderS] = useState("newest");
    const [itemsPerPage, setItemsPerPage] = useState(
        JSON.parse(localStorage.getItem("BloomItemsPerPage")) || 6
    );
    const [categoryS, setCategoryS] = useState("");
    const [search, setSearch] = useState("");
    const [minPriceS, setMinPriceS] = useState(0);
    const [maxPriceS, setMaxPriceS] = useState(999999);
    const [page, setPage] = useState(
        JSON.parse(localStorage.getItem("BloomPage")) || 0
    );

    const [newData, setNewData] = useState([]);

    useEffect(() => {
        handleUpdate();
        if (window.innerWidth > 1850) {
            return setItemsPerPage(12);
        } else if (window.innerWidth > 1200) return setItemsPerPage(8);
        else if (window.innerWidth > 767) return setItemsPerPage(6);
        else if (window.innerWidth > 300) return setItemsPerPage(4);

        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        let get = Promise.resolve(setPriceRange(+minPriceS, +maxPriceS));
        get.then(() => filterData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryS, search, minPrice, maxPrice, orderS, minPriceS, maxPriceS]);
    const modal = useRef(null);

    useEffect(() => {
        setNewDataF();
        //eslint-disable-next-line
    }, [data, itemsPerPage]);

    let functions = {
        addToCart: true,
        deleteFromCart: true,
    };
    if (admin) {
        functions = {
            ...functions,
            deleteItem: true,
        };
    }

    const handleUpdate = () => {
        let get = Promise.resolve(getData());
        get.then(() => filterData());
    };

    const handleInput = (e) => {
        setSearchText(e.target.value);
        return setSearch(e.target.value);
    };
    const handleCheckbox = (e) => {
        handleSetPage(0);
        setCategory(e.target.id);
        return setCategoryS(e.target.id);
    };
    const handleMin = (e) => {
        setMinPriceS(e);
    };
    const handleMax = (e) => {
        setMaxPriceS(e);
    };
    const handleOrder = (value) => {
        setOrderS(value);
        return setOrder(value);
    };

    let pages = Math.ceil(data.length / itemsPerPage);
    const handleItemsPerPage = (value) => {
        if (page < pages) {
            JSON.stringify(localStorage.setItem("BloomItemsPerPage", value));
            setItemsPerPage(value);
        }
    };
    const nextPage = () => {
        if (page < pages) {
            JSON.stringify(localStorage.setItem("BloomPage", page + 1));
            return setPage((page) => (page = page + 1));
        }
    };
    const prevPage = () => {
        if (page > 0) {
            JSON.stringify(localStorage.setItem("BloomPage", page - 1));
            return setPage((page) => (page = page - 1));
        }
    };
    const handleSetPage = (e) => {
        JSON.stringify(localStorage.setItem("BloomPage", e));
        setPage(e);
    };
    const setNewDataF = () => {
        if (page >= pages) {
            if (pages > 0) {
                setPage(pages - 1);
                JSON.stringify(localStorage.setItem("BloomPage", pages - 1));
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

    let pagesArray = [];
    for (let i = 1; i < pages + 1; i++) {
        pagesArray.push(i);
    }

    return (
        <main className="main">
            <div className="bg">
                <h1>{SHOP_NAME}</h1>
                <div className="container-fluid">
                    <p className="navbar">Shop by Apollin Ko</p>
                </div>
            </div>
            <div className="container-fluid catalog__wrapper pb-5 pt-2">
                <div className="row">
                    <div className="col-12 col-md-2">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => handleInput(e)}
                        />
                        <div className="mt-2">
                            <input
                                className="d-none"
                                type="radio"
                                name="categories"
                                id="all"
                                onChange={(e) => handleCheckbox(e)}
                            />
                            <label className="form-check-label" htmlFor="all">
                                Show all
                            </label>
                        </div>
                        {filters
                            ? filters.map((item, index) => (
                                  <Category
                                      key={index}
                                      categories="categories"
                                      item={item}
                                      change={(e) => handleCheckbox(e)}
                                  />
                              ))
                            : null}
                        <div className="catalog__filters input-group input-group-sm mt-4">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Min"
                                onChange={(e) => handleMin(e.target.value)}
                            />
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Max"
                                onChange={(e) => handleMax(e.target.value)}
                            />
                        </div>
                    </div>
                    {newData.length > 0 ? (
                        <div className="col-12 col-md-10 row">
                            {itemsPerPage > 7 && (
                                <Pagination
                                    pagesArray={pagesArray}
                                    page={page}
                                    pages={pages}
                                    itemsPerPage={itemsPerPage}
                                    orderS={orderS}
                                    prevPage={prevPage}
                                    nextPage={nextPage}
                                    handleSetPage={(e) => handleSetPage(e)}
                                    handleItemsPerPage={(e) =>
                                        handleItemsPerPage(e)
                                    }
                                    handleOrder={(e) => handleOrder(e)}
                                ></Pagination>
                            )}
                            <div className="col-12">
                                <div id="catalog" className="catalog">
                                    <div className="row">
                                        {admin && (
                                            <div className="col-md-3">
                                                <button
                                                    onClick={() =>
                                                        modal.current.open()
                                                    }
                                                >
                                                    Create new item
                                                </button>
                                            </div>
                                        )}
                                        {newData.length > 0 ? (
                                            Object.values(newData[page])
                                                .length > 0 ? (
                                                Object.values(
                                                    newData[page]
                                                ).map((item, index) => {
                                                    return (
                                                        <ShopItem
                                                            page={page}
                                                            key={index}
                                                            id={item.id}
                                                            text={item.text}
                                                            image={item.image}
                                                            category={
                                                                item.category
                                                            }
                                                            description={
                                                                item.description
                                                            }
                                                            price={item.price}
                                                            functions={
                                                                functions
                                                            }
                                                            admin={admin}
                                                        />
                                                    );
                                                })
                                            ) : (
                                                <span>
                                                    No matching results found
                                                </span>
                                            )
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <Pagination
                                pagesArray={pagesArray}
                                page={page}
                                pages={pages}
                                itemsPerPage={itemsPerPage}
                                orderS={orderS}
                                prevPage={prevPage}
                                nextPage={nextPage}
                                handleSetPage={(e) => handleSetPage(e)}
                                handleItemsPerPage={(e) =>
                                    handleItemsPerPage(e)
                                }
                                handleOrder={(e) => handleOrder(e)}
                            ></Pagination>
                        </div>
                    ) : null}
                </div>
            </div>
            {admin && (
                <Suspense fallback={<p>Loading...</p>}>
                    <Modal ref={modal} size="lg">
                        <ItemCreator
                            close={() => modal.current.close()}
                            find={() => handleUpdate()}
                        />
                    </Modal>
                </Suspense>
            )}
        </main>
    );
};

export default Catalog;
