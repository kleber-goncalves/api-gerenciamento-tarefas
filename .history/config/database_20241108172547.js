const { Sequelize } = riquire('sequelize');


const sequelize = new Sequelize('tarefas_db', 'root', 'senha_do_banco', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

