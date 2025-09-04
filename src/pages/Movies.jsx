import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Movies() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // get ?q=term
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}`
        );
        const data = await res.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setError(data.Error || "No results found");
        }
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Results for: {query}</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.imdbID}`}
            key={movie.imdbID}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition block"
          >
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
              <h3 className="font-bold text-lg">{movie.Title}</h3>
              <p className="text-gray-600">{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

