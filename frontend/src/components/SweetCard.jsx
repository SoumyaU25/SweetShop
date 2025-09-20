import React from 'react'
import { Link } from 'react-router-dom'

export default function SweetCard({ sweet }) {
  // sweet: { _id, name, category, price, quantity, imageUrl}
  const img = sweet.imageUrl ||`https://source.unsplash.com/600x400/?sweet,dessert`
  return (
    <Link to={`/sweets/${sweet._id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
        <div className="h-48 w-full overflow-hidden">
          <img src={img} alt={sweet.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{sweet.name}</h3>
          <p className="text-sm text-gray-500">{sweet.category}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold">₹{sweet.price}</span>
            <span className={`text-sm ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
