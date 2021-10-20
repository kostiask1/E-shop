import React from "react"
import { local_page } from "../../localStorage"
import { DropDown } from "../DropDown/DropDown"
import "./Pagination.scss"
import { ArrowLeftIcon, ArrowRightIcon } from "../../icons"

const Pagination = ({
    handleSetPage,
    page,
    pages,
    itemsPerPage,
    handleItemsPerPage,
    setOrder,
    order,
}) => {
    const nextPage = () => {
        if (page < pages) {
            JSON.stringify(localStorage.setItem(local_page, page + 1))
            return handleSetPage(page + 1)
        }
    }
    const prevPage = () => {
        if (page > 0) {
            JSON.stringify(localStorage.setItem(local_page, page - 1))
            return handleSetPage(page - 1)
        }
    }
    const handleDropDown = (value) => {
        handleSetPage(value - 1)
    }
    let pagesArray = []
    for (let i = 1; i < pages + 1; i++) {
        pagesArray.push(i)
    }

    const PageBtn = ({ num }) => {
        return (
            <li className="page-item" key={num}>
                <button
                    className={`page-link ${page + 1 === num && "active"}`}
                    onClick={() => handleSetPage(num - 1)}
                >
                    {num}
                </button>
            </li>
        )
    }
    return (
        <div className="pagination">
            <ul className="pagination__block">
                <li className="page-item">
                    <button
                        className={`page-link page-arrow ${
                            page === 0 ? "disabled-link" : ""
                        }`}
                        disabled={page === 0 ? true : false}
                        onClick={() => prevPage()}
                    >
                        <ArrowLeftIcon />
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
                        if (
                            pagesArray.length > 8 &&
                            num !== pagesArray.length &&
                            num !== 1
                        ) {
                            if (
                                (page < 4 && num < 7) ||
                                (page > pagesArray.length - 5 &&
                                    num > pagesArray.length - 6)
                            ) {
                                return <PageBtn key={num} num={num}></PageBtn>
                            }
                            if (page < num + 2 && num < page + 4) {
                                return <PageBtn key={num} num={num}></PageBtn>
                            }
                        } else if (num !== pagesArray.length && num !== 1) {
                            return <PageBtn key={num} num={num}></PageBtn>
                        }
                        return null
                    })}
                {pagesArray.length > 1 && (
                    <PageBtn num={pagesArray.length}></PageBtn>
                )}
                <li className="page-item">
                    <button
                        className={`page-link page-arrow ${
                            page + 1 >= pages ? "disabled-link" : ""
                        }`}
                        disabled={page + 1 >= pages ? true : false}
                        onClick={() => nextPage()}
                    >
                        <ArrowRightIcon />
                    </button>
                </li>
                {pagesArray.length > 8 && (
                    <li className="page-item ">
                        <span>Jump to</span>
                        <DropDown
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
                    <DropDown
                        defaultValue={+itemsPerPage}
                        change={handleItemsPerPage}
                        options={[1, 3, 4, 6, 8, 12, 16, 20]}
                        searchable={false}
                    />
                </li>
                <li className="page-item">
                    <label>Sort</label>
                    <DropDown
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
    )
}

function arePropsEqual(prevProps, nextProps) {
    return (
        prevProps.pages === nextProps.pages &&
        prevProps.page === nextProps.page &&
        prevProps.itemsPerPage === nextProps.itemsPerPage &&
        prevProps.order === nextProps.order
    )
}

export default React.memo(Pagination, arePropsEqual)
