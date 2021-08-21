import React, { useReducer, useEffect } from "react";
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
import {
    local_cart_storage,
    local_category,
    local_maxPrice,
    local_minPrice,
    local_order,
    local_searchText,
} from "../../localStorage";
const db = app.firestore();

export const CatalogState = ({ children }) => {
    const initialState = {
        storage: JSON.parse(localStorage.getItem(local_cart_storage)) || [],
        filters: [],
        rowData: [],
        data: [],
        admin: false,
        category: JSON.parse(localStorage.getItem(local_category)) || "all",
        minPrice: localStorage.getItem(local_minPrice) || 0,
        maxPrice: localStorage.getItem(local_maxPrice) || 0,
        searchText: JSON.parse(localStorage.getItem(local_searchText)) || "",
        order: JSON.parse(localStorage.getItem(local_order)) || "newest",
    };
    const [state, dispatch] = useReducer(catalogReducer, initialState);
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

    useEffect(() => {
        filterData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowData, category, minPrice, maxPrice, searchText, order]);

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
            console.log("Loading finished");
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
                            return (row = row.concat(item.data()));
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
        if (dataNew.length >= 0 && maxPrice > 0) {
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
        localStorage.setItem(local_category, JSON.stringify(value));
        return dispatch({ type: CATEGORY, payload: value });
    };
    const setPriceRange = async (min, max) => {
        localStorage.setItem(local_minPrice, JSON.stringify(min));
        localStorage.setItem(local_maxPrice, JSON.stringify(max));
        return dispatch({ type: PRICERANGE, payload: { min, max } });
    };
    const setSearchText = (value) => {
        localStorage.setItem(local_searchText, JSON.stringify(value));
        return dispatch({ type: SEARCHTEXT, payload: value.toLowerCase() });
    };
    const setOrder = (value) => {
        localStorage.setItem(local_order, JSON.stringify(value));
        return dispatch({ type: ORDER, payload: value });
    };

    const clearStorage = () => {
        dispatch({ type: STORAGE, payload: [] });
        return new Promise((resolve) => {
            localStorage.removeItem(local_cart_storage);
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
        return JSON.parse(localStorage.getItem(local_cart_storage)) || [];
    };

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
                setSearchText,
                setOrder,
                data,
                filters,
                minPrice,
                maxPrice,
                searchText,
                category,
                order,
            }}
        >
            {children}
        </catalogContext.Provider>
    );
};
