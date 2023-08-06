import { configureStore, createStore } from "@reduxjs/toolkit";

const initialState = {
  points: [], // This array will store the points that the user plots on the map
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_POINT':
      return {
        ...state,
        points: [...state.points, action.payload],
      };
    case 'RESET_POINTS': // Add a new case for resetting points
      return {
        ...state,
        points: [],
      };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: rootReducer,
});

export const resetPoints = () => ({ type: 'RESET_POINTS' }); // Define the resetPoints action creator

export default store;