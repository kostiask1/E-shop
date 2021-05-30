import React, { useReducer } from "react";
import { FILTERS, RESPONSE } from "./types";
import { catalogReducer } from "./catalog-reducer";
import { catalogContext } from "./catalog-context";

import { app } from "../../base";
const db = app.firestore();

export const CatalogState = ({ children }) => {
  const initialState = {
    filters: [],
    data: [],
  };
  const [state, dispatch] = useReducer(catalogReducer, initialState);

  const findWithId = async (id) => {
    let payload = [];
    try {
      const promises = id.map((id) =>
        db.collection("All").where("id", "==", id).get()
      );
      const responses = await Promise.all(promises);
      responses.forEach((item) => {
        payload.push(item.docs[0].data());
      });
      dispatch({ type: RESPONSE, payload });
    } catch (err) {
      console.error(err);
    }
  };

  const findWithText = async (text) => {
    if (text === "") {
      return find("all");
    }
    try {
      text = text[0].toUpperCase() + text.slice(1);
      await db
        .collection("All")
        .where("text", ">=", text)
        .where("text", "<=", text + "\uf8ff")
        .get()
        .then((response) => {
          console.log(response);
          let row = [];
          if (!response.docs.length) {
            return dispatch({ type: RESPONSE, payload: [] });
          } else {
            response.forEach((item) => {
              row = row.concat(item.data());
              return dispatch({ type: RESPONSE, payload: row });
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

  const find = async (category = null) => {
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
          console.log("i get categories: (" + filters.join(", ") + ") for you");
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

  const { filters, data } = state;

  return (
    <catalogContext.Provider
      value={{ filters, find, findWithText, findWithId, data }}
    >
      {children}
    </catalogContext.Provider>
  );
};
