import React, { useReducer } from "react";
import { FILTERS, RESPONSE, CATEGORY } from "./types";
import { catalogReducer } from "./catalog-reducer";
import { catalogContext } from "./catalog-context";

import { app } from "../../base";
const db = app.firestore();

export const CatalogState = ({ children }) => {
  const initialState = {
    filters: [],
    data: [],
    admin: false,
    category: "all",
  };

  const [state, dispatch] = useReducer(catalogReducer, initialState);

  const findWithId = async (id) => {
    if (!id) return dispatch({ type: RESPONSE, payload: [] });
    let payload = [];
    try {
      const promises = id.map((id) =>
        db.collection("All").where("id", "==", id).get()
      );
      const responses = await Promise.all(promises);
      console.log(responses);
      if (responses.length > 0 && responses[0].docs.length > 0) {
        console.log(responses);
        responses.forEach((item) => {
          payload.push(item.docs[0].data());
        });
        dispatch({ type: RESPONSE, payload });
        return true;
      } else {
        dispatch({ type: RESPONSE, payload: [] });
        return false;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const findWithText = async (text) => {
    if (text === "") {
      return find();
    }
    try {
      text = text[0].toUpperCase() + text.slice(1);
      await db
        .collection("All")
        .where("text", ">=", text)
        .where("text", "<=", text + "\uf8ff")
        .get()
        .then((response) => {
          let row = [];
          if (!response.docs.length) {
            return dispatch({ type: RESPONSE, payload: [] });
          } else {
            response.forEach((item) => {
              if (category && category !== "all") {
                if (item.data().category === category) {
                  row = row.concat(item.data());
                  console.log(row);
                  return dispatch({ type: RESPONSE, payload: row });
                }
              } else {
                row = row.concat(item.data());
                console.log(row);
                return dispatch({ type: RESPONSE, payload: row });
              }
            });
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

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

  const setCategory = (value) => {
    return dispatch({ type: CATEGORY, payload: value });
  };

  const find = async () => {
    try {
      let response = undefined;
      getFilters().then(async (filters) => {
        console.log("start loading data...");
        if (category !== "all" && category) {
          response = await db
            .collection("All")
            .where("category", "==", category)
            .get();
          const payload = response.docs.map((doc) => doc.data());
          return dispatch({ type: RESPONSE, payload });
        }
        if (!category || category === "all") {
          let row = [];
          db.collection("All")
            .get()
            .then((resp) => {
              let promise = new Promise((resolve) => {
                if (resp.docs.length) {
                  resp.forEach((doc) => {
                    return row.push(doc.data());
                  });
                  resolve(row);
                } else {
                  resolve([]);
                }
              });
              promise.then((payload) => {
                return dispatch({ type: RESPONSE, payload });
              });
            });
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const { filters, data, category } = state;

  return (
    <catalogContext.Provider
      value={{
        filters,
        find,
        findWithText,
        findWithId,
        data,
        category,
        setCategory,
      }}
    >
      {children}
    </catalogContext.Provider>
  );
};
