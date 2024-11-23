const winston = require("winston");

// Criação de um logger com dois transportes: um para o console e outro para um arquivo
const logger = winston.createLogger({
  level: "info", // O nível de log padrão (pode ser 'debug', 'info', 'warn', 'error')
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Logs no console
    new winston.transports.File({
      filename: "logs/app.log", // Arquivo para armazenar logs
      format: winston.format.combine(
        winston.format.timestamp(), // Adiciona timestamp
        winston.format.json() // Formato de log em JSON
      ),
    }),
  ],
});

// Exporta o logger para ser usado em outros arquivos
module.exports = logger;
