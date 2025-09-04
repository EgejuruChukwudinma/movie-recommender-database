import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">❤️ Your Favorites</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">
          You haven’t added any favorites yet. Go browse{" "}
          <Link to="/movies?q=batman" className="text-blue-600 hover:underline">
            movies
          </Link>{" "}
          and add some!
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((movie) => (
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

              {/* ❌ Remove favorite button */}
              <button
                onClick={() => removeFavorite(movie.imdbID)}
                className="absolute top-2 right-2 text-2xl text-red-500 transition-transform transform hover:scale-110"
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

