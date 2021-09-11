import React, { useContext } from "react";
import { catalogContext } from "../../context/catalog/catalog-context";
import Category from "../Category/Category";
import "./FilterSection.scss";
import { SearchIcon } from "../../icons";
import Input from "../Input/Input";

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
            <Input
                placeholder="Search..."
                important="defaultValue"
                defaultValue={searchText}
                change={handleInput}
                symbol={
                    <SearchIcon width="18px" height="18px" fill="var(--gray)" />
                }
            />
            <div className="categories">
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
            <div className="price__filters">
                <Input
                    className={`${
                        minPrice > maxPrice && maxPrice !== 0 ? "error" : ""
                    }`}
                    type="number"
                    placeholder="Min"
                    important="defaultValue"
                    defaultValue={minPrice ? minPrice : ""}
                    change={handleMin}
                />
                <Input
                    className={`${
                        minPrice > maxPrice && maxPrice !== 0 ? "error" : ""
                    }`}
                    type="number"
                    placeholder="Max"
                    important="defaultValue"
                    defaultValue={maxPrice ? maxPrice : ""}
                    change={handleMax}
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
