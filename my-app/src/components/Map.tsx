"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

interface MapProps {
  center: { lat: number; lng: number; deaths: number; cfr: number }
  zoom: number
  markerPosition: { lat: number; lng: number; deaths: number; cfr: number }
}

function ChangeMapView({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap()

  useEffect(() => {
    map.setView([center.lat, center.lng])
  }, [center, map])

  return null
}

const createCustomIcon = (deaths: number, cfr: number) => {
  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: red; color: white; border-radius: 50%; width: 60px; height: 60px; display: flex; flex-direction: column; justify-content: center; align-items: center; font-weight: bold; font-size: 10px; text-align: center;">
            <span>Deaths: ${deaths}</span>
            <span>CFR: ${cfr.toFixed(2)}%</span>
          </div>`,
    iconSize: [60, 60],
    iconAnchor: [30, 60],
  })
}

export default function Map({ center, zoom, markerPosition }: MapProps) {
  const customIcon = createCustomIcon(markerPosition.deaths, markerPosition.cfr)

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <MapContainer 
        center={[center.lat, center.lng]} 
        zoom={zoom} 
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[markerPosition.lat, markerPosition.lng]} icon={customIcon}>
          <Popup>
            <div>
              <p>Deaths: {markerPosition.deaths}</p>
              <p>Case Fatality Ratio: {markerPosition.cfr.toFixed(2)}%</p>
            </div>
          </Popup>
        </Marker>
        <ChangeMapView center={center} />
      </MapContainer>
    </div>
  )
}