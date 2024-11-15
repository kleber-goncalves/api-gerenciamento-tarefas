const { DataTypes } = requiere('sequelize');
const sequelize = require('../config/database');

const Tarefa = sequelize.defibe('Tarefa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataType.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    concluido: {

        
    }
















})