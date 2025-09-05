import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // 👈 Router here
import App from "./App";
import { FavoritesProvider } from "./context/FavoritesContext";
import ErrorBoundary from "./components/ErrorBoundary";

// Enable dark mode by default
document.documentElement.classList.add('dark');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

