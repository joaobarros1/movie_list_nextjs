"use client";

import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./Features/moviesSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;