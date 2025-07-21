import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

type orgType = {
    id: string;
    name: string;
    description: string;
    followers: { id: number }[];
};

const OrgCard = ({ org }: { org: orgType }) => {
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

    if (!org) return <div>Organization data not found.</div>;

    return (
        <div className="w-full max-w-md mx-auto p-5 mb-6 rounded-2xl shadow-xl bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {org.name}
                </h3>

                <button
                    onClick={toggleFollow}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isFollowing
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
            </div>

            <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
                {org.description}
            </p>
        </div>
    );
}

export default OrgCard;
