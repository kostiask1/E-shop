import { local_cart_storage } from "../../localStorage";
import {
    FILTERS,
    RESPONSE,
    CART,
    CATEGORY,
    SEARCHTEXT,
    DATA,
    STORAGE,
} from "./types";

const handlers = {
    [FILTERS]: (state, { payload }) => ({
        ...state,
        filters: ["all", ...payload],
    }),
    [RESPONSE]: (state, { payload }) => ({
        ...state,
        rowData: payload,
    }),
    [DATA]: (state, { payload }) => ({
        ...state,
        data: payload,
    }),
    [CART]: (state, { payload }) => ({
        ...state,
        cart: payload,
    }),
    [CATEGORY]: (state, { payload }) => ({
        ...state,
        category: payload,
    }),
    [SEARCHTEXT]: (state, { payload }) => ({
        ...state,
        searchText: payload,
    }),
    [STORAGE]: (state, { payload }) => {
        localStorage.setItem(local_cart_storage, JSON.stringify(payload));
        return {
            ...state,
            storage: payload,
        };
    },
    DEFAULT: (state) => state,
};

export const catalogReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
};
