import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold">
        🎬 MovieApp
      </Link>

      <div className="space-x-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300"
          }
        >
          Movies
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300"
          }
        >
          Favorites
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-300"
          }
        >
          About
        </NavLink>
      </div>
    </nav>
  );
}

