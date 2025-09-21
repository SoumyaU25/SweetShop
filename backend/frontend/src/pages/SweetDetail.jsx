import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function SweetDetail() {
  const { id } = useParams()
  const [sweet, setSweet] = useState(null)
  const [purchasing, setPurchasing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function fetchSweet() {
      try {
        const res = await axios.get(`/api/sweets/${id}`)
        if (mounted) setSweet(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchSweet()
    return () => { mounted = false }
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!sweet) return <div>Sweet not found.</div>

   const handlePurchase = async () => {
    if (!window.confirm(`Are you sure you want to purchase "${sweet.name}"?`)) return

    setPurchasing(true)
    try {
      const res = await axios.post(
        `/api/sweets/${sweet._id}/purchase`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setSweet(res.data.sweet) // update quantity
      alert(res.data.message)
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Purchase failed')
    } finally {
      setPurchasing(false)
    }
  }

  const img = sweet.imageUrl

  return (
    <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <img src={img} alt={sweet.name} className="w-full h-80 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold">{sweet.name}</h1>
          <p className="text-sm text-gray-500">{sweet.category}</p>
          <p className="mt-4 text-gray-700">{sweet.description || 'No description available.'}</p>
          <div className="mt-6">
            <p className="text-xl font-semibold">₹{sweet.price}</p>
            <p className="mt-1 text-sm">In stock: {sweet.quantity}</p>
            <button
              className={`mt-4 px-4 py-2 rounded text-white ${
                sweet.quantity > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={handlePurchase}
              disabled={sweet.quantity <= 0 || purchasing}
            >
              {purchasing ? 'Processing...' : sweet.quantity > 0 ? 'Purchase' : 'Out of stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
