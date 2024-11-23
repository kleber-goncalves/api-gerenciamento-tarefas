const { Sequelize } = require("sequelize");
require("dotenv").config(); // Carrega variaveis do .env



const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    port: process.env.DB_PORT,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados foi estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
})();

module.exports = sequelize;
