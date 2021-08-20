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
import FilterSection from "../../FilterSection/FilterSection";
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
        JSON.parse(localStorage.getItem(`${SHOP_NAME}ItemsPerPage`)) || 0
    );
    const [categoryS, setCategoryS] = useState("");
    const [search, setSearch] = useState("");
    const [minPriceS, setMinPriceS] = useState(0);
    const [maxPriceS, setMaxPriceS] = useState(999999999999999999);
    const [page, setPage] = useState(
        JSON.parse(localStorage.getItem("BloomPage")) || 0
    );

    const [newData, setNewData] = useState([]);

    const [querySearch, setQuerySearch] = useState("");
    const [queryMinPrice, setQueryMinPrice] = useState("");
    const [queryMaxPrice, setQueryMaxPrice] = useState("");

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setSearchText(querySearch);
            setSearch(querySearch);
        }, 350);
        return () => clearTimeout(timeOutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [querySearch]);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setMinPriceS(queryMinPrice);
        }, 350);
        return () => clearTimeout(timeOutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryMinPrice]);
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setMaxPriceS(queryMaxPrice);
        }, 350);
        return () => clearTimeout(timeOutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryMaxPrice]);

    useEffect(() => {
        handleUpdate();
        if (itemsPerPage === 0) {
            if (window.innerWidth > 1850) {
                return setItemsPerPage(12);
            } else if (window.innerWidth > 1200) return setItemsPerPage(8);
            else if (window.innerWidth > 500) return setItemsPerPage(6);
            else if (window.innerWidth < 500) return setItemsPerPage(4);
        } //eslint-disable-next-line
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

    const handleUpdate = () => {
        let get = Promise.resolve(getData());
        get.then(() => filterData());
    };

    const handleInput = (e) => {
        return setQuerySearch(e.target.value);
    };
    const handleCheckbox = (e) => {
        handleSetPage(0);
        setCategory(e.target.id);
        return setCategoryS(e.target.id);
    };
    const handleMin = (e) => {
        setQueryMinPrice(e);
    };
    const handleMax = (e) => {
        setQueryMaxPrice(e);
    };
    const handleOrder = (value) => {
        setOrderS(value);
        return setOrder(value);
    };

    let pages = Math.ceil(data.length / itemsPerPage);
    const handleItemsPerPage = (value) => {
        if (page < pages) {
            JSON.stringify(
                localStorage.setItem(`${SHOP_NAME}ItemsPerPage`, value)
            );
            setItemsPerPage(value);
        }
    };
    const nextPage = () => {
        if (page < pages) {
            JSON.stringify(localStorage.setItem(`${SHOP_NAME}Page`, page + 1));
            return setPage((page) => (page = page + 1));
        }
    };
    const prevPage = () => {
        if (page > 0) {
            JSON.stringify(localStorage.setItem(`${SHOP_NAME}Page`, page - 1));
            return setPage((page) => (page = page - 1));
        }
    };
    const handleSetPage = (e) => {
        JSON.stringify(localStorage.setItem(`${SHOP_NAME}Page`, e));
        setPage(e);
    };
    const setNewDataF = () => {
        if (page >= pages) {
            if (pages > 0) {
                setPage(pages - 1);
                JSON.stringify(
                    localStorage.setItem(`${SHOP_NAME}Page`, pages - 1)
                );
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
        <>
            <main className="main">
                <div className="bg">
                    <h1>{SHOP_NAME}</h1>
                    <div className="container-fluid">
                        <p>Shop by Apollin Ko</p>
                    </div>
                </div>
            </main>
            <div
                id="catalog"
                className="container-fluid catalog__wrapper pb-5 pt-2"
            >
                <div className="row">
                    <div className="col-12 col-md-2">
                        <FilterSection
                            filters={filters}
                            handleInput={handleInput}
                            handleCheckbox={handleCheckbox}
                            handleMin={handleMin}
                            handleMax={handleMax}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />
                    </div>
                    {newData.length > 0 ? (
                        <div className="col-12 col-md-10">
                            <div className="row">
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
                                        category={categoryS}
                                    ></Pagination>
                                )}
                                <div className="col-12">
                                    <div className="catalog">
                                        <div className="row">
                                            {admin && (
                                                <div className="col-md-3">
                                                    <div
                                                        className="item pop-in"
                                                        onClick={() =>
                                                            modal.current.open()
                                                        }
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <a>
                                                            <img
                                                                className="item-img skew"
                                                                src="https://firebasestorage.googleapis.com/v0/b/e-shop-d051e.appspot.com/o/important%2Fcog.png?alt=media&token=dd0aea42-45af-480e-b531-4fbaaf0f6b0b"
                                                                alt=""
                                                            />
                                                        </a>
                                                        <div className="item-body text-center">
                                                            <button
                                                                className="btn btn-primary mb-4"
                                                                type="submit"
                                                            >
                                                                Create new item
                                                            </button>
                                                        </div>
                                                    </div>
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
                                                                index={index}
                                                                key={index}
                                                                id={item.id}
                                                                text={item.text}
                                                                image={
                                                                    item.image
                                                                }
                                                                category={
                                                                    item.category
                                                                }
                                                                description={
                                                                    item.description
                                                                }
                                                                price={
                                                                    item.price
                                                                }
                                                            />
                                                        );
                                                    })
                                                ) : (
                                                    <span>
                                                        No matching results
                                                        found
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
                                    category={categoryS}
                                ></Pagination>
                            </div>
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
        </>
    );
};

export default Catalog;
