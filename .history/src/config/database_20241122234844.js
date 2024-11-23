// src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const winston = require('winston'); // Importa o Winston para log
const morgan = require('morgan'); // Importa o Morgan para log de requisições HTTP
const helmet = require('helmet'); // Importa o Helmet para segurança

// Configuração do Winston para log de arquivos
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Middleware de Morgan para log das requisições HTTP
const logRequest = morgan('combined', {
  stream: {
    write: (msg) => logger.info(msg), // Redireciona os logs de requisições HTTP para o Winston
  },
});

// Verifica se todas as variáveis de ambiente necessárias estão carregadas
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASS', 'DB_HOST', 'DB_PORT'];

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(
    `Erro: As seguintes variáveis de ambiente não estão configuradas corretamente: ${missingEnvVars.join(
      ', '
    )}`
  );
  process.exit(1); // Sai do processo caso as variáveis não estejam configuradas corretamente
}

// Criação da instância Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: process.env.DB_LOGGING === 'true', // Controla o logging através de uma variável de ambiente
    port: process.env.DB_PORT,
    define: {
      freezeTableName: true, // Impede que o Sequelize altere os nomes das tabelas
      timestamps: true, // Garante que todas as tabelas tenham as colunas createdAt e updatedAt
    },
  }
);

// Teste de conexão com o banco de dados
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    logger.info('Conexão com o banco de dados foi estabelecida com sucesso.');
  } catch (error) {
    logger.error('Não foi possível conectar ao banco de dados:', error);
    process.exit(1); // Finaliza o processo caso haja erro na conexão
  }
}

testDatabaseConnection();

// Exporta o Sequelize, o Winston para logs, e o Middleware Morgan
module.exports = { sequelize, logger, logRequest, helmet };
