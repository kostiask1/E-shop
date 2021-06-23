import React, { useReducer } from "react";
import {
  FILTERS,
  RESPONSE,
  CATEGORY,
  PRICERANGE,
  SEARCHTEXT,
  ORDER,
  DATA,
} from "./types";
import { catalogReducer } from "./catalog-reducer";
import { catalogContext } from "./catalog-context";

import { app } from "../../base";
const db = app.firestore();

export const CatalogState = ({ children }) => {
  const initialState = {
    filters: [],
    rowData: [],
    data: [],
    admin: false,
    category: "all",
    minPrice: 0,
    maxPrice: 999999,
    searchText: "",
    order: null,
  };

  const [state, dispatch] = useReducer(catalogReducer, initialState);

  const getFilters = async () => {
    try {
      console.log("started loading...");
      let filters = await db.collection("categories").get();
      filters
        ? (filters = filters.docs.map((doc) => doc.data()))
        : (filters = []);
      if (filters.length) {
        filters = Object.values(filters[0].categories);
      }
      dispatch({ type: FILTERS, payload: filters });
      return filters;
    } catch (err) {
      console.error(err);
    }
  };

  const getData = () => {
    getFilters();
    db.collection("All")
      .get()
      .then((response) => {
        let row = [];
        let promise = new Promise((resolve) => {
          if (!response.docs.length) {
            return resolve(row);
          } else {
            response.docs.map((item) => {
              if (category && category !== "all") {
                if (item.data().category === category) {
                  return (row = row.concat(item.data()));
                }
              } else {
                return (row = row.concat(item.data()));
              }
              return false;
            });
          }
          resolve(row);
        });
        promise.then((response) => {
          dispatch({ type: DATA, payload: response });
          dispatch({ type: RESPONSE, payload: response });
        });
      });
  };

  const getById = async (id) => {
    if (!id) return dispatch({ type: DATA, payload: [] });
    let payload = [];
    try {
      const promises = id.map((id) =>
        db.collection("All").where("id", "==", id).get()
      );
      const responses = await Promise.all(promises);
      if (responses.length > 0 && responses[0].docs.length > 0) {
        responses.forEach((item) => {
          payload.push(item.docs[0].data());
        });
        dispatch({ type: DATA, payload });
        return true;
      } else {
        dispatch({ type: DATA, payload: [] });
        return false;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filterData = () => {
    let dataNew = [...rowData];
    if (searchText !== "" && dataNew.length > 0) {
      dataNew = dataNew.filter((item) => {
        return item.text.toLowerCase().includes(searchText);
      });
    }
    if (category !== "all" && dataNew.length > 0) {
      dataNew = dataNew.filter((item) => {
        return item.category === category;
      });
    }
    if (dataNew.length > 0) {
      dataNew = dataNew.filter((item) => {
        return item.price >= minPrice && item.price <= maxPrice;
      });
    }
    if (order !== null && order !== "") {
      function compare(a, b) {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      }

      dataNew.sort(compare);
      if (order === "desc") dataNew.reverse();
    }
    return dispatch({ type: DATA, payload: dataNew });
  };

  const setCategory = (value) => {
    localStorage.setItem("BLOOM_category", JSON.stringify(value));
    return dispatch({ type: CATEGORY, payload: value });
  };
  const setPriceRange = async (min, max) => {
    max = max === 0 ? 9999 : max;
    return dispatch({ type: PRICERANGE, payload: { min, max } });
  };
  const setSearchText = (value) => {
    return dispatch({ type: SEARCHTEXT, payload: value.toLowerCase() });
  };
  const setOrder = (value) => {
    return dispatch({ type: ORDER, payload: value });
  };

  const {
    filters,
    data,
    rowData,
    category,
    minPrice,
    maxPrice,
    searchText,
    order,
  } = state;

  return (
    <catalogContext.Provider
      value={{
        getData,
        getById,
        setCategory,
        setPriceRange,
        filterData,
        setSearchText,
        setOrder,
        data,
        filters,
        minPrice,
        maxPrice,
      }}
    >
      {children}
    </catalogContext.Provider>
  );
};
