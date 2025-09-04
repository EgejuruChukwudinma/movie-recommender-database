import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Layout will include Navbar
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import About from "./pages/About";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movies/:id" element={<MovieDetails />} />
            <Route path="about" element={<About />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

