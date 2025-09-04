import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext"; // 👈 use context

export default function MovieDetails() {
  const { id } = useParams(); // imdbID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { addFavorite, removeFavorite, isFavorite } = useFavorites(); // 👈 favorites
  const fav = isFavorite(id);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }&i=${id}&plot=full`
        );
        const data = await res.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!movie) return null;

  return (
    <div className="max-w-5xl mx-auto bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row">
      {/* Poster */}
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/400x600"
        }
        alt={movie.Title}
        className="w-full md:w-1/3 object-cover"
      />

      {/* Details */}
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between">
          <h2 className="text-3xl font-bold mb-2">
            {movie.Title} ({movie.Year})
          </h2>
          {/* ❤️ Toggle */}
          <button
            onClick={() => (fav ? removeFavorite(id) : addFavorite(movie))}
            className={`text-2xl ml-4 ${
              fav ? "text-red-500" : "text-gray-400 hover:text-red-400"
            }`}
            title={fav ? "Remove from Favorites" : "Add to Favorites"}
          >
            {fav ? "❤️" : "🤍"}
          </button>
        </div>

        <p className="text-gray-600 italic mb-4">
          {movie.Genre} | {movie.Runtime}
        </p>
        <p className="mb-4">{movie.Plot}</p>
        <p>
          <strong>Director:</strong> {movie.Director}
        </p>
        <p>
          <strong>Actors:</strong> {movie.Actors}
        </p>
        <p>
          <strong>Language:</strong> {movie.Language}
        </p>
        <p>
          <strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}
        </p>

        <Link
          to="/movies"
          className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ← Back to Movies
        </Link>
      </div>
    </div>
  );
}

