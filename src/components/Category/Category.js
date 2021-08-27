import React from "react";
import "./Category.scss";

const Category = (props) => {
    const { item, change, category } = props;

    return (
        <div className="category">
            <input
                className="hidden"
                type="radio"
                name={category}
                id={item}
                onChange={(e) => change(e)}
            />
            <label
                className={`${item === category ? "checked" : ""}`}
                htmlFor={item}
            >
                {item === "all" ? "Show all" : item}
            </label>
        </div>
    );
};

export default Category;
