import React, { useContext, useMemo } from "react"
import { catalogContext } from "../../../context/catalog/catalog-context"
import "./FilterSection.scss"
import { SearchIcon } from "../../../icons"
import Input from "../../../components/Input/Input"
import { DropDown } from "../../../components/DropDown/DropDown"

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
                            fill="var(--main-2)"
                        />
                    }
                />
                <span>Category</span>
                <DropDown
                    key={filters}
                    options={filters}
                    change={handleCheckbox}
                    defaultValue={category}
                    placeholder="Choose category"
                ></DropDown>
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
