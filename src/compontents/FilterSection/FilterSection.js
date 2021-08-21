import React from "react";
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

    return (
        <>
            <input
                className="form-control"
                type="text"
                placeholder="Search..."
                defaultValue={searchText}
                onChange={(e) => handleInput(e.target.value)}
            />
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
            <div className="catalog__filters input-group input-group-sm mt-4">
                <input
                    className={`form-control mr-1 ${
                        minPrice > maxPrice ? "error" : ""
                    }`}
                    type="text"
                    placeholder="Min"
                    defaultValue={+minPrice ? +minPrice : ""}
                    onChange={(e) => handleMin(e.target.value)}
                />
                <input
                    className={`form-control ml-1 ${
                        minPrice > maxPrice ? "error" : ""
                    }`}
                    type="text"
                    placeholder="Max"
                    defaultValue={+maxPrice ? +maxPrice : ""}
                    onChange={(e) => handleMax(e.target.value)}
                />
            </div>
        </>
    );
};

function arePropsEqual(prevProps, nextProps) {
    return (
        prevProps.category === nextProps.category &&
        prevProps.filters === nextProps.filters
    );
}

export default React.memo(FilterSection, arePropsEqual);
