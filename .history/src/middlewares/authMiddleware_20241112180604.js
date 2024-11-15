// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');


// Chave secreta para gerar os tokens
const SECRET_KEY = 'chave_secreta';


// Função para gerar o token JWT
function generareToken(userId) {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
}




// Middleware para verificar o tokre


