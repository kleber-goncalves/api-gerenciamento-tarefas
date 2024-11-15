const express = require('express');
const bodyparser = require('body-parser');
const tarefasRoutes = require('./routes/tarefasRoutes");
const Tarefa = require("./models/tarefa");

const app = express();
const PORT = 3000;

// Configuração do body-parser
app.use(bodyparser.json());

// Rota principal para verificar se o servidor está funcionando
app.get("/status", (reg, res) => {
  res.send("API de gerenciamnto de tarefas fucionando com suscesso!");
});

// Rota para o CRUD de tarefas
app.use("/api", tarefasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na ${PORT}`);
});

// Sincronização com o banco de dados
(async () => {
  try {
    await Tarefa.sync({ force: false });
    console.log("Banco de dados e modelo sincronizados com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar modelo com o banco de dados:", error);
  }
})();
