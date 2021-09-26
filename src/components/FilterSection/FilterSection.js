import React, { useContext, useMemo } from "react";
import { catalogContext } from "../../context/catalog/catalog-context";
import Category from "../Category/Category";
import "./FilterSection.scss";
import { SearchIcon } from "../../icons";
import Input from "../Input/Input";

const FilterSection = (props) => {
    const { handleCheckbox } = props;
    const {
        setSearchText,
        resetFilters,
        searchText,
        category,
        filters,
        setMinPrice,
        setMaxPrice,
        minPrice,
        maxPrice,
    } = useContext(catalogContext);

    const handleInput = (e) => {
        const timeOutId = setTimeout(() => {
            setSearchText(e);
        }, 350);
        return () => clearTimeout(timeOutId);
    };

    return useMemo(
        () => (
            <div className="filter-section fade-in">
                <Input
                    placeholder="Search..."
                    important="defaultValue"
                    defaultValue={searchText}
                    change={handleInput}
                    symbol={
                        <SearchIcon
                            width="18px"
                            height="18px"
                            fill="var(--gray)"
                        />
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
                        change={setMinPrice}
                    />
                    <Input
                        className={`${
                            minPrice > maxPrice && maxPrice !== 0 ? "error" : ""
                        }`}
                        type="number"
                        placeholder="Max"
                        important="defaultValue"
                        defaultValue={maxPrice ? maxPrice : ""}
                        change={setMaxPrice}
                    />
                </div>
                <button className="btn btn-warning" onClick={resetFilters}>
                    Reset Filters
                </button>
            </div>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filters, category, minPrice, maxPrice]
    );
};

export default FilterSection;
