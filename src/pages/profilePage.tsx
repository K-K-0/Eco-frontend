import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProfileType {
    username: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
}

const Profile = () => {
    const [profile, setProfile] = useState<ProfileType | null>(null);
    useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.get(`${BASE_URL}/api/me`, { withCredentials: true });
                setProfile(res.data.user);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <div className="text-center mt-10 text-muted-foreground">Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg max-w-md w-full p-6 space-y-6 text-white">
                <div className="flex flex-col items-center text-center">
                    <img
                        src={profile.avatarUrl || "https://api.dicebear.com/7.x/thumbs/svg?seed=" + profile.username}
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-md"
                    />
                    <h2 className="mt-4 text-2xl font-bold tracking-tight">@{profile.username}</h2>
                    <p className="text-sm text-gray-300">{profile.email}</p>
                </div>

                <div className="border-t border-white/10 pt-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-100">About Me</h3>
                    <p className="text-sm text-gray-300">
                        {profile.bio || "This user hasn’t added a bio yet. 🌱"}
                    </p>
                </div>

                <div className="text-center">
                    <button className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition font-semibold text-white">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
