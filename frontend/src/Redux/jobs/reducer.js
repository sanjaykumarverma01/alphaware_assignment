import * as types from "./actionType";

const initState = {};

const reducer = (oldState = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return oldState;
  }
};

export { reducer };
