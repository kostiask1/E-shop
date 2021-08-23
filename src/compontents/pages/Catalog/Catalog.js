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
import { local_itemsPerPage, local_page } from "../../../localStorage";
import FilterSection from "../../FilterSection/FilterSection";
import Pagination from "../../Pagination/Pagination";
import ShopItem from "../../ShopItem/ShopItem";
const Modal = lazy(() => import("../../Modal/Modal"));
const ItemCreator = lazy(() => import("../../ItemCreator/ItemCreator"));

const SHOP_NAME = process.env.REACT_APP_SHOP_NAME;

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
                    <div className="col-12 col-md-2 fade-in">
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
                    </div>
                    <div className="col-12 col-md-10">
                        <div className="row">
                            {itemsPerPage > 7 && newData.length > 3 && (
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
                                                    <div className="a">
                                                        <img
                                                            className="item-img skew"
                                                            src="/cog.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="item-body text-center">
                                                        <button
                                                            className="btn btn-primary mt-4 mb-5"
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
                                                .length > 0 &&
                                            Object.values(newData[page]).map(
                                                (item, index) => {
                                                    return (
                                                        <ShopItem
                                                            page={page}
                                                            index={index}
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
                                </div>
                            </div>
                            {itemsPerPage > 7 && newData.length > 3 && (
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
