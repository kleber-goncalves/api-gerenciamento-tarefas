// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');


// Chave secreta para gerar os tokens
const SECRET_KEY = 'chave_secreta';


// Função para gerar o token JWT
function generareToken(userId) {
    return jwt.sign
}


