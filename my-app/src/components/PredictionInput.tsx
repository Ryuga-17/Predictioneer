"use client"

import { useState } from "react"

interface PredictionInputProps {
  onPredict: (deaths: number, cfr: number) => void
}

export default function PredictionInput({ onPredict }: PredictionInputProps) {
  const [deaths, setDeaths] = useState("")
  const [cfr, setCfr] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onPredict(Number.parseInt(deaths), Number.parseFloat(cfr))
  }

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4">ML Model Predictions</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="deaths" className="block text-sm font-medium text-gray-700 mb-1">
            Predicted Deaths
          </label>
          <input
            id="deaths"
            type="number"
            value={deaths}
            onChange={(e) => setDeaths(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="cfr" className="block text-sm font-medium text-gray-700 mb-1">
            Predicted Case Fatality Ratio (%)
          </label>
          <input
            id="cfr"
            type="number"
            step="0.01"
            value={cfr}
            onChange={(e) => setCfr(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Apply Predictions
        </button>
      </form>
    </div>
  )
}

