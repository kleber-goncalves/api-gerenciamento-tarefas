const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("tarefas_db", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  logging: true,
});



module.exports = sequelize;
