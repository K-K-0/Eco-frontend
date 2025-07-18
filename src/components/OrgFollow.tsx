import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

type orgType = {
    id: string
    name: string
    description: string
    followers: { id: number} []
}

const OrgCard = ({ org }: {org: orgType}) => {
    const user = useAuth()?.user
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (org && org.followers && user?.id) {
            const followed = org.followers.some(f => f.id === user.id)
            setIsFollowing(followed)
            console.log(followed)
        }
    }, [user, org])

    const toggleFollow = async () => {
        try {
            const BASE_URL = import.meta.env.VITE_BACKEND_URL
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
        <div className="p-3 border  rounded-2xl shadow-sm bg-gray-300 ">
            <div className="flex flex-row gap-2 justify-between items-center py-2">
                <h3 className="text-lg font-bold">{org.name}</h3>

                <button
                    onClick={toggleFollow}
                    className={`mt-2 px-3 py-1 cursor-pointer rounded text-white ${isFollowing ? "bg-red-500" : "bg-green-600"}`}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
            </div>
            <div className="mt-5">
                <p className=" bg-gray-200 px-4 py-4 text-black shadow-2xl rounded-2xl justify-center items-center">{org.description}</p>

            </div>
        </div>
    );
};

export default OrgCard;
