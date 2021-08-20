import React from "react";

const Category = (props) => {
    const { categories, item, change } = props;
    return (
        <div className="category">
            <input
                className="d-none"
                type="radio"
                name={categories}
                id={item}
                onChange={(e) => change(e)}
            />
            <label className="form-check-label" htmlFor={item}>
                {item}
            </label>
        </div>
    );
};

export default Category;
