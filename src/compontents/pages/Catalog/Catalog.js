import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../../context/Auth/auth-context";
import { catalogContext } from "../../../context/catalog/catalog-context";
import Category from "../../Category/Category";
import ShopItem from "../../ShopItem/ShopItem";

const SHOP_NAME = process.env.REACT_APP_SHOP_NAME;

const Catalog = (props) => {
  const {
    filters,
    data,
    setCategory,
    category,
    setSearchText,
    getData,
    setPriceRange,
    filterData,
    setOrder,
    minPrice,
    maxPrice,
  } = useContext(catalogContext);
  const { admin } = useContext(authContext);
  const [orderS, setOrderS] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(
    JSON.parse(localStorage.getItem("BloomItemsPerPage")) || 6
  );
  const [categoryS, setCategoryS] = useState("");
  const [search, setSearch] = useState("");
  const [minPriceS, setMinPriceS] = useState(0);
  const [maxPriceS, setMaxPriceS] = useState(999999);
  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem("BloomPage")) || 0
  );

  useEffect(() => {
    let get = Promise.resolve(getData());
    get.then(() => filterData());
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    let get = Promise.resolve(setPriceRange(+minPriceS, +maxPriceS));
    get.then(() => filterData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryS, category, search, minPrice, maxPrice, orderS]);

  useEffect(() => {
    setNewData();
    //eslint-disable-next-line
  }, [itemsPerPage, page]);

  useEffect(() => {
    setPriceRange(+minPriceS, +maxPriceS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPriceS, maxPriceS]);

  let functions;
  if (admin) {
    functions = { addToCart: true, deleteItem: true };
  } else {
    functions = { addToCart: true };
  }

  const handleInput = (e) => {
    setSearchText(e.target.value);
    return setSearch(e.target.value);
  };

  const handleCheckbox = (e) => {
    setCategory(e.target.id);
    return setCategoryS(e.target.id);
  };
  const handleMin = (e) => {
    setMinPriceS(e);
  };
  const handleMax = (e) => {
    setMaxPriceS(e);
  };
  const handleOrder = (value) => {
    setOrderS(value);
    return setOrder(value);
  };

  const handleItmesPerPage = (value) => {
    if (page >= Math.ceil(data.length / itemsPerPage) - 1) {
      if (Math.ceil(data.length / itemsPerPage) - 1 >= 0) {
        setPage(Math.ceil(data.length / itemsPerPage) - 1);
        JSON.stringify(
          localStorage.setItem(
            "BloomPage",
            Math.ceil(data.length / itemsPerPage) - 1
          )
        );
      }
      else if (Math.ceil(data.length / itemsPerPage) - 2 >= 0) {
        setPage(Math.ceil(data.length / itemsPerPage) - 2);
        JSON.stringify(
          localStorage.setItem(
            "BloomPage",
            Math.ceil(data.length / itemsPerPage) - 2
          )
        );
      }
    }
    if (page > 0) {
      JSON.stringify(localStorage.setItem("BloomPage", page - 1));
      setPage((page) => (page = page - 1));
    }
    JSON.stringify(localStorage.setItem("BloomItemsPerPage", value));
    setItemsPerPage(value);
  };
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

  let newData;
  const setNewData = () => {
    let clone = [...data];
    let chunks = function (array, size) {
      let results = [];
      while (array.length) {
        results.push(array.splice(0, size));
      }
      return results;
    };
    newData = chunks(clone, itemsPerPage);
  };
  setNewData();

  if (page > Math.ceil(data.length / itemsPerPage)) {
    JSON.stringify(
      localStorage.setItem("BloomPage", Math.ceil(data.length / itemsPerPage))
    );
    window.location.reload();
  }
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
            <div className="catalog__filters row">
              <div className="col-6">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Min"
                  onChange={(e) => handleMin(e.target.value)}
                />
              </div>
              <div className="col-6">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Max"
                  onChange={(e) => handleMax(e.target.value)}
                />
              </div>
            </div>
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
              placeholder="Search..."
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="col-12 col-md-10">
            <div id="catalog" className="catalog">
              <div className="container-fluid">
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
              onChange={(e) => handleItmesPerPage(e.target.value)}
            >
              {[4, 6, 8, 10, 20].map((idx) => (
                <option value={idx} key={idx}>
                  {idx}
                </option>
              ))}
            </select>
            <select
              name="order"
              id="order"
              value={orderS}
              onChange={(e) => handleOrder(e.target.value)}
            >
              <option value="">Order:</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Catalog;
