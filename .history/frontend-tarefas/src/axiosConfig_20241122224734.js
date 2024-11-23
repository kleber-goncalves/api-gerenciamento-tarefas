// src/axiosConfig.js
import axios from 'axios';
import winston from 'winston';

// Criação da instancia do Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api/tasks', // URL base para o backend
});

// Configurando o logger Winston para logar as requisições feitas com Axios
const logger = winston.createLogger({
  level: 'info', // Nível de log
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: 'logs/axios.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
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