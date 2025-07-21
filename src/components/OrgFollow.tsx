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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-xs p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
            {/* Close Button */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                >
                    ✕
                </button>
            )}

            {/* Org Name and Follow */}
            <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {org.name}
                </h2>

                <button
                    onClick={toggleFollow}
                    className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${isFollowing
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
            </div>

            {/* Org Description */}
            <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 p-3">
                {org.description || "No description available."}
            </p>
        </motion.div>
    );
};

export default OrgCard;
