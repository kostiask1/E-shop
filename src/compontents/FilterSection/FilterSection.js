import React, { useContext, useEffect } from "react";
import { catalogContext } from "../../context/catalog/catalog-context";
import Category from "../Category/Category";

const FilterSection = (props) => {
    const {
        filters,
        searchText,
        handleInput,
        handleCheckbox,
        handleMin,
        handleMax,
        minPrice,
        maxPrice,
        category,
    } = props;
    const { resetFilters } = useContext(catalogContext);
    return (
        <>
            <input
                className="form-control mb-2"
                type="text"
                placeholder="Search..."
                defaultValue={searchText}
                onChange={(e) => handleInput(e.target.value)}
            />
            <div className="ml-1">
                {filters
                    ? filters.map((item, index) => (
                          <Category
                              category={category}
                              key={index}
                              item={item}
                              change={(e) => handleCheckbox(e)}
                          />
                      ))
                    : null}
            </div>
            <div className="catalog__filters input-group input-group-sm mt-3">
                <input
                    className={`form-control mr-1 ${
                        minPrice > maxPrice && maxPrice !== 0 ? "error" : ""
                    }`}
                    type="text"
                    placeholder="Min"
                    defaultValue={+minPrice ? +minPrice : ""}
                    onChange={(e) => handleMin(e.target.value)}
                />
                <input
                    className={`form-control ml-1 ${
                        minPrice > maxPrice && maxPrice !== 0 ? "error" : ""
                    }`}
                    type="text"
                    placeholder="Max"
                    defaultValue={+maxPrice ? +maxPrice : ""}
                    onChange={(e) => handleMax(e.target.value)}
                />
            </div>
            <button
                className="btn btn-sm btn-warning mt-4"
                onClick={resetFilters}
            >
                Reset Filters
            </button>
        </>
    );
};

function arePropsEqual(prevProps, nextProps) {
    return (
        prevProps.minPrice === nextProps.minPrice &&
        prevProps.maxPrice === nextProps.maxPrice &&
        prevProps.category === nextProps.category &&
        prevProps.filters === nextProps.filters
    );
}

export default React.memo(FilterSection, arePropsEqual);
