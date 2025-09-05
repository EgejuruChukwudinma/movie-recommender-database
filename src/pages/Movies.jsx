import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import SkeletonCard from "../components/SkeletonCard";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q"); // get ?q=term

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // filters
  const [year, setYear] = useState("");
  const [type, setType] = useState("");

  // favorites context
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        let url = `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&s=${query}&page=${page}`;

        if (year) url += `&y=${year}`;
        if (type) url += `&type=${type}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === "True") {
          setMovies((prev) => (page === 1 ? data.Search : [...prev, ...data.Search]));
          setTotalResults(parseInt(data.totalResults, 10));
        } else {
          if (page === 1) setMovies([]);
          setError(data.Error || "No results found");
        }
      } catch {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, year, type, page]);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setPage(1);
  }, [query, year, type]);

  const hasMore = movies.length < totalResults;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        {query ? `Results for: "${query}"` : "Discover Movies"}
      </h2>

      {/* Centered Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for movies..."
          className="w-full max-w-2xl mx-auto block px-4 py-3 rounded-xl bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 border border-gray-300 focus:ring focus:ring-blue-500/30 focus:outline-none text-center"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const searchQuery = e.target.value;
              if (searchQuery.trim()) {
                setSearchParams({ q: searchQuery });
              }
            }
          }}
        />
      </div>

      {/* Pill Filters */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 border border-transparent focus:ring-2 focus:ring-blue-500/30 focus:outline-none text-center w-20"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 border border-transparent focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
        >
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>

        <button
          onClick={() => {
            setYear("");
            setType("");
          }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 border border-transparent transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Loading & Error */}
      {loading && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {/* Movie Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => {
          const fav = isFavorite(movie.imdbID);
          return (
            <div
              key={movie.imdbID}
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105 hover:ring-2 hover:ring-blue-500/40 overflow-hidden"
            >
              {/* Clickable link */}
              <Link to={`/movies/${movie.imdbID}`}>
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450"
                  }
                  alt={movie.Title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg truncate text-gray-900 dark:text-gray-100">{movie.Title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{movie.Year}</p>
                </div>
              </Link>

              {/* ❤️ Favorite toggle */}
              <button
                onClick={() =>
                  fav ? removeFavorite(movie.imdbID) : addFavorite(movie)
                }
                className={`absolute top-2 right-2 text-2xl transition-transform transform hover:scale-110 ${
                  fav ? "text-red-500" : "text-gray-400 dark:text-gray-500"
                }`}
                title={fav ? "Remove from favorites" : "Add to favorites"}
              >
                {fav ? "❤️" : "🤍"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
