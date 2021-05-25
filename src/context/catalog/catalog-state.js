import React, { useReducer } from "react";
import { FILTERS, RESPONSE } from "./types";
import axios from "axios";
import { catalogReducer } from "./catalog-reducer";
import { catalogContext } from "./catalog-context";

import { app } from "../../base";
const db = app.firestore();

const LOCAL_STORAGE_KEY = "bloom-shop";

export const CatalogState = ({ children }) => {
  const initialState = {
    filters: [],
    data: [],
  };
  const [state, dispatch] = useReducer(catalogReducer, initialState);

  const findWithId = async (id) => {
    try {
      let cancel;
      await axios
        .get(
          `https://e-shop-d051e-default-rtdb.europe-west1.firebasedatabase.app/.json`,
          {
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          }
        )
        .then((res) => {
          let payload = res.data.items;
          payload = Object.keys(payload).reduce(function (res, v) {
            return res.concat(Object.values(payload[v]));
          }, []);
          payload = payload.filter(
            (item, index) => "" + payload[index].id === "" + id
          );
          if (!payload[0]) {
            return dispatch({ type: RESPONSE, payload: [] });
          }
          payload = payload[0];
          return dispatch({ type: RESPONSE, payload });
        });
      return () => cancel();
    } catch (err) {
      console.error(err);
    }
  };

  const findWithText = async (text) => {
    if (text === "") {
      return find("all");
    }
    try {
      let cancel;
      await axios
        .get(
          `https://e-shop-d051e-default-rtdb.europe-west1.firebasedatabase.app/.json`,
          {
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          }
        )
        .then((res) => {
          let payload = res.data.items;
          payload = Object.keys(payload).reduce(function (res, v) {
            return res.concat(Object.values(payload[v]));
          }, []);
          payload = payload.filter((item, index) => {
            if (payload[index].text) {
              let s = payload[index].text;
              s = s.toLowerCase();
              text = text.toLowerCase();
              return s.includes(text);
            } else {
              return false;
            }
          });

          if (!payload[0]) {
            return dispatch({ type: RESPONSE, payload: [] });
          }
          payload = [...payload];
          return dispatch({ type: RESPONSE, payload });
        });
      return () => cancel();
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
          //response = await db.collection(category).get();
          const payload = response.docs.map((doc) => doc.data());
          return dispatch({ type: RESPONSE, payload });
        }
        if (!category || category === "all") {
          let item = [];
          let row = [];
          console.log("i get there", filters);
          db.collection("All")
            .get()
            .then((resp) => {
              resp.forEach((doc) => {
                row = row.concat(doc.data());
                return dispatch({ type: RESPONSE, payload: row });
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
