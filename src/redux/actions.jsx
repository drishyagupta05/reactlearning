// src/redux/actions.js

export const SET_AQI = "SET_AQI";

export const setAQI = (data) => ({
  type: SET_AQI,
  payload: data,
});
