import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [sweets, setSweets] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: "",
  });
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchSweets();
    
  }, []);

  const fetchSweets = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // Upload to Cloudinary if a file is selected
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");// cloudinary preset

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dvgt9sgl7/image/upload",
          data
        );

        imageUrl = uploadRes.data.url; // get the hosted image URL
      }

      // Prepare payload for backend
      const newSweet = {
        ...formData,
        imageUrl: imageUrl, // backend expects `image`
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };

      console.log("Payload being sent:", newSweet);

      // Send to backend
      await axios.post("http://localhost:4000/api/sweets/create", newSweet, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Reset form
      setFormData({ name: "", category: "", price: "", quantity: "" , description: ""});
      setFile(null);
      fetchSweets();
    } catch (err) {
      console.error("Add sweet error:", err.response?.data || err.message);
    }
  };



  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
       

       {/* Admin Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white shadow p-6 rounded grid grid-cols-1 sm:grid-cols-2 gap-4"
        encType="multipart/form-data"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Sweet Name"
          className="border p-2 rounded"
          required
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Sweet Description"
          className="border p-2 rounded"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category (e.g. Dessert)"
          className="border p-2 rounded"
          required
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
          required
        />
        <input
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="border p-2 rounded"
          required
        />
        {/* File input for image */}
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="border p-2 rounded col-span-full"
        />

        <button
          type="submit"
          className="bg-pink-600 text-white py-2 px-4 rounded col-span-full hover:bg-pink-700"
        >
          Add Sweet
        </button>
      </form>

      {/* Sweets Grid for admin */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <div
            key={sweet._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={sweet.imageUrl}
              alt={sweet.name}
              className="w-40 h-40 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold">{sweet.name}</h2>
            <p className="text-gray-600">{sweet.category}</p>
            <p className="text-pink-600 font-bold mt-2">₹{sweet.price}</p>
            <p className="text-sm text-gray-500">Stock: {sweet.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );

}

