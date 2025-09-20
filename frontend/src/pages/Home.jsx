import { useEffect, useState } from "react";
import axios from "axios";
import SweetCard from '../components/SweetCard'

export default function Home() {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    async function fetchSweets() {
      try {
        const res = await axios.get("http://localhost:4000/api/sweets");
        // Attaching a random dessert photo to each sweet
        const withPhotos = res.data.map(s => ({
          ...s,
          // Unsplash random dessert photo, size 600x400
            imageUrl: `https://source.unsplash.com/600x400/?dessert&sig=${Math.floor(
            Math.random() * 1000
          )}`
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
       
       { sweets.map(s => <SweetCard key={s._id} sweet={s} />) }
     
    </div>
  );
}
