"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchMovies } from "./movies.thunks";

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface MoviesState {
  movies: MoviesResponse;
  loading: boolean;
  error?: string;
  filteredMovies: Movie[];
  searchTerm: "";
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesReducerAction {
  type: string;
  payload: string;
}

const initialState: MoviesState = {
  movies: <MoviesResponse>{},
  loading: false,
  error: undefined,
  filteredMovies: [],
  searchTerm: "",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    moviesReducer: (state, action) => {
      state.movies = action.payload;
    },
    filterMovies: (state, action: PayloadAction<string>) => {
      state.filteredMovies = state.movies.results?.filter((movie) => {
        return movie.title.toLowerCase().includes(action.payload.toLowerCase());
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;

export const { moviesReducer, filterMovies } = moviesSlice.actions;
