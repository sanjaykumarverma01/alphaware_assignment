import * as types from "./actionTypes";

const initialState = {
  jobList: null,
  appliedJobs: null,
  jobDetails: null,
};

const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return oldState;
  }
};

export { reducer };
