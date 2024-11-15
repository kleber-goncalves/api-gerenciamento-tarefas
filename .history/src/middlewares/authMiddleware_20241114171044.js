// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Chave secreta para gerar os tokens
const SECRET_KEY = "chave_secreta";

// Função para gerar o token JWT
function generateToken(userId) {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
}

// Middleware para verificar o token
function verifyToken(req, res, next) {
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  req.headers["authorization"];



  if (!token) {
    return res.status(403).json({ message: "Token não fornecido." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido." });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = { generateToken, verifyToken };