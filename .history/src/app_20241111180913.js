const express = require("express");
const bodyparser = require("body-parser");
const tarefasRoutes = require("../routes/tarefasRoutes");
const Tarefa = require("../models/tarefa");



const app = express();
const PORT = 3000;




app.use(bodyparser.json());
// Rota principal para verificar se o servidor está funcionando
app.get("/", (reg, res) => {
  res.send("API de gerenciamnto de tarefas fucionando com suscesso!");
});


// Rota para o CRUD de tarefas
app.use("/api", tarefasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na ${PORT}`);
});


// Sincronização com o banco de dados
Tarefa.sync({ force: false }).then(() => {
  console.log("banco de dados e modelo sicronizados");
});
