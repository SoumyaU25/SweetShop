import { useEffect, useState } from "react";
import axios from "axios";
import SweetCard from "../components/SweetCard";

export default function Home() {
  const [sweets, setSweets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch sweets (all or filtered)
  const fetchSweets = async (params = {}) => {
    try {
      // Remove empty params
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
      );

      const query = new URLSearchParams(filteredParams).toString();

      const url = query
        ? `/api/sweets/search?${query}`
        : "/api/sweets";

      const res = await axios.get(url);
      setSweets(res.data);
    } catch (err) {
      console.error("Error fetching sweets:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchSweets(); // fetch all sweets initially
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSweets({
      name: searchQuery,
      category,
      minPrice,
      maxPrice
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-2 mb-6 items-center"
      >
        <input
          type="text"
          placeholder="Search sweets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 rounded border w-full sm:w-48"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 rounded border w-full sm:w-32"
        />
        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-3 py-2 rounded border w-full sm:w-20"
        />
        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-3 py-2 rounded border w-full sm:w-20"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center justify-center"
        >
          Search
        </button>
      </form>

      {/* Sweets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sweets.map((s) => (
          <SweetCard key={s._id} sweet={s} />
        ))}
      </div>
    </div>
  );
}
