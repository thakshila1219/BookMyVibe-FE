import axios from 'axios';

export const backendApi = axios.create({
    baseURL: 'http://localhost:3000/api'
});

backendApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        console.log("Request URL:", config.url);
        console.log("Token exists:", !!token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);