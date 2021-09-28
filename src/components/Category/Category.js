import React from "react";
import "./Category.scss";
import Input from "../Input/Input";

const Category = (props) => {
    const { item, change, category } = props;

    return (
        <>
            <div className="category">
                <Input
                    key={category}
                    type="radio"
                    className="hidden"
                    name={item}
                    value={item}
                    change={change}
                />
                <label
                    className={`${item === category ? "checked" : ""}`}
                    htmlFor={item}
                >
                    {item === "all" ? "Show all" : item}
                </label>
            </div>
            {item === "all" && <div className="divider" />}
        </>
    );
};

export default Category;
