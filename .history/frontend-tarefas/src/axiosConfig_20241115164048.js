// src/axiosConfig.js
import axios from "axios";

// Criação da instancia do Axios
const api = axios.create({
    baseURL: "http://localhost:3000/api",  // URL base para o backend
});


// Inter