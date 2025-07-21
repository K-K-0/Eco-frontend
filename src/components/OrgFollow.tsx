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

const OrgCard = ({ org, onClose }: { org: orgType; onClose?: () => void }) => {
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
            className="relative w-[90%] max-w-sm sm:max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 shadow-xl border border-purple-300 dark:border-purple-700"
        >
            {/* Close Button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-xl font-bold"
                >
                    ✕
                </button>
            )}

            {/* Org Name and Follow Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {org.name}
                </h2>

                <button
                    onClick={toggleFollow}
                    className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md transition duration-300 ease-in-out
                        ${isFollowing
                            ? "bg-pink-500 hover:bg-pink-600 text-white"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
            </div>

            {/* Org Description */}
            <p className="mt-4 text-sm text-gray-800 dark:text-gray-200 leading-relaxed rounded-lg bg-white/70 dark:bg-black/30 p-4 shadow-inner backdrop-blur">
                {org.description || "No description available."}
            </p>
        </motion.div>
    );
};

export default OrgCard;
