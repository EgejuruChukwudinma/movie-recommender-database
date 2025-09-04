import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    // redirect to /movies?q=searchTerm
    navigate(`/movies?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Find Your Next Favorite Movie 🎥</h2>
      <p className="mb-6 text-gray-600">Search movies and discover details instantly.</p>
      <div className="max-w-lg mx-auto">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
}

