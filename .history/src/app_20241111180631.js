const express = require("express");
const bodyparser = require("body-parser");
const tarefasRoutes = require("../routes/tarefasRoutes");
const Tarefa = require("../models/tarefa");
const app = express();




app.use(bodyparser.json());

const PORT = 3000;

app.use(express.json());

app.use("/api", tarefasRoutes);

app.get("/", (reg, res) => {
  res.send("API de gerenciamnto de tarefas fucionando com suscesso!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na ${PORT}`);
});


Tarefa.sync({ force: false }).then(() => {
  console.log("banco de dados e modelo sicronizados");
});
