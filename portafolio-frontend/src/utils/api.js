//src/utils/api.js
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://agmzdev25.pythonanywhere.com',
    headers: {
        'Content-Type': 'application/json'
    },
});

export default api;