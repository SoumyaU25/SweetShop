
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


export default function Navbar() {
  const navigate = useNavigate();

  // read user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;




  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };


  

  return (
    <nav className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        SweetShop
      </Link>

      <div className="flex items-center space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}

        {user && (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className="hover:underline">Dashboard</Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:opacity-80"
            >
              <FaUserCircle size={22} />
              <span className="hidden sm:inline">{user.username}</span>
            </button>
            
          </>
        )}
      </div>
    </nav>
  );
}
