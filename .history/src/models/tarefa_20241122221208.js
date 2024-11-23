const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tarefa = sequelize.define("Tarefa", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "O título é obrigatório",
      },
      len: {
        args: [5, 100],
        msg: "O título deve ter entre 5 e 100 caracteres",
      },
    },
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [0, 1000],
        msg: "A descrição deve ter no máximo 1000 caracteres",
      },
    },
  },
  concluido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}
);

module.exports = Tarefa;
