import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

type orgType = {
    id: string;
    name: string;
    description: string;
    followers: { id: number }[];
};

const OrgCard = ({ org }: { org: orgType; onClose?: () => void }) => {
    const user = useAuth()?.user;
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (org && org.followers && user?.id) {
            const followed = org.followers.some((f) => f.id === user.id);
            setIsFollowing(followed);
        }
    }, [user, org]);

    const toggleFollow = async () => {
        try {
            const BASE_URL = import.meta.env.VITE_BACKEND_URL;
            const endpoint = `${BASE_URL}/eco-orgs/${org.id}`;

            if (isFollowing) {
                await axios.delete(endpoint, { withCredentials: true });
            } else {
                await axios.post(endpoint, {}, { withCredentials: true });
            }

            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("Follow/unfollow failed", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="relative w-[90%] max-w-sm sm:max-w-md mx-auto p-6 rounded-3xl 
             bg-black text-white 
             shadow-xl border border-gray-800"
        >
            {/* Org Name and Follow Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold">{org.name}</h2>

                <button
                    onClick={toggleFollow}
                    className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md transition duration-300 ease-in-out
        ${isFollowing
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "bg-gray-900 hover:bg-gray-800 text-white"
                        }`}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
            </div>

            {/* Org Description */}
            <p className="mt-4 text-sm text-gray-200 leading-relaxed rounded-lg 
                bg-gray-900 p-4 shadow-inner">
                {org.description || "No description available."}
            </p>
        </motion.div>

    );
};

export default OrgCard;
