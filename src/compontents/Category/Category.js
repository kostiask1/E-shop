import React from "react";

const Category = (props) => {
  const { categories, item, change } = props;
  return (
    <div>
      <input
        type="radio"
        name={categories}
        id={item}
        onChange={(e) => change(e)}
      />
      <label htmlFor={item} key={item + 1}>
        {item}
      </label>
    </div>
  );
};

export default Category;
