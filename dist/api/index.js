import axios from "axios";
export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://aimpact-backend.onrender.com";
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});
