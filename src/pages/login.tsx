import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { loginUser, getMe } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const auth = useAuth();
    if (!auth) throw new Error("AuthContext is undefined. Wrap your app in AuthProvider.");
    const { setUser, setIsAuthenticated } = auth;
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/dashboard";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            const res = await getMe();
            setUser(res.data);
            setIsAuthenticated(true);
            setError("");
            navigate(from, { replace: true });
        } catch (err) {
            setError("Invalid credentials or session error.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-300 to-blue-500 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-black shadow-2xl rounded-2xl w-full max-w-md p-6 sm:p-8 space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-white">Welcome Back    </h2>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="mt-1 block w-full px-4 py-2 rounded-full border border-gray-500 bg-gray-900 text-white placeholder-gray-400 focus:ring-green-400 focus:border-green-400 outline-none"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="mt-1 block w-full px-4 py-2 rounded-full border border-gray-500 bg-gray-900 text-white placeholder-gray-400 focus:ring-green-400 focus:border-green-400 outline-none"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-green-400 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-300">
                    Don’t have an account?{' '}
                    <Link to="/signup" className="text-green-400 font-medium hover:underline">
                        Sign Up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
