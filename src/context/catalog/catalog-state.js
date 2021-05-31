import React, { useReducer } from "react";
import axios from "axios";
import { FILTERS, RESPONSE, LOGIN } from "./types";
import { catalogReducer } from "./catalog-reducer";
import { catalogContext } from "./catalog-context";

import { app } from "../../base";
const db = app.firestore();

export const CatalogState = ({ children }) => {
  const initialState = {
    filters: [],
    data: [],
    admin: false,
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

  const login = async (credits) => {
    let url = "";
    credits.type === "login"
      ? (url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACbkEzWwbaNw9RYxCQxaMygVljKavpdxg")
      : credits.type === "signup"
      ? (url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACbkEzWwbaNw9RYxCQxaMygVljKavpdxg")
      : (url = false);
    if (!url) return false;

    const request = axios.post(url, credits);
    request.then((response) => {
      let data = response.data;
      console.log(data);

      const expirationDate = new Date(new Date().getTime() + 36 * 1000);
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userId", data.localId);
      localStorage.setItem("expirationDate", expirationDate);
      auth();
      window.location.reload();
    });
  };

  const logout = (reload) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    dispatch({ type: LOGIN, payload: false });
    return reload ? window.location.reload() : false;
  };

  const auth = () => {
    if (
      new Date(localStorage.getItem("expirationDate")) >=
        new Date().getTime() &&
      localStorage.getItem("token")
    ) {
      let expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem("expirationDate", expirationDate);
      return dispatch({ type: LOGIN, payload: true });
    } else {
      return logout();
    }
  };

  const { filters, data, admin } = state;

  return (
    <catalogContext.Provider
      value={{
        filters,
        find,
        findWithText,
        findWithId,
        data,
        login,
        auth,
        logout,
        admin,
      }}
    >
      {children}
    </catalogContext.Provider>
  );
};
