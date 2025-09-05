import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/movies?q=batman");
  };

  return (
    <div className="min-h-[60vh] rounded-2xl p-10 text-center bg-gradient-to-b from-black/70 to-gray-900 relative overflow-hidden"
         style={{
           backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1600&auto=format&fit=crop")',
           backgroundSize: 'cover', 
           backgroundPosition: 'center', 
           backgroundBlendMode: 'multiply'
         }}>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Find Your Next
          <span className="block text-blue-400">Movie</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Discover amazing films, explore detailed information, and build your personal watchlist
        </p>
        
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
        >
          Get Started
        </button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
}
