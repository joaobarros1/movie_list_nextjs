"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
console.log("TMDB_API_KEY:", TMDB_API_KEY);
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const time_window = "week";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const dispatch = useDispatch();
  console.log("Fetching movies");

  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/movie/${time_window}?api_key=${TMDB_API_KEY}`
    );
    console.log("Fetched movies:", response.data);
    return dispatch(response.data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
});
