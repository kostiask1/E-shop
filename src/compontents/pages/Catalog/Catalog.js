import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { catalogContext } from "../../../context/catalog/catalog-context";
import ShopItem from "../../ShopItem/ShopItem";
const Catalog = () => {
  const { filters, find, findWithText, data } = useContext(catalogContext);

  useEffect(() => {
    find();
    //eslint-disable-next-line
  }, []);

  const handleInput = (e) => {
    findWithText(e.target.value);
  };

  const handleCheckbox = (e) => {
    return find(e.target.id);
  };

  return (
    <main className="main">
      <div className="bg">
        <h1>The Bloom</h1>
        <div className="container-fluid">
          <p className="navbar">Shop by Apolin Ko</p>
        </div>
      </div>
      <Link className="fas fa-shopping-cart" to="/" />
      <div className="container catalog__wrapper">
        <div className="row">
          <div className="col-12 col-md-2">
            <div className="catalog__filters"></div>
            <input
              type="radio"
              name="categories"
              id="all"
              onChange={(e) => handleCheckbox(e)}
            />
            <label htmlFor="all">Show all</label>
            {filters
              ? filters.map((item, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name="categories"
                      id={item}
                      onChange={(e) => handleCheckbox(e)}
                      key={index}
                    />
                    <label htmlFor={item} key={item + 1}>
                      {item}
                    </label>
                  </div>
                ))
              : null}
            <input
              className="form-control"
              type="text"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="col-12 col-md-10">
            <div className="catalog">
              <div className="container">
                <div className="row">
                  {Object.values(data).length > 0 ? (
                    Object.values(data).map((item, index) => {
                      // console.log(item);
                      return (
                        <ShopItem
                          key={index}
                          id={item.id}
                          text={item.text}
                          src={item.image}
                          price={item.price}
                        />
                      );
                    })
                  ) : (
                    <span>No matching results found</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Catalog;
