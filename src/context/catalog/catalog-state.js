import React, { useReducer } from "react";
import { FILTERS, RESPONSE } from "./types";
import axios from "axios";
import { catalogReducer } from "./catalog-reducer";
import { catalogContext } from "./catalog-context";

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
  const find = async (category = 0) => {
    try {
      const data = [...filters];
      let toFind = ``;
      data.map((item) => {
        if (item.value) {
          toFind += `${item.filter}=${item.value}&${toFind}`;
        }
        return toFind;
      });
      const response = await axios.get(
        `https://e-shop-d051e-default-rtdb.europe-west1.firebasedatabase.app/.json`
      );
      let payload = null;
      if (category !== "all" && category) {
        payload = response.data.items[category];
      }
      if (!category || category === "all") {
        payload = response.data.items;
        payload = Object.keys(payload).reduce(function (res, v) {
          return res.concat(Object.values(payload[v]));
        }, []);
      }
      dispatch({
        type: FILTERS,
        payload: Object.values(response.data.categories),
      });
      return dispatch({ type: RESPONSE, payload });
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
