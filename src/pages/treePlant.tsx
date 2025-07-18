import axios from "axios";
import { useState } from "react";


const Plant = () => {
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [desc, setDesc] = useState("");
    const [imageUrl, setImageUrl] = useState("");




    const handlePlant = async (e: React.FormEvent ) => {
        e.preventDefault()
        try {
            const BASE_URL = import.meta.env.VITE_BACKEND_URL
            const tree = await axios.post(`${BASE_URL}/api/plant`, {
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),
                description: desc,
                image: imageUrl
            }, { withCredentials: true })
            console.log(tree.data)
        } catch (error) {
            console.error(error);
            alert("Failed to plant tree.");

        }
    }


    return (
        <form onSubmit={handlePlant} className="space-y-3 p-4 bg-white rounded shadow-md max-w-md">
            <input
                type="text"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full border p-2 rounded"
            />
            <textarea
                placeholder="Tree description (optional)"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Image URL (optional)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border p-2 rounded"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Plant Tree
            </button>
        </form>
    );
}

export default Plant
