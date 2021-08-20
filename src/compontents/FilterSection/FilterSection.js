import React from "react";
import Category from "../Category/Category";

const FilterSection = (props) => {
    const {
        filters,
        handleInput,
        handleCheckbox,
        handleMin,
        handleMax,
        minPrice,
        maxPrice,
    } = props;

    return (
        <>
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
                    className={`form-control mr-1 ${
                        minPrice > maxPrice ? "error" : ""
                    }`}
                    type="text"
                    placeholder="Min"
                    onChange={(e) => handleMin(e.target.value)}
                />
                <input
                    className={`form-control ml-1 ${
                        minPrice > maxPrice ? "error" : ""
                    }`}
                    type="text"
                    placeholder="Max"
                    onChange={(e) => handleMax(e.target.value)}
                />
            </div>
        </>
    );
};

function arePropsEqual(prevProps, nextProps) {
    return (
        prevProps.filters === nextProps.filters &&
        prevProps.minPrice === nextProps.minPrice &&
        prevProps.maxPrice === nextProps.maxPrice
    );
}

export default React.memo(FilterSection, arePropsEqual);
