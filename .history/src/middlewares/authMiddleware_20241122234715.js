// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { logger } = require('../config/database'); // Importando o logger do Winston
const morgan = require('morgan'); // Importando o Morgan para logar requisições HTTP
const helmet = require('helmet'); // Importando o Helmet para segurança

// Chave secreta para gerar os tokens
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'chave_secreta'; // Melhor prática: usar variável de ambiente para chave secreta

// Função para gerar o token JWT
function generateToken(userId) {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
}

// Middleware para verificar o token
function verifyToken(req, res, next) {
  const authHeader = req.headers?.authorization;
  // Verifique se o header existe e começa com "Bearer "
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  logger.info('Token recebido:', token); // Log com o Winston para verificar o token

  if (!token) {
    logger.warn('Token não fornecido.'); // Log para quando o token não for fornecido
    return res.status(403).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      logger.error('Erro na verificação do token:', err); // Log para erros de verificação
      return res.status(401).json({ message: 'Token inválido.' });
    }

    req.userId = decoded.id;
    next();
  });
}

// Middleware para logar as requisições HTTP com o Morgan
const logRequest = morgan('combined', {
  stream: {
    write: (msg) => logger.info(msg) // Redireciona logs de requisições para o Winston
  }
});

// Exporta a função de geração de token, verificação de token e o middleware de log de requisição
module.exports = { generateToken, verifyToken, logRequest, helmet };
