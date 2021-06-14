import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../../context/Auth/auth-context";
import { catalogContext } from "../../../context/catalog/catalog-context";
import Category from "../../Category/Category";
import ShopItem from "../../ShopItem/ShopItem";

const SHOP_NAME = process.env.REACT_APP_SHOP_NAME;

const Catalog = (props) => {
  const { filters, find, category, findWithText, data, setCategory } =
    useContext(catalogContext);
  const { admin } = useContext(authContext);
  const [itemsPerPage, setItemsPerPage] = useState(
    JSON.parse(localStorage.getItem("BloomItemsPerPage")) || 6
  );
  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem("BloomPage")) || 0
  );

  useEffect(() => {
    find();
    //eslint-disable-next-line
  }, [category]);

  let functions;
  if (admin) {
    functions = { addToCart: true, deleteItem: true };
  } else {
    functions = { addToCart: true };
  }

  const handleInput = (e) => {
    findWithText(e.target.value);
  };

  const handleCheckbox = (e) => {
    return setCategory(e.target.id);
    //return find(e.target.id);
  };
  let newData = data
    ? data.reduce(
        (result, value, index, sourceArray) =>
          index % itemsPerPage === 0
            ? [...result, sourceArray.slice(index, index + itemsPerPage)]
            : result,
        []
      )
    : [];

  if (page > Math.ceil(data.length / itemsPerPage)) {
    JSON.stringify(
      localStorage.setItem("BloomPage", Math.ceil(data.length / itemsPerPage))
    );
    window.location.reload();
  }

  const nextPage = () => {
    if (page < Math.ceil(data.length / itemsPerPage)) {
      JSON.stringify(localStorage.setItem("BloomPage", page + 1));
      return setPage((page) => (page = page + 1));
    }
  };
  const prevPage = () => {
    if (page > 0) {
      JSON.stringify(localStorage.setItem("BloomPage", page - 1));
      return setPage((page) => (page = page - 1));
    }
  };
  const handleSelect = (value) => {
    JSON.stringify(localStorage.setItem("BloomItemsPerPage", value));
    setItemsPerPage(value);
  };
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
                  {newData.length > 0 &&
                  Object.values(newData[page]).length > 0 ? (
                    Object.values(newData[page]).map((item, index) => {
                      return (
                        <ShopItem
                          key={index}
                          id={item.id}
                          text={item.text}
                          image={item.image}
                          category={item.category}
                          description={item.description}
                          price={item.price}
                          functions={functions}
                          admin={admin}
                        />
                      );
                    })
                  ) : (
                    <span>No matching results found</span>
                  )}
                </div>
              </div>
            </div>
            <button
              disabled={page === 0 ? true : false}
              onClick={() => prevPage()}
            >
              Prev page
            </button>
            <button
              disabled={
                page + 1 >= Math.ceil(data.length / itemsPerPage) ? true : false
              }
              onClick={() => nextPage()}
            >
              Next page
            </button>
            <select
              name="category"
              id="category"
              value={itemsPerPage}
              onChange={(e) => handleSelect(e.target.value)}
            >
              {[4, 6, 8, 10, 20].map((idx) => (
                <option value={idx} key={idx}>
                  {idx}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Catalog;
