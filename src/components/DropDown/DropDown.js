import React, { useState, useEffect } from "react";
import "./Dropdown.scss";

export const Dropdown = (props) => {
    const { change, options, defaultValue } = props;
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

    const toggleDropdown = () => {
        setVisible(!visible);
    };
    const handleOptionClick = (e) => {
        setVisible(false);
        setFilteredOptions(options);
        change(e.target.value - 1);
    };
    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown__button">
                {defaultValue}
                <i
                    className={` fas fa-chevron-${visible ? "up" : "down"}`}
                />
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
                            filteredOptions.map((option) => (
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
                                    {option}
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
