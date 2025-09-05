export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">About Movie Recommender</h2>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
        <p className="text-gray-700 mb-4">
          A Frontend Capstone built with React + Vite, Tailwind CSS, and React Router.
          It integrates the OMDb API to search movies, view details, and manage a personal
          favorites list (stored in localStorage via a React Context).
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Features</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Search via OMDb with filters for year and type (movie/series/episode)</li>
          <li>Responsive results grid and detailed movie pages</li>
          <li>Favorites with React Context + localStorage persistence</li>
          <li>Loading and error states with graceful fallbacks</li>
        </ul>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Technology Stack</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>React (Vite), React Router</li>
          <li>Tailwind CSS</li>
          <li>OMDb API</li>
          <li>React Context (Favorites)</li>
        </ul>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Local Setup</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Create <code className="bg-gray-100 px-1 rounded">.env</code> with <code className="bg-gray-100 px-1 rounded">VITE_OMDB_API_KEY=your_key</code></li>
          <li>Install deps: <code className="bg-gray-100 px-1 rounded">npm install</code></li>
          <li>Run: <code className="bg-gray-100 px-1 rounded">npm run dev</code></li>
        </ol>
      </div>
    </div>
  );
}

