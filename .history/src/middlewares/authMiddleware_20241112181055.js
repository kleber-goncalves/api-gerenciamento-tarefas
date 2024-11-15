// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');


// Chave secreta para gerar os tokens
const SECRET_KEY = 'chave_secreta';


// Função para gerar o token JWT
function generareToken(userId) {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
}




// Middleware para verificar o token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({})
        }
    })
}


