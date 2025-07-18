import { useRef, useEffect, useState } from "react";
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import axios from "axios";

const MAPTILER_KEY = "bs0qTCbmXadT9ZH0pr9h"




const SetLocation = () => {
    const mapRef = useRef<HTMLDivElement>(null)
    const map = useRef<maplibregl.Map | null>(null)
    const marker = useRef<maplibregl.Marker | null>(null)
    const [coords, setCoords] = useState({lat: 28.6139, lng: 77.2090})

    const handleLocation = async () => {
        const BASE_URL = import.meta.env.VITE_BACKEND_URL
        await axios.post(`${BASE_URL}/location`, {
            lat: coords.lat,
            lng: coords.lng
        })
        alert("location saved")
    }

    useEffect(() => {
        if(map.current || !mapRef.current) return

        map.current = new maplibregl.Map({
            container: mapRef.current,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
            center: [coords.lng, coords.lat],
            zoom: 14
        })

        marker.current = new maplibregl.Marker({draggable: true})
        .setLngLat([coords.lng, coords.lat])
        .addTo(map.current)


        marker.current.on("dragend", () => {
            const lnglat = marker.current!.getLngLat()
            setCoords({lat: lnglat!.lat, lng: lnglat!.lng})
        })
    }, [coords.lat, coords.lng])


    return (
        <div className="space-y-4">
            <div className="text-lg">📍 Drop your location to see nearby organizations</div>
            <div ref={mapRef} className="h-[400px] w-full rounded shadow" />
            <p>Your location: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>
            <button onClick={handleLocation} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save Location
            </button>
        </div>
    )
}

export default SetLocation