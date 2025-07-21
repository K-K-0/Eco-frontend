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
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-black shadow-2xl rounded-2xl w-full max-w-sm p-6 md:p-8"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-4">
                    Welcome Back 👋
                </h2>

                {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-green-300 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-white mt-4">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-green-300 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
