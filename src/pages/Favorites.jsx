import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        ❤️ Your Favorites
      </h2>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            {/* Empty state illustration */}
            <div className="mb-8">
              <svg
                className="w-32 h-32 mx-auto text-gray-400 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Your watchlist is empty
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start building your collection by exploring amazing movies and adding them to your favorites.
            </p>
            
            <Link
              to="/movies?q=batman"
              className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Discover Movies
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((movie) => (
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

              {/* ❌ Remove favorite button */}
              <button
                onClick={() => removeFavorite(movie.imdbID)}
                className="absolute top-2 right-2 text-2xl text-red-500 transition-transform transform hover:scale-110 bg-white/80 dark:bg-gray-800/80 rounded-full p-1"
                title="Remove from favorites"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

