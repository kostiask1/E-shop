import React from "react";

const Category = (props) => {
    const { item, change, category } = props;

    const handleInput = (e) => {
        change(e);
    };
    return (
        <div className="category">
            <input
                className="d-none"
                type="radio"
                name={category}
                id={item}
                onChange={(e) => handleInput(e)}
            />
            <label
                className={`form-check-label ${
                    item === category ? "checked" : ""
                }`}
                htmlFor={item}
            >
                {item === "all" ? "Show all" : item}
            </label>
        </div>
    );
};

export default Category;
