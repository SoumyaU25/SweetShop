

import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import SweetDetail from './pages/SweetDetail'
import Navbar from "./pages/Navbar";




export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-white shadow">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">SweetShop</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-sm text-gray-700 hover:underline">Home</Link>
            <Link to="/login" className="text-sm text-gray-700 hover:underline">Login</Link>
            <Link to="/register" className="text-sm text-gray-700 hover:underline">Register</Link>
            <Link to="/dashboard" className="text-sm text-gray-700 hover:underline">Admin</Link>
          </nav>
        </div>
      </header> */}
      <Navbar />

      <main className="mx-auto max-w-6xl p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/sweets/:id" element={<SweetDetail />} />
        </Routes>
      </main>
    </div>
  )
}
