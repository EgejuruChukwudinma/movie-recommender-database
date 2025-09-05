import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext"; // 👈 use context

export default function MovieDetails() {
  const { id } = useParams(); // imdbID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

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

  if (loading) return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">Loading movie details...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
  
  if (!movie) return null;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "cast", label: "Cast" },
    { id: "reviews", label: "Reviews" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{movie.Plot}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Genre</h4>
                <p className="text-gray-600 dark:text-gray-400">{movie.Genre}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Runtime</h4>
                <p className="text-gray-600 dark:text-gray-400">{movie.Runtime}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Language</h4>
                <p className="text-gray-600 dark:text-gray-400">{movie.Language}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">IMDB Rating</h4>
                <p className="text-gray-600 dark:text-gray-400">⭐ {movie.imdbRating}/10</p>
              </div>
            </div>
          </div>
        );
      case "cast":
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Director</h4>
              <p className="text-gray-600 dark:text-gray-400">{movie.Director}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Actors</h4>
              <p className="text-gray-600 dark:text-gray-400">{movie.Actors}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Writer</h4>
              <p className="text-gray-600 dark:text-gray-400">{movie.Writer}</p>
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Reviews are not available through the OMDB API. Check out the movie on IMDB or other review platforms for detailed reviews and ratings.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                💡 Tip: Visit <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">IMDB</a> for comprehensive reviews and ratings.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Poster */}
        <div className="md:w-1/3">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400x600"
            }
            alt={movie.Title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                {movie.Title} ({movie.Year})
              </h2>
              <p className="text-gray-600 dark:text-gray-400 italic">
                {movie.Genre} | {movie.Runtime}
              </p>
            </div>
            {/* ❤️ Toggle */}
            <button
              onClick={() => (fav ? removeFavorite(id) : addFavorite(movie))}
              className={`text-3xl transition-transform transform hover:scale-110 ${
                fav ? "text-red-500" : "text-gray-400 dark:text-gray-500 hover:text-red-400"
              }`}
              title={fav ? "Remove from Favorites" : "Add to Favorites"}
            >
              {fav ? "❤️" : "🤍"}
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ring-2 ring-blue-500 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            {renderTabContent()}
          </div>

          {/* Back Button */}
          <Link
            to="/movies"
            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
          >
            ← Back to Movies
          </Link>
        </div>
      </div>
    </div>
  );
}

