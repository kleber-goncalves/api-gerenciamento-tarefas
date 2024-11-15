import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

const PORT = 3000;

app.get("/", (reg, res) => {
  res.sent("API de gerenciamnto de tarefas fucionando com suscesso!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na ${PORT}`);
});

import { sync } from "../models/tarefa";

sync({ force: false }).then(() => {
  console.log("banco de dados e modelo sicronizados");
});
