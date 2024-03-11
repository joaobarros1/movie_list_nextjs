"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const time_window = "day";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page: number) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/trending/movie/${time_window}?api_key=${TMDB_API_KEY}&page=${page}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return new Error();
    }
  }
);
