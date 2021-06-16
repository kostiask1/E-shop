import {
  FILTERS,
  RESPONSE,
  CART,
  LOGIN,
  CATEGORY,
  PRICERANGE,
  SEARCHTEXT,
  ORDER,
  DATA,
} from "./types";

const handlers = {
  [FILTERS]: (state, { payload }) => ({
    ...state,
    filters: payload,
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
  [LOGIN]: (state, { payload }) => ({
    ...state,
    admin: payload,
  }),
  [CATEGORY]: (state, { payload }) => ({
    ...state,
    category: payload,
  }),
  [PRICERANGE]: (state, { payload }) => ({
    ...state,
    minPrice: payload.min,
    maxPrice: payload.max,
  }),
  [SEARCHTEXT]: (state, { payload }) => ({
    ...state,
    searchText: payload,
  }),
  [ORDER]: (state, { payload }) => ({
    ...state,
    order: payload,
  }),
  DEFAULT: (state) => state,
};

export const catalogReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
