// arquivo principal do back-end
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const tarefasRoutes = require('./routes/tarefasRoutes');
const Tarefa = require('./models/tarefa');
const { generateToken } = require('./middlewares/authMiddleware');


// Importando as ferramentas que vamos adicionar
const morgan = require('morgan');
const helmet = require('helmet');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS para permitir que o front-end se conecte ao back-end
app.use(cors());

// Configuração do body-parser
app.use(bodyparser.json());

// Rota principal para verificar se o servidor está funcionando
app.get('/status', (req, res) => {
  res.send('API de gerenciamnto de tarefas fucionando com suscesso!');
});

// Rota para o CRUD de tarefas
app.use('/api/tasks', tarefasRoutes);

// Rota de login com o prefixo /api
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Simulação de usuário fixo
  if (username === 'admin' && password === '123456') {
    const token = generateToken(1); // Vamos usar '1' como userId para teste
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas.' });
  }
});

// Sincronização com o banco de dados
(async () => {
  try {
    await Tarefa.sync({ alter: true });
    console.log('Banco de dados e modelo sincronizados com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar modelo com o banco de dados:', error);
  }
})();

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});