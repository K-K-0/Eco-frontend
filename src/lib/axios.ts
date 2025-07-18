import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL

const API = axios.create({
    baseURL: `https://eco-social-production-00a1.up.railway.app/api`,
    withCredentials: true
})

export default API