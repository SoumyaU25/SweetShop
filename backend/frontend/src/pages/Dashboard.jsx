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
      const res = await axios.get("/api/sweets", {
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
        data.append("upload_preset", "upload"); // cloudinary preset

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
      await axios.post("/api/sweets/create", newSweet, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Reset form
      setFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
      });
      setFile(null);
      fetchSweets();
    } catch (err) {
      console.error("Add sweet error:", err.response?.data || err.message);
    }
  };

  //Delete Function

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/sweets/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // admin JWT
        },
      });
      // Remove deleted sweet from state
      setSweets(sweets.filter((s) => s._id !== id));
      alert("Sweet deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete sweet");
    }
  };

  //Update Function
  const handleUpdate = async (sweet) => {
    const name = prompt("Sweet Name:", sweet.name);
    const category = prompt("Category:", sweet.category);
    const price = prompt("Price:", sweet.price);
    const quantity = prompt("Quantity:", sweet.quantity);

    if (!name || !category || !price || !quantity) return;

    try {
      const res = await axios.put(
        `http://localhost:4000/api/sweets/${sweet._id}`,
        {
          name,
          category,
          price: Number(price), // important!
          quantity: Number(quantity), // important!
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // Update sweet in local state
      setSweets(sweets.map((s) => (s._id === sweet._id ? res.data : s)));
      alert("Sweet updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update sweet");
    }
  };

  //Restock Function

  const handleRestock = async (id) => {
    const amount = prompt("Enter restock amount:", 1);
    if (!amount) return;

    try {
      const res = await axios.post(
        `http://localhost:4000/api/sweets/${id}/restock`,
        { amount: Number(amount) },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert(res.data.message);
      setSweets(sweets.map((s) => (s._id === id ? res.data.sweet : s)));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Restock failed");
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded col-span-full"
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

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              {/* Update Button */}
              <button
                onClick={() => handleUpdate(sweet)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Update
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(sweet._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>

              {/* Restock Button */}
              <button
                onClick={() => handleRestock(sweet._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Restock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
