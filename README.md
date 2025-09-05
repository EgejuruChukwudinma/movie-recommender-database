# Movie Recommender Database

A modern React application for discovering and managing your favorite movies. Built as a Frontend Capstone project demonstrating proficiency in React development, API integration, and modern web technologies.

## Features

- 🎬 **Search Movies**: Find movies using the OMDB API with real-time search
- 🎯 **Advanced Filtering**: Filter results by year and type (movie/series/episode)
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ❤️ **Favorites Management**: Save and manage your favorite movies with persistent storage
- 🎬 **Detailed Information**: View comprehensive movie details including plot, cast, ratings, and more
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and optimized builds

## Technology Stack

- **Frontend**: React 19 with Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **API**: OMDB API for movie data
- **State Management**: React Context API
- **Storage**: localStorage for favorites persistence

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OMDB API key (free at [omdbapi.com](https://www.omdbapi.com/apikey.aspx))

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd movie-recommender-database
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create environment file
   ```bash
   cp .env.example .env
   ```
   
4. Add your OMDB API key to `.env`
   ```
   VITE_OMDB_API_KEY=your_api_key_here
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Navbar.jsx      # Navigation component
│   └── SearchBar.jsx   # Search input component
├── context/            # React Context providers
│   └── FavoritesContext.jsx
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Movies.jsx      # Movie search and listing
│   ├── MovieDetails.jsx # Individual movie details
│   ├── Favorites.jsx   # User's favorite movies
│   └── About.jsx       # Project information
└── main.jsx           # Application entry point
```

## Contributing

This is a capstone project. For questions or feedback, please contact the developer.