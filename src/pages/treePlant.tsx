import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Sparkles, Leaf, ImagePlus, MapPin } from "lucide-react";

const Plant = () => {
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [desc, setDesc] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handlePlant = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const BASE_URL = import.meta.env.VITE_BACKEND_URL;
            const tree = await axios.post(`${BASE_URL}/api/plant`, {
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),
                description: desc,
                image: imageUrl
            }, { withCredentials: true });
            console.log(tree.data);
            alert("Tree planted successfully 🌱");
        } catch (error) {
            console.error(error);
            alert("Failed to plant tree.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
            >
                <h1 className="text-4xl font-extrabold text-green-400 flex items-center justify-center gap-2">
                    <Leaf className="text-green-300" size={32} /> Plant a Tree, Heal the Earth 🌍
                </h1>
                <p className="text-gray-400 text-sm mt-2">Make your impact visible. Every tree counts.</p>
            </motion.div>

            <motion.form
                onSubmit={handlePlant}
                className="w-full max-w-lg bg-[#1c1c1c] p-6 rounded-2xl shadow-lg space-y-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin size={16} /> Latitude
                    </label>
                    <input
                        type="text"
                        required
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        placeholder="Enter latitude"
                        className="bg-[#2a2a2a] text-white p-2 rounded w-full outline-none focus:ring-2 focus:ring-green-400"
                    />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin size={16} /> Longitude
                    </label>
                    <input
                        type="text"
                        required
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        placeholder="Enter longitude"
                        className="bg-[#2a2a2a] text-white p-2 rounded w-full outline-none focus:ring-2 focus:ring-green-400"
                    />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                        <Sparkles size={16} /> Description
                    </label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Why are you planting this tree?"
                        className="bg-[#2a2a2a] text-white p-2 rounded w-full outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }}>
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                        <ImagePlus size={16} /> Image URL
                    </label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Optional image link of your planted tree"
                        className="bg-[#2a2a2a] text-white p-2 rounded w-full outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </motion.div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 mt-2 bg-green-500 hover:bg-green-600 transition-colors text-white font-bold rounded-xl"
                >
                    🌱 Plant Tree Now
                </motion.button>
            </motion.form>

            <motion.div
                className="mt-10 text-center text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <p>“Be the generation that gave back to nature.” 💚</p>
            </motion.div>
        </div>
    );
};

export default Plant;
