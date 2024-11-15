const { Sequelize } = require("sequelize");
require('dotenv').config(); // Carrega variaveis do .env

const sequelize = new Sequelize(
   {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados foi estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
})();

module.exports = sequelize;
