import React, { useReducer } from "react";
import {
    FILTERS,
    RESPONSE,
    CATEGORY,
    PRICERANGE,
    SEARCHTEXT,
    ORDER,
    DATA,
    STORAGE,
} from "./types";
import { catalogReducer } from "./catalog-reducer";
import { catalogContext } from "./catalog-context";

import { app } from "../../base";
const db = app.firestore();
const SHOP_NAME = process.env.REACT_APP_SHOP_NAME;

export const CatalogState = ({ children }) => {
    const initialState = {
        storage: JSON.parse(localStorage.getItem(SHOP_NAME)) || [],
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
            .orderBy("timestamp", "desc")
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
                if (maxPrice < minPrice) {
                    return item.price >= minPrice;
                } else {
                    return item.price >= minPrice && item.price <= maxPrice;
                }
            });
        }
        if (order === "newest") {
            dataNew.sort(function (x, y) {
                return y.timestamp - x.timestamp;
            });
        }
        if (order === "asc") {
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
        }
        if (order === "desc") {
            function compare(a, b) {
                if (a.price < b.price) {
                    return 1;
                }
                if (a.price > b.price) {
                    return -1;
                }
                return 0;
            }
            dataNew.sort(compare);
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

    const clearStorage = () => {
        dispatch({ type: STORAGE, payload: [] });
        return new Promise((resolve) => {
            localStorage.removeItem(SHOP_NAME);
            resolve(true);
        });
    };
    const findInStorage = (el) => {
        if (storage.length > 0 && storage.includes(el)) return true;
        return false;
    };
    const addToStorage = (el) => {
        if (storage.includes(el)) return;
        let storageClone = [...storage];
        storageClone = storageClone.concat(el);
        dispatch({ type: STORAGE, payload: storageClone });
    };
    const deleteFromStorage = (el) => {
        return new Promise((resolve) => {
            if (findInStorage(el)) {
                let storageClone = [...storage];
                storageClone.splice(storageClone.indexOf(el), 1);
                dispatch({ type: STORAGE, payload: storageClone });
                resolve(true);
            }
            return;
        });
    };
    const getStorage = () => {
        return JSON.parse(localStorage.getItem(SHOP_NAME)) || [];
    };

    const {
        filters,
        data,
        storage,
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
                clearStorage,
                findInStorage,
                addToStorage,
                deleteFromStorage,
                getStorage,
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
