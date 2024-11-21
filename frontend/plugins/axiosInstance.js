import axios from 'axios';
import apiUrl from "utilities/apiUrl"

const axiosInstance = axios.create({
    baseURL: `${apiUrl}/api`, // Adjust based of backend URL
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// Before request send axios intercept to config 
axiosInstance.interceptors.request.use(
    async (config) => {
        // Dynamically set base URL for CSRF token request
        if (config.url === '/sanctum/csrf-cookie') {
            config.baseURL = `${apiUrl}`;
        }
        
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
export {axios};
