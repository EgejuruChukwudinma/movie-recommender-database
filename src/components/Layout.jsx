import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar always visible */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

