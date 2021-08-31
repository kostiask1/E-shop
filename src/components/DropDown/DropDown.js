import React, { useState, useEffect } from "react";
import "./Dropdown.scss";

export const Dropdown = (props) => {
    const { change, options, defaultValue, optionsLabels, placeholder } = props;
    const [visible, setVisible] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
        document.addEventListener("mouseup", clickHandler);
        return () => {
            document.removeEventListener("mouseup", clickHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clickHandler = (e) => {
        let inComponent = e.target.matches(".dropdown *");
        if (!inComponent) {
            setFilteredOptions(options);
            setVisible(false);
        }
    };

    const filterFunction = (e) => {
        const timeOutId = setTimeout(() => {
            let clone = [...options];
            clone = clone.filter((option) => {
                if (typeof option === "number") {
                    option = `${option}`;
                }
                return option.includes(e.target.value);
            });
            setFilteredOptions(clone);
        }, 350);
        return () => clearTimeout(timeOutId);
    };

    const toggleDropdown = (event) => {
        event.preventDefault();
        setVisible(!visible);
    };
    const handleOptionClick = (e) => {
        setVisible(false);
        setFilteredOptions(options);
        change(e.target.attributes["value"].value);
    };
    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown__button">
                {defaultValue ? defaultValue : placeholder}
                {visible ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 0 20 12"
                        width="20px"
                        fill="#000000"
                    >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 0 20 12"
                        width="20px"
                        fill="#000000"
                    >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                )}
            </button>
            {visible && (
                <div className="dropdown__content">
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search.."
                        onKeyUp={filterFunction}
                    />
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
                                    {optionsLabels
                                        ? optionsLabels[index]
                                        : option}
                                </li>
                            ))
                        ) : (
                            <li className="disabled">Nothing found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};
