"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./GlobalRedux/store";
import { useEffect, useState } from "react";
import { fetchMovies } from "./GlobalRedux/Features/movies.thunks";
// import filterMovies from "./GlobalRedux/Features/moviesSlice";
import Pagination from "./components/Pagination";

export default function Home() {
  const [sortField, setSortField] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [totalPages, setTotalPages] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();

  const { movies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, [dispatch, currentPage]);

  const sortedMovies = Array.isArray(movies.results)
    ? [...movies.results].sort((a, b) => {
        if (sortField === "title") {
          return a.title.localeCompare(b.title);
        } else if (sortField === "avarage") {
          return a.vote_average - b.vote_average;
        } else if (sortField === "release") {
          return (
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
          );
        }
        return 0;
      })
    : [];

  if (sortOrder === "desc") {
    sortedMovies.reverse();
  }

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  // };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-300 text-center mt-5">
        Movies
      </h1>
      {/* <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e)}
        className="block mt-5 mx-auto w-80 p-2 rounded-md border border-gray-300 text-gray-500"
      /> */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-center">Loading...</p>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 sm:rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    id="title"
                    onClick={() => handleSort("title")}
                  >
                    Title
                    {sortField === "title" && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    id="avarage"
                    onClick={() => handleSort("avarage")}
                  >
                    Vote avarage
                    {sortField === "avarage" && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    id="release"
                    onClick={() => handleSort("release")}
                  >
                    Release date
                    {sortField === "release" && (
                      <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedMovies.map((movie) => (
                  <tr key={movie.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                      {movie.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                      {movie.vote_average.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                      {movie.release_date}
                    </td>
                    {/* <td>
                      <button onClick={() => handleRemoveClick(movie.id)}>
                        Remove
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            // totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
