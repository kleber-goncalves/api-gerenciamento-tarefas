const express = require("express");
const Tarefa = require("../models/tarefa");
const router = express.Router();


// criar uma nova tarefa

router.post("/tarefa", async (req, res) => {
  try {
    const tarefa = await Tarefa.create(req.body);
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar a tarefa" });
  }
});

// Ler todas as tarefas

router.get("/tarefa", async (req, res) => {
  try {
    const tarefa = await Tarefa.findAll();
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Error ao buscar tarefas" });
  }
});

// Ler tarefa por ID

router.get("/tarefa/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (tarefa) {
      res.json(tarefas);
    } else {
      res.status(404).json({ error: "Tarefas nao encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error ao buscar tarefas" });
  }
});

// Atualizar uma tarefas por ID

router.put("/tarefa/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (tarefa) {
      await tarefa.update(req.body);
      req.json(tarefa);
    } else {
      res.status(404).json({ error: "Tarefa nao encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error ao atualizar tarefa" });
  }
});

// Deletar uma tarefa por ID

router.delete("/tarefa/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (tarefa) {
      await tarefa.destroy();
      res.json({ message: "Tarefa deletada com sucesso" });
    } else {
      res.status(404).json({ error: "Tarefa nao encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error ao deletar tarefa" });
  }
});

module.exports = router;
