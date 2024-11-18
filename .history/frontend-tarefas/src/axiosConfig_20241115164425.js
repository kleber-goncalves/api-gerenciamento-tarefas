// src/axiosConfig.js
import axios from "axios";
import { config } from "dotenv";

// Criação da instancia do Axios
const api = axios.create({
    baseURL: "http://localhost:3000/api",  // URL base para o backend
});


// Interceptor para adicionar o token JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }
)