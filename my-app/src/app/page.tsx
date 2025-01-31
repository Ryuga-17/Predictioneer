"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import LocationForm from '../components/LocationForm'

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-100 animate-pulse" />,
})

interface LocationData {
  lat: number
  lng: number
  deaths: number
  cfr: number
  city?: string
  state?: string
  country?: string
}

export default function Home() {
  const [locationData, setLocationData] = useState<LocationData>({ lat: 51.505, lng: -0.09, deaths: 0, cfr: 0 })
  const [loading, setLoading] = useState(false)

  const fetchLocationInfo = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      const data = await response.json()
      return {
        city: data.address.city || data.address.town || data.address.village,
        state: data.address.state,
        country: data.address.country,
      }
    } catch (error) {
      console.error("Error fetching location info:", error)
      return {}
    }
  }

  const fetchPredictions = async (lat: number, lng: number) => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat, lng }),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error fetching predictions:", error)
      return { cfr: 0, deaths: 0 }
    }
  }

  const handleFormSubmit = async (lat: number, lng: number) => {
    setLoading(true)
    const [locationInfo, predictions] = await Promise.all([fetchLocationInfo(lat, lng), fetchPredictions(lat, lng)])
    setLocationData({
      lat,
      lng,
      deaths: predictions.deaths,
      cfr: predictions.cfr,
      ...locationInfo,
    })
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Live Location Map</h1>
      <LocationForm onSubmit={handleFormSubmit} />
      {loading ? (
        <div className="w-full h-[500px] mt-8 flex items-center justify-center">
          <p className="text-xl">Loading location data and predictions...</p>
        </div>
      ) : (
        <>
          <div className="w-full max-w-2xl mt-8 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Location Details</h2>
            <p className="text-lg">
              {locationData.city ? (
                <>
                  {locationData.city}, {locationData.state}, {locationData.country}
                </>
              ) : (
                "Location information not available"
              )}
            </p>
            <p className="text-lg mt-2">
              Coordinates: {locationData.lat.toFixed(4)}, {locationData.lng.toFixed(4)}
            </p>
            <p className="text-lg mt-2">Predicted Deaths: {locationData.deaths}</p>
            <p className="text-lg mt-2">Predicted CFR: {locationData.cfr.toFixed(2)}%</p>
          </div>
          <div className="w-full h-[500px] mt-8 border rounded-lg overflow-hidden">
            <Map center={locationData} zoom={13} markerPosition={locationData} />
          </div>
        </>
      )}
    </main>
  )
}

