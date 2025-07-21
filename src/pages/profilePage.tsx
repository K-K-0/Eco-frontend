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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe29f] via-[#ffa99f] to-[#ff719a] px-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-6 text-white">
                <div className="flex flex-col items-center text-center">
                    <img
                        src={profile.avatarUrl || `https://api.dicebear.com/7.x/thumbs/svg?seed=${profile.username}`}
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-md"
                    />
                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">@{profile.username}</h2>
                    <p className="text-sm text-white/80 mt-1">{profile.email}</p>
                </div>

                <div className="border-t border-white/20 pt-4">
                    <h3 className="text-lg font-bold mb-2 text-white/90">✨ About Me</h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                        {profile.bio || "🌈 Living the vibes, but bio is missing..."}
                    </p>
                </div>

                <div className="text-center">
                    <button className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#74ebd5] to-[#acb6e5] hover:opacity-90 transition-all font-semibold text-gray-900 shadow-lg">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
