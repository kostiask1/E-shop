const LOGIN = "LOGIN";

const handlers = {
  [LOGIN]: (state, { payload }) => ({
    ...state,
    admin: payload,
  }),
  DEFAULT: (state) => state,
};

export const authReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
