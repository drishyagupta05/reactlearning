// src/redux/reducers.js

import { SET_AQI } from "./actions";

const initialState = {
  aqiData: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AQI:
      return {
        ...state,
        aqiData: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
