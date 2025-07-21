import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import {
    Building2,
    FileText,
    MapPin,
    LocateIcon,
    Map,
    SendHorizonal
} from "lucide-react";

const OrgForm = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        Address: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const BASE_URL = import.meta.env.VITE_BACKEND_URL;
            await axios.post(
                `${BASE_URL}/api/eco-orgs/register`,
                {
                    name: form.name,
                    description: form.description,
                    latitude: parseFloat(form.latitude),
                    longitude: parseFloat(form.longitude),
                    Address: form.Address,
                },
                { withCredentials: true }
            );
            alert("Organization is created");
        } catch (err) {
            console.log(err);
            alert("Error registering organization");
        }
    };

    return (
        <>
            <NavBar />
            <motion.div
                className="min-h-screen bg-slate-900 text-white flex items-center justify-center py-10 px-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-6"
                >
                    <h2 className="text-3xl font-bold text-center mb-6">
                        🌱 Register Eco-Organization
                    </h2>

                    {/* Name */}
                    <div className="flex items-center border-b border-slate-600 focus-within:border-green-500">
                        <Building2 className="w-5 h-5 mr-3 text-green-400" />
                        <input
                            type="text"
                            required
                            placeholder="Organization Name"
                            className="bg-transparent w-full py-2 px-1 outline-none"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div className="flex items-start border-b border-slate-600 focus-within:border-green-500">
                        <FileText className="w-5 h-5 mt-2 mr-3 text-green-400" />
                        <textarea
                            placeholder="Description"
                            rows={3}
                            className="bg-transparent w-full py-2 px-1 outline-none resize-none"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />
                    </div>

                    {/* Latitude */}
                    <div className="flex items-center border-b border-slate-600 focus-within:border-green-500">
                        <MapPin className="w-5 h-5 mr-3 text-green-400" />
                        <input
                            type="text"
                            placeholder="Latitude"
                            required
                            className="bg-transparent w-full py-2 px-1 outline-none"
                            value={form.latitude}
                            onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                        />
                    </div>

                    {/* Longitude */}
                    <div className="flex items-center border-b border-slate-600 focus-within:border-green-500">
                        <LocateIcon className="w-5 h-5 mr-3 text-green-400" />
                        <input
                            type="text"
                            placeholder="Longitude"
                            required
                            className="bg-transparent w-full py-2 px-1 outline-none"
                            value={form.longitude}
                            onChange={(e) =>
                                setForm({ ...form, longitude: e.target.value })
                            }
                        />
                    </div>

                    {/* Address */}
                    <div className="flex items-center border-b border-slate-600 focus-within:border-green-500">
                        <Map className="w-5 h-5 mr-3 text-green-400" />
                        <input
                            type="text"
                            placeholder="Address"
                            required
                            className="bg-transparent w-full py-2 px-1 outline-none"
                            value={form.Address}
                            onChange={(e) => setForm({ ...form, Address: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition-all w-full gap-2 mt-4"
                    >
                        <SendHorizonal size={18} />
                        Submit
                    </button>
                </form>
            </motion.div>
        </>
    );
};

export default OrgForm;
