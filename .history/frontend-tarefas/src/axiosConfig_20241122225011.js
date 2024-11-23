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
      logger.warn('Token não encontrado no localStorage');
      console.warn('Token não encontrado no localStorage');
    }

    // Logando a requisição
    logger.info(`Requisição para ${config.url} com método ${config.method}`);

    return config;
  },
  (error) => {
    // Logando o erro da requisição
    logger.error(`Erro na requisição: ${error.message}`);
    return Promise.reject(error);
  }
);

// Interceptor para logar as respostas de sucesso ou erro
api.interceptors.response.use(
  (response) => {
    logger.info(`Resposta recebida de ${response.config.url}: ${response.status}`);
    return response;
  },
  (error) => {
    logger.error(`Erro na resposta de ${error.config.url}: ${error.message}`);
    return Promise.reject(error);
  }
);

export default api;
