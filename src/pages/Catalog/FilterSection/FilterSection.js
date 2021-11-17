import React, { useContext, useMemo } from "react"
import { catalogContext } from "../../../context/catalog/catalog-context"
import Category from "./Category/Category"
import "./FilterSection.scss"
import { SearchIcon } from "../../../icons"
import Input from "../../../components/Input/Input"

const FilterSection = (props) => {
    const { handleCheckbox } = props
    const { setSearchText, searchText, category, filters } =
        useContext(catalogContext)

    const handleInput = (e) => {
        const timeOutId = setTimeout(() => {
            setSearchText(e)
        }, 350)
        return () => clearTimeout(timeOutId)
    }

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
            </div>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filters, category]
    )
}

function arePropsEqual() {
    return true
}
export default React.memo(FilterSection, arePropsEqual)
