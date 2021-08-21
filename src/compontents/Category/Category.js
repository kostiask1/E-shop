import React from "react";

const Category = (props) => {
    const { item, change, category } = props;

    return (
        <div className="category">
            <input
                className="d-none"
                type="radio"
                name={category}
                id={item}
                onChange={(e) => change(e)}
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
