import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { catalogContext } from "../../../context/catalog/catalog-context";
import Category from "../../Category/Category";
import ShopItem from "../../ShopItem/ShopItem";

const SHOP_NAME = process.env.REACT_APP_SHOP_NAME;

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
  //console.log("renders");
  //console.log(data)

  return (
    <main className="main">
      <div className="bg">
        <h1>{SHOP_NAME}</h1>
        <div className="container-fluid">
          <p className="navbar">Shop by Apollin Ko</p>
        </div>
      </div>
      <Link className="fas fa-shopping-cart" to="/cart" />
      <div className="container-fluid catalog__wrapper pb-5 pt-2">
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
                  <Category
                    key={index}
                    categories="categories"
                    item={item}
                    change={(e) => handleCheckbox(e)}
                  />
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
                          image={item.image}
                          category={item.category}
                          description={item.description}
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
