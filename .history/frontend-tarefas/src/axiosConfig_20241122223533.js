// src/axiosConfig.js
import axios from 'axios';

// Criação da instancia do Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api/tasks', // URL base para o backend
});

// Interceptor para adicionar o token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      // Caso o token não exista, você pode logar um aviso ou tratar de outra forma
      console.warn('Token não encontrado no localStorage');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
