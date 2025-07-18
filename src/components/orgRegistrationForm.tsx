import React, { useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

const OrgForm = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        Address: ""
    })


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const BASE_URL = import.meta.env.VITE_BACKEND_URL
            await axios.post(`${BASE_URL}/api/eco-orgs/register`, {
                name: form.name,
                description: form.description,
                latitude: parseFloat(form.latitude),
                longitude: parseFloat(form.longitude),
                Address: form.Address
            }, {withCredentials: true})
            alert("Organization is created")
        } catch (err) {
            console.log(err);
            alert("Error registering organization");
        }
    }

    return (
        
        <form onSubmit={handleSubmit} className="space-y-15">
            <div><NavBar /></div>
            <div className="pt-20 ml-3.5">
                <input type="text" placeholder="Name" required
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><br/>
                <textarea placeholder="Description"
                    value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-30 mt-3.5 p-2 border border-gray-300 rounded" /><br/>
                <input type="text" placeholder="Latitude" required
                    value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} /><br/>
                <input type="text" placeholder="Longitude" required
                    value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} /><br/>
                <input type="text" placeholder="Address" required
                    value={form.Address} onChange={(e) => setForm({ ...form, Address: e.target.value })} /><br/>

                <button type="submit" className="bg-green-600 cursor: pointer text-white px-4 py-2 rounded">Register</button>
            </div>
            
        </form>
    )
}

export default OrgForm