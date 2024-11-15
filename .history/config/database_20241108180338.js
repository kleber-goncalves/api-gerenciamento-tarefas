const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tarefas_db", "root", "senha_do_banco", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
