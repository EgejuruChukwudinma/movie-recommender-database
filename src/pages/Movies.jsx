import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

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
    <div>
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">
        {query ? `Results for: "${query}"` : "Search for a movie"}
      </h2>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="number"
          placeholder="Year (e.g. 2020)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border rounded px-3 py-2 w-40"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-3 py-2"
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
          className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-gray-500">Loading movies...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Movie Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => {
          const fav = isFavorite(movie.imdbID);
          return (
            <div
              key={movie.imdbID}
              className="relative bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
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
                  <h3 className="font-bold text-lg truncate">{movie.Title}</h3>
                  <p className="text-gray-600">{movie.Year}</p>
                </div>
              </Link>

              {/* ❤️ Favorite toggle */}
              <button
                onClick={() =>
                  fav ? removeFavorite(movie.imdbID) : addFavorite(movie)
                }
                className={`absolute top-2 right-2 text-2xl transition-transform transform hover:scale-110 ${
                  fav ? "text-red-500" : "text-gray-400"
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
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
