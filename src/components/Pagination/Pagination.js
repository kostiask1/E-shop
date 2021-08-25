import React from "react";
import { local_page } from "../../localStorage";
import { DropDown } from "../DropDown/DropDown";

const Pagination = ({
    handleSetPage,
    page,
    pages,
    itemsPerPage,
    handleItemsPerPage,
    setOrder,
    order,
}) => {
    let screenWidth = document.documentElement.clientWidth;
    const nextPage = () => {
        if (page < pages) {
            JSON.stringify(localStorage.setItem(local_page, page + 1));
            return handleSetPage(page + 1);
        }
    };
    const prevPage = () => {
        if (page > 0) {
            JSON.stringify(localStorage.setItem(local_page, page - 1));
            return handleSetPage(page - 1);
        }
    };
    let pagesArray = [];
    for (let i = 1; i < pages + 1; i++) {
        pagesArray.push(i);
    }
    return (
        <div className="col-12">
            <div className="row">
                <div className="col-lg-6">
                    <ul className="pagination pagination-sm">
                        <li className="page-item">
                            <button
                                className={`page-link ${
                                    page === 0 ? "disabled" : ""
                                }`}
                                disabled={page === 0 ? true : false}
                                onClick={() => prevPage()}
                            >
                                Prev {screenWidth > 450 && "page"}
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
                        {pagesArray.length > 1 && (
                            <li className="page-item">
                                <button
                                    className={`page-link ${
                                        page + 1 === pagesArray.length &&
                                        "active"
                                    }`}
                                    onClick={() =>
                                        handleSetPage(pagesArray.length - 1)
                                    }
                                >
                                    {pagesArray.length}
                                </button>
                            </li>
                        )}
                        <li className="page-item">
                            <button
                                className={`page-link ${
                                    page + 1 >= pages ? "disabled" : ""
                                }`}
                                disabled={page + 1 >= pages ? true : false}
                                onClick={() => nextPage()}
                            >
                                Next {screenWidth > 450 && "page"}
                            </button>
                        </li>
                        {pagesArray.length > 7 && (
                            <li className="page-item ml-3">
                                <span>Jump to</span>
                                <DropDown
                                    key={pagesArray.length}
                                    defaultValue={page + 1}
                                    change={handleSetPage}
                                    options={pagesArray}
                                />
                            </li>
                        )}
                    </ul>
                </div>
                <div className="col-lg-6">
                    <ul className="pagination pagination-sm pagination-filters">
                        <li className="page-item">
                            <label className="mr-1">Items to Show</label>
                            <select
                                className="page-link d-inline-block mr-1"
                                name="category"
                                id="category"
                                value={itemsPerPage}
                                onChange={(e) =>
                                    handleItemsPerPage(e.target.value)
                                }
                            >
                                {[1, 3, 4, 6, 8, 12, 16, 20].map((idx) => (
                                    <option value={idx} key={idx}>
                                        {idx}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li className="page-item">
                            <label className="mr-1">Sort by:</label>
                            <select
                                className="page-link"
                                name="order"
                                id="order"
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
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

function arePropsEqual(prevProps, nextProps) {
    return (
        prevProps.pages === nextProps.pages &&
        prevProps.page === nextProps.page &&
        prevProps.itemsPerPage === nextProps.itemsPerPage &&
        prevProps.order === nextProps.order
    );
}

export default React.memo(Pagination, arePropsEqual);
