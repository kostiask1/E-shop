import React, { useReducer, useEffect } from "react";
import {
    FILTERS,
    RESPONSE,
    CATEGORY,
    SEARCHTEXT,
    ORDER,
    DATA,
    STORAGE,
    MINPRICE,
    MAXPRICE,
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
        category: JSON.parse(localStorage.getItem(local_category)) || "all",
        minPrice: +JSON.parse(localStorage.getItem(local_minPrice)) || 0,
        maxPrice: +JSON.parse(localStorage.getItem(local_maxPrice)) || 0,
        searchText: JSON.parse(localStorage.getItem(local_searchText)) || "",
        order: JSON.parse(localStorage.getItem(local_order)) || "popular",
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
        checkStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storage, rowData]);

    useEffect(() => {
        filterData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowData, category, minPrice, maxPrice, searchText, order]);

    const getFilters = async () => {
        try {
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
            if (responses.length > 0) {
                responses.forEach((item) => {
                    payload.push(item.docs.length && item.docs[0].data());
                });
                checkStorage(payload);
                payload = payload.filter((item) => item);
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

    const checkStorage = (gotElements) => {
        if (storage.length) {
            if (rowData.length) {
                let clone = [...rowData];
                let storageClone = [...storage];
                let data = clone.map((item) => item.id);
                let itemsToDelete = storageClone.filter(
                    (item) => !data.includes(item)
                );
                if (itemsToDelete.length)
                    return deleteFromStorage(itemsToDelete);
            } else if (
                gotElements &&
                gotElements.length &&
                !(gotElements.length === 1 && !gotElements[0])
            ) {
                let storageClone = [...storage];
                if (gotElements.length === storageClone.length) {
                    let deletedItems = gotElements.length
                        ? storageClone.filter(
                              (item, index) => !gotElements[index]
                          )
                        : storageClone;
                    deleteFromStorage(deletedItems);
                }
            }
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
        if (dataNew.length >= 0) {
            let cloneMaxPrice = maxPrice === 0 ? 99999999999999999 : maxPrice;
            dataNew = dataNew.filter((item) => {
                if (cloneMaxPrice < minPrice) {
                    return item.price >= minPrice;
                } else {
                    return (
                        item.price >= minPrice && item.price <= cloneMaxPrice
                    );
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
        if (order === "popular") {
            function compare(a, b) {
                if (a.boughtCount < b.boughtCount) {
                    return 1;
                }
                if (a.boughtCount > b.boughtCount) {
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
    const setMinPrice = (min) => {
        localStorage.setItem(local_minPrice, JSON.stringify(+min));
        return dispatch({ type: MINPRICE, payload: +min });
    };
    const setMaxPrice = (max) => {
        localStorage.setItem(local_maxPrice, JSON.stringify(+max));
        return dispatch({ type: MAXPRICE, payload: +max });
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
        storageClone.push(el);
        dispatch({ type: STORAGE, payload: storageClone });
    };
    const deleteFromStorage = (elements) => {
        let storageClone = [...storage];
        return new Promise((resolve) => {
            elements.forEach((el) => {
                if (findInStorage(el)) {
                    storageClone.splice(storageClone.indexOf(el), 1);
                    resolve(true);
                }
            });
            dispatch({ type: STORAGE, payload: storageClone });
            return;
        });
    };
    const getStorage = () => {
        return JSON.parse(localStorage.getItem(local_cart_storage)) || [];
    };

    const resetFilters = () => {
        localStorage.removeItem(local_category);
        localStorage.removeItem(local_minPrice);
        localStorage.removeItem(local_maxPrice);
        localStorage.removeItem(local_searchText);
        return window.location.reload();
    };

    return (
        <catalogContext.Provider
            value={{
                getData,
                resetFilters,
                getById,
                clearStorage,
                findInStorage,
                addToStorage,
                deleteFromStorage,
                getStorage,
                setCategory,
                setSearchText,
                setOrder,
                setMinPrice,
                setMaxPrice,
                data,
                filters,
                minPrice,
                maxPrice,
                searchText,
                category,
                order,
                storage,
            }}
        >
            {children}
        </catalogContext.Provider>
    );
};
