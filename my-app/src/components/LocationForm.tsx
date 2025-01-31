"use client"

import { useState } from "react"

interface LocationFormProps {
  onSubmit: (lat: number, lng: number) => void
}

export default function LocationForm({ onSubmit }: LocationFormProps) {
  const [lat, setLat] = useState("51.505")
  const [lng, setLng] = useState("-0.09")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(Number.parseFloat(lat), Number.parseFloat(lng))
  }

  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Enter Location</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              id="lat"
              type="number"
              step="any"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lng" className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              id="lng"
              type="number"
              step="any"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Get Predictions
        </button>
      </form>
    </div>
  )
}