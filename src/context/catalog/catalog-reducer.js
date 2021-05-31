import { FILTERS, RESPONSE, CART, LOGIN } from "./types";

const handlers = {
  [FILTERS]: (state, { payload }) => ({
    ...state,
    filters: payload,
  }),
  [RESPONSE]: (state, { payload }) => ({
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
  DEFAULT: (state) => state,
};

export const catalogReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
