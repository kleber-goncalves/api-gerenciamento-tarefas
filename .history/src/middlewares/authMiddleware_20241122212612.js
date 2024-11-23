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
  const authHeader = req.headers?.authorization;
  // Verifique se o header existe e começa com "Bearer "
  const token =
    
      ? authHeader.split(" ")[1]
      : null;
  console.log("Token recebido:", token); // Log para verificar o token

  if (!token) {
    return res.status(403).json({ message: "Token não fornecido." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Erro na verificação do token:", err); // Log para verificar erros de token
      return res.status(401).json({ message: "Token inválido." });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = { generateToken, verifyToken };
