import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
      {/* Navbar always visible */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

