import React, { useContext } from "react";
import { catalogContext } from "../../context/catalog/catalog-context";
import Category from "../Category/Category";
import "./FilterSection.scss";

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
        <div className="filter-section fade-in">
            <input
                className="form-control"
                type="text"
                placeholder="Search..."
                defaultValue={searchText}
                onChange={(e) => handleInput(e.target.value)}
            />
            <div>
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
            <div className="catalog__filters">
                <input
                    className={`form-control  ${
                        minPrice > maxPrice && maxPrice !== 0 ? "error" : ""
                    }`}
                    type="number"
                    placeholder="Min"
                    defaultValue={minPrice ? minPrice : ""}
                    onChange={(e) => handleMin(e.target.value)}
                />
                <input
                    className={`form-control  ${
                        minPrice > maxPrice && maxPrice !== 0 ? "error" : ""
                    }`}
                    type="number"
                    placeholder="Max"
                    defaultValue={maxPrice ? maxPrice : ""}
                    onChange={(e) => handleMax(e.target.value)}
                />
            </div>
            <button className="btn btn-warning" onClick={resetFilters}>
                Reset Filters
            </button>
        </div>
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
