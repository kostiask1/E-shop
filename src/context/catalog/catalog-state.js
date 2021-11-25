import React, { useReducer, useEffect } from "react"
import {
    FILTERS,
    RESPONSE,
    CATEGORY,
    SEARCHTEXT,
    DATA,
    CART,
    STORAGE,
} from "./types"
import { catalogReducer } from "./catalog-reducer"
import { catalogContext } from "./catalog-context"

import { app } from "../../base"
import {
    local_cart_storage,
    local_category,
    local_searchText,
} from "../../localStorage"
const db = app.firestore()

export const CatalogState = ({ children }) => {
    const initialState = {
        storage: JSON.parse(localStorage.getItem(local_cart_storage)) || [],
        filters: [],
        rowData: [],
        data: [],
        cart: [],
        category: JSON.parse(localStorage.getItem(local_category)) || "Всё",
        searchText: JSON.parse(localStorage.getItem(local_searchText)) || "",
    }
    const [state, dispatch] = useReducer(catalogReducer, initialState)
    const { filters, data, cart, storage, rowData, category, searchText } =
        state

    useEffect(() => {
        checkStorage()
        getStorage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storage, rowData])

    useEffect(() => {
        filterData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowData, category, searchText])

    const getFilters = async () => {
        try {
            let filters = await db.collection("categories").get()
            filters
                ? (filters = filters.docs.map((doc) => doc.data()))
                : (filters = [])
            if (filters.length) {
                filters = Object.values(filters[0].categories)
            }
            dispatch({ type: FILTERS, payload: filters })
            return filters
        } catch (err) {
            console.error(err)
        }
    }
    const getData = () => {
        getFilters()
        db.collection("All")
            .orderBy("timestamp", "desc")
            .get()
            .then((response) => {
                let row = []
                let promise = new Promise((resolve) => {
                    if (!response.docs.length) {
                        return resolve(row)
                    } else {
                        response.docs.map((item) => {
                            return (row = row.concat(item.data()))
                        })
                    }
                    resolve(row)
                })
                promise.then((response) => {
                    dispatch({ type: DATA, payload: response })
                    dispatch({ type: RESPONSE, payload: response })
                })
            })
    }

    const getById = async (id) => {
        if (!id) return dispatch({ type: DATA, payload: [] })
        let payload = []
        try {
            const promises = id.map((id) =>
                db.collection("All").where("id", "==", id).get()
            )
            const responses = await Promise.all(promises)
            if (responses.length > 0) {
                responses.forEach((item) => {
                    payload.push(item.docs.length && item.docs[0].data())
                })
                checkStorage(payload)
                payload = payload.filter((item) => item)
                dispatch({ type: DATA, payload })
                return true
            } else {
                dispatch({ type: DATA, payload: [] })
                return false
            }
        } catch (err) {
            console.error(err)
        }
    }

    const checkStorage = (gotElements) => {
        if (storage.length) {
            if (rowData.length) {
                let clone = [...rowData]
                let storageClone = [...storage]
                let data = clone.map((item) => item.id)
                let itemsToDelete = storageClone.filter(
                    (item) => !data.includes(item)
                )
                if (itemsToDelete.length)
                    return deleteFromStorage(itemsToDelete)
            } else if (
                gotElements &&
                gotElements.length &&
                !(gotElements.length === 1 && !gotElements[0])
            ) {
                let storageClone = [...storage]
                if (gotElements.length === storageClone.length) {
                    let deletedItems = gotElements.length
                        ? storageClone.filter(
                              (item, index) => !gotElements[index]
                          )
                        : storageClone
                    deleteFromStorage(deletedItems)
                }
            }
        }
    }

    const filterData = () => {
        let dataNew = [...rowData]
        if (searchText !== "" && dataNew.length > 0) {
            dataNew = dataNew.filter((item) => {
                return item.text.toLowerCase().includes(searchText)
            })
        }
        if (category !== "Всё" && dataNew.length > 0) {
            dataNew = dataNew.filter((item) => {
                return item.category === category
            })
        }
        return dispatch({ type: DATA, payload: dataNew })
    }

    const setCategory = (value) => {
        localStorage.setItem(local_category, JSON.stringify(value))
        return dispatch({ type: CATEGORY, payload: value })
    }
    const setSearchText = (value) => {
        localStorage.setItem(local_searchText, JSON.stringify(value))
        return dispatch({ type: SEARCHTEXT, payload: value.toLowerCase() })
    }
    const clearStorage = () => {
        dispatch({ type: STORAGE, payload: [] })
        return new Promise((resolve) => {
            localStorage.removeItem(local_cart_storage)
            resolve(true)
        })
    }
    const findInStorage = (el) => {
        if (storage.length > 0 && storage.includes(el)) return true
        return false
    }
    const addToStorage = (el) => {
        if (storage.includes(el)) return
        let storageClone = [...storage]
        storageClone.push(el)
        dispatch({ type: STORAGE, payload: storageClone })
    }
    const deleteFromStorage = (elements) => {
        let storageClone = [...storage]
        return new Promise((resolve) => {
            elements.forEach((el) => {
                if (findInStorage(el)) {
                    storageClone.splice(storageClone.indexOf(el), 1)
                    resolve(true)
                }
            })
            dispatch({ type: STORAGE, payload: storageClone })
            return
        })
    }
    const getStorage = async () => {
        let payload = JSON.parse(localStorage.getItem(local_cart_storage)) || []
        try {
            const promises = payload.map((id) =>
                db.collection("All").where("id", "==", id).get()
            )
            const responses = await Promise.all(promises)
            if (responses.length > 0) {
                responses.forEach((item) => {
                    payload.push(item.docs.length && item.docs[0].data())
                })
                checkStorage(payload)
                payload = payload.filter((item) => typeof item === "object")
                dispatch({ type: CART, payload })
                return true
            } else {
                dispatch({ type: CART, payload: [] })
                return false
            }
        } catch (err) {
            console.error(err)
        }
    }

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
                setSearchText,
                data,
                cart,
                filters,
                searchText,
                category,
                storage,
            }}
        >
            {children}
        </catalogContext.Provider>
    )
}
