import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, User, Pencil } from "lucide-react"; // GenZ style icons

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

    if (!profile)
        return (
            <div className="text-center mt-10 text-gray-400 text-lg tracking-wide animate-pulse">
                Loading your vibe...
            </div>
        );

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_30px_rgba(0,255,255,0.15)] max-w-md w-full p-6 space-y-6 text-white"
            >
                <div className="flex flex-col items-center text-center">
                    <img
                        src={
                            profile.avatarUrl ||
                            `https://api.dicebear.com/7.x/thumbs/svg?seed=${profile.username}`
                        }
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-violet-500/30 shadow-lg"
                    />
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-cyan-300 flex items-center gap-2">
                        <User className="w-5 h-5 text-cyan-400" />
                        @{profile.username}
                    </h2>
                    <p className="text-sm text-gray-300 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        {profile.email}
                    </p>
                </div>

                <div className="border-t border-white/10 pt-4">
                    <h3 className="text-lg font-semibold mb-2 text-violet-300 flex items-center gap-2">
            
                        Bio
                    </h3>
                    <p className="text-sm text-gray-300">
                        {profile.bio || "No bio yet — but vibes are immaculate ⚡"}
                    </p>
                </div>

                <div className="text-center">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-semibold shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
                    >
                        <Pencil className="w-4 h-4" />
                        Edit Profile
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
