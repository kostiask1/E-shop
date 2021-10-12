import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import "./DropDown.scss"
import { ArrowDownIcon, ArrowUpIcon } from "../../icons"
import { useTranslation } from "react-i18next"

export const DropDown = (props) => {
    const {
        imagesArray,
        change,
        options,
        defaultValue,
        optionsLabels,
        placeholder,
        searchable = true,
    } = props
    const { t, i18n } = useTranslation()
    const [visible, setVisible] = useState(false)
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [key] = useState(() => "drop-" + uuidv4())
    useEffect(() => {
        document.addEventListener("mouseup", clickHandler)
        return () => {
            document.removeEventListener("mouseup", clickHandler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const clickHandler = (e) => {
        let inComponent = e.target.matches(`.${key} *`)
        if (!inComponent) {
            setFilteredOptions(options)
            setVisible(false)
        }
    }

    const filterFunction = (e) => {
        const timeOutId = setTimeout(() => {
            let clone = [...options]
            clone = clone.filter((option) => {
                if (typeof option === "number") {
                    option = `${option}`
                }
                return option.includes(e.target.value)
            })
            if (clone.length === 1) {
                change(clone[0])
                setVisible(false)
                return true
            }
            setFilteredOptions(clone)
        }, 350)
        if (e.key === "Enter" && options.includes(+e.target.value)) {
            change(e.target.value)
            setVisible(false)
        }
        return () => clearTimeout(timeOutId)
    }

    const toggleDropDown = (event) => {
        event.preventDefault()
        setVisible(!visible)
    }
    const handleOptionClick = (e) => {
        setVisible(false)
        setFilteredOptions(options)
        change(e.target.attributes["value"].value)
    }
    return (
        <div className={"DropDown " + key}>
            <button onClick={toggleDropDown} className="DropDown__button">
                {defaultValue ? (
                    optionsLabels ? (
                        imagesArray ? (
                            <img
                                src={imagesArray[options.indexOf(defaultValue)]}
                                alt={imagesArray[options.indexOf(defaultValue)]}
                            ></img>
                        ) : (
                            optionsLabels[options.indexOf(defaultValue)]
                        )
                    ) : (
                        defaultValue
                    )
                ) : (
                    placeholder
                )}
                {visible ? (
                    <ArrowUpIcon viewbox="0 0 20 20" />
                ) : (
                    <ArrowDownIcon viewbox="0 0 20 20" />
                )}
            </button>
            {visible && (
                <div className="DropDown__content">
                    {searchable && (
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search.."
                            onKeyUp={filterFunction}
                        />
                    )}
                    <ul>
                        {filteredOptions.length ? (
                            filteredOptions.map((option, index) => (
                                <li
                                    className={
                                        option === defaultValue
                                            ? "selected"
                                            : ""
                                    }
                                    key={option}
                                    value={option}
                                    onClick={handleOptionClick}
                                >
                                    {imagesArray ? (
                                        <img
                                            src={imagesArray[index]}
                                            alt={imagesArray[index]}
                                        />
                                    ) : null}
                                    {optionsLabels
                                        ? optionsLabels[index]
                                        : option}
                                </li>
                            ))
                        ) : (
                            <li className="disabled">{t("noResultsFound")}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}
