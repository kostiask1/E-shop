import React from "react";

const Pagination = ({
    prevPage,
    nextPage,
    handleSetPage,
    pagesArray,
    page,
    pages,
    itemsPerPage,
    handleItemsPerPage,
    handleOrder,
    orderS,
}) => {
    return (
        <div className="col-12">
            <div className="row justify-content-between">
                <div className="col-6">
                    <ul className="pagination pagination-sm">
                        <li className="page-item">
                            <button
                                className={`page-link ${
                                    page === 0 ? "disabled" : ""
                                }`}
                                disabled={page === 0 ? true : false}
                                onClick={() => prevPage()}
                            >
                                Prev page
                            </button>
                        </li>
                        <li className="page-item">
                            <button
                                className={`page-link ${
                                    page === 0 && "active"
                                }`}
                                onClick={() => handleSetPage(0)}
                            >
                                1
                            </button>
                        </li>
                        {pagesArray.length > 0 &&
                            pagesArray.map((num) => {
                                if (pagesArray.length > 8) {
                                    if (
                                        page < num + 2 &&
                                        num < page + 4 &&
                                        num !== 1 &&
                                        num !== pagesArray.length
                                    ) {
                                        return (
                                            <li className="page-item" key={num}>
                                                <button
                                                    className={`page-link ${
                                                        page + 1 === num &&
                                                        "active"
                                                    }`}
                                                    onClick={() =>
                                                        handleSetPage(num - 1)
                                                    }
                                                >
                                                    {num}
                                                </button>
                                            </li>
                                        );
                                    }
                                } else {
                                    if (
                                        num !== 1 &&
                                        num !== pagesArray.length
                                    ) {
                                        return (
                                            <li className="page-item" key={num}>
                                                <button
                                                    className={`page-link ${
                                                        page + 1 === num &&
                                                        "active"
                                                    }`}
                                                    onClick={() =>
                                                        handleSetPage(num - 1)
                                                    }
                                                >
                                                    {num}
                                                </button>
                                            </li>
                                        );
                                    }
                                }
                                return null;
                            })}
                        <li className="page-item">
                            <button
                                className={`page-link ${
                                    page + 1 === pagesArray.length && "active"
                                }`}
                                onClick={() =>
                                    handleSetPage(pagesArray.length - 1)
                                }
                            >
                                {pagesArray.length}
                            </button>
                        </li>
                        <li className="page-item">
                            <button
                                className={`page-link ${
                                    page + 1 >= pages ? "disabled" : ""
                                }`}
                                disabled={page + 1 >= pages ? true : false}
                                onClick={() => nextPage()}
                            >
                                Next page
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="col-6">
                    <ul className="pagination pagination-sm justify-content-end">
                        <li className="page-item ml-4">
                            <label className="mr-1">Items on page</label>
                            <select
                                className="page-link d-inline-block mr-1"
                                name="category"
                                id="category"
                                value={itemsPerPage}
                                onChange={(e) =>
                                    handleItemsPerPage(e.target.value)
                                }
                            >
                                {[3, 4, 6, 8, 12, 16].map((idx) => (
                                    <option value={idx} key={idx}>
                                        {idx}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li className="page-item">
                            <select
                                className="page-link"
                                name="order"
                                id="order"
                                value={orderS}
                                onChange={(e) => handleOrder(e.target.value)}
                            >
                                <option value="">Sort by:</option>
                                <option value="newest">Newest</option>
                                <option value="asc">Price Ascending</option>
                                <option value="desc">Price Descending</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
