// src/axiosConfig.js
import axios from "axios";

// Criação da instancia do Axios
const api = axios.create({
    baseURL: "http://localhost:3000/api",  // URL base para o backend
});


// Interceptor para adicionar o token JWT
api.interceptors.r