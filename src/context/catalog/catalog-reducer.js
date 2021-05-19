import { FILTERS, RESPONSE } from "./types";

const handlers = {
  [FILTERS]: (state, { payload }) => ({
    ...state,
    filters: payload,
  }),
  [RESPONSE]: (state, { payload }) => ({
    ...state,
    data: payload,
  }),
  DEFAULT: (state) => state,
};

export const catalogReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
