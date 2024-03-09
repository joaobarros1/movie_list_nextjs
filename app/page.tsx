"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./GlobalRedux/Features/movies.thunks";
import { RootState } from "./GlobalRedux/store";

import axios from "axios";

type Movie = {
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
};

export default function Home() {
  const dispatch = useDispatch();
  // const movies = useSelector((state: RootState) => state.movies.movies);
  const loading = useSelector((state: RootState) => state.movies.loading);
  const error = useSelector((state: RootState) => state.movies.error);

  const [movies, setMovies] = useState<Movie[]>([]);

  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const time_window = "week";

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/trending/movie/${time_window}?api_key=${TMDB_API_KEY}`
      );
      console.log("Fetched movies:", response.data);
      return setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  };

  useEffect(() => {
    // fetchMovies();
    // console.log("Movies:", movies);
    getMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {/* {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : ( */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  id="title"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  id="avarage"
                >
                  Vote avarage
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  id="release"
                >
                  Release date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movies &&
                movies.map((movie) => (
                  <tr key={movie.id}>
                    <td
                      className="px-6 py-4 whitespace-nowrap font-medium text-gray-500"
                      id="title"
                    >
                      {movie.title}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap font-medium text-gray-500"
                      id="avarage"
                    >
                      {movie.vote_average.toFixed(1)}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap font-medium text-gray-500"
                      id="release"
                    >
                      {movie.release_date}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
