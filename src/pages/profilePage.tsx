import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, User, Info, Pencil } from "lucide-react";

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
                const res = await axios.get(`${BASE_URL}/api/me`, {
                    withCredentials: true,
                });
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
                Loading your profile...
            </div>
        );

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#121212] text-white">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-[#1e1e1e] rounded-2xl shadow-md max-w-md w-full p-6 space-y-6 border border-[#2c2c2c]"
            >
                {/* Avatar and Basic Info */}
                <div className="flex flex-col items-center text-center">
                    <img
                        src={
                            profile.avatarUrl ||
                            `https://api.dicebear.com/7.x/thumbs/svg?seed=${profile.username}`
                        }
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-sky-500 shadow-md"
                    />
                    <h2 className="mt-4 text-2xl font-semibold flex items-center gap-2 text-sky-300">
                        <User className="w-5 h-5 text-sky-400" />
                        @{profile.username}
                    </h2>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-sky-400" />
                        {profile.email}
                    </p>
                </div>

                {/* Bio */}
                <div className="border-t border-[#2c2c2c] pt-4">
                    <h3 className="text-lg font-semibold mb-2 text-violet-300 flex items-center gap-2">
                        <Info className="w-5 h-5 text-violet-400" />
                        About Me
                    </h3>
                    <p className="text-sm text-gray-300">
                        {profile.bio || "No bio yet — just chillin' ✌️"}
                    </p>
                </div>

                {/* Edit Button */}
                <div className="text-center">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        className="mt-4 px-5 py-2 rounded-full bg-[#2c2c2c] border border-sky-600 text-sky-300 font-semibold hover:bg-sky-600/10 transition flex items-center justify-center gap-2"
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
