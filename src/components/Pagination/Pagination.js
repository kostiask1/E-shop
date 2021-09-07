import React from "react";
import { local_page } from "../../localStorage";
import { Dropdown } from "../Dropdown/Dropdown";
import "./Pagination.scss";

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
    const handleDropDown = (value) => {
        handleSetPage(value - 1);
    };
    let pagesArray = [];
    for (let i = 1; i < pages + 1; i++) {
        pagesArray.push(i);
    }
    return (
        <div className="pagination">
            <ul className="pagination__block">
                <li className="page-item">
                    <button
                        className={`page-link ${page === 0 ? "disabled" : ""}`}
                        disabled={page === 0 ? true : false}
                        onClick={() => prevPage()}
                    >
                        Prev {screenWidth > 450 && "page"}
                    </button>
                </li>
                <li className="page-item">
                    <button
                        className={`page-link ${page === 0 && "active"}`}
                        onClick={() => handleSetPage(0)}
                    >
                        1
                    </button>
                </li>
                {pagesArray.length > 0 &&
                    pagesArray.map((num) => {
                        if (pagesArray.length > 8) {
                            if (
                                page < num + 1 &&
                                num < page + 3 &&
                                num !== 1 &&
                                num !== pagesArray.length
                            ) {
                                return (
                                    <li className="page-item" key={num}>
                                        <button
                                            className={`page-link ${
                                                page + 1 === num && "active"
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
                            if (num !== 1 && num !== pagesArray.length) {
                                return (
                                    <li className="page-item" key={num}>
                                        <button
                                            className={`page-link ${
                                                page + 1 === num && "active"
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
                                page + 1 === pagesArray.length && "active"
                            }`}
                            onClick={() => handleSetPage(pagesArray.length - 1)}
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
                {pagesArray.length > 8 && (
                    <li className="page-item ">
                        <span>Jump to</span>
                        <Dropdown
                            key={pagesArray.length}
                            defaultValue={page + 1}
                            change={handleDropDown}
                            options={pagesArray}
                        />
                    </li>
                )}
            </ul>
            <ul className="pagination__filters">
                <li className="page-item">
                    <label>Items</label>
                    <Dropdown
                        defaultValue={itemsPerPage}
                        change={handleItemsPerPage}
                        options={[1, 3, 4, 6, 8, 12, 16, 20]}
                        searchable={false}
                    />
                </li>
                <li className="page-item">
                    <label>Sort</label>
                    <Dropdown
                        defaultValue={order}
                        change={setOrder}
                        optionsLabels={[
                            "Most popular",
                            "Newest",
                            "Price Ascending",
                            "Price Descending",
                        ]}
                        options={["popular", "newest", "asc", "desc"]}
                        searchable={false}
                    />
                </li>
            </ul>
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
