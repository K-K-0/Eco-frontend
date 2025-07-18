import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL

const API = axios.create({
    baseURL: `http://localhost:3000/api`,
    withCredentials: true
})

export default API