import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    async function fetchSweets() {
      try {
        const res = await axios.get("http://localhost:5000/api/sweets");
        // Attaching a random dessert photo to each sweet
        const withPhotos = res.data.map(s => ({
          ...s,
          // Unsplash random dessert photo, size 600x400
          photo: "https://source.unsplash.com/600x400/?sweet,dessert"
,
        }));
        setSweets(withPhotos);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSweets();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {sweets.map(sweet => (
        <div key={sweet._id} className="bg-white rounded shadow p-4">
          <img
            src={sweet.photo}
            alt={sweet.name}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-xl font-bold mt-2">{sweet.name}</h2>
          <p className="text-gray-700">Category: {sweet.category}</p>
          <p className="text-green-700 font-semibold">₹{sweet.price}</p>
          <p className="text-sm text-gray-500">In stock: {sweet.quantity}</p>
        </div>
      ))}
    </div>
  );
}
