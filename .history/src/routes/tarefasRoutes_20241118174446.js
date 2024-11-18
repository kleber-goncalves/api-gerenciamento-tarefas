const express = require("express");
const Tarefa = require("../models/tarefa");
const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// criar uma nova tarefa

router.post("/tarefa", verifyToken, [
  body('titulo').notEmpty(.winthMessage('Titulo é obrigato'))
], async (req, res) => {
  try {
    const tarefa = await Tarefa.create(req.body);
    res.status(201).json(tarefa);
  } catch (error) {
    console.error("Erro ao criar a tarefa:", error);
    res
      .status(500)
      .json({ error: "Erro ao criar a tarefa", details: error.message });
  }
});

// Ler todas as tarefas

router.get("/tarefa", async (req, res) => {
  try {
    const tarefa = await Tarefa.findAll();
    res.json(tarefa);
  } catch (error) {
    console.error("Erro ao criar a tarefa:", error);
    res
      .status(500)
      .json({ error: "Error ao buscar tarefas", details: error.message });
  }
});

// Ler tarefa por ID

router.get("/tarefa/:id", async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (tarefa) {
      res.json(tarefa);
    } else {
      res.status(404).json({ error: "Tarefas nao encontrada" });
    }
  } catch (error) {
    console.error("Erro ao criar a tarefa:", error);
    res
      .status(500)
      .json({ error: "Error ao buscar tarefas", details: error.message });
  }
});

// Atualizar uma tarefas por ID

router.put("/tarefa/:id", verifyToken, async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (tarefa) {
      await tarefa.update(req.body);
      res.json(tarefa);
    } else {
      res.status(404).json({ error: "Tarefa nao encontrada" });
    }
  } catch (error) {
    console.error("Erro ao criar a tarefa:", error);
    res
      .status(500)
      .json({ error: "Error ao atualizar tarefa", details: error.message });
  }
});

// Deletar uma tarefa por ID

router.delete("/tarefa/:id", verifyToken, async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (tarefa) {
      await tarefa.destroy();
      res.json({ message: "Tarefa deletada com sucesso" });
    } else {
      res.status(404).json({ error: "Tarefa nao encontrada" });
    }
  } catch (error) {
    console.error("Erro ao criar a tarefa:", error);
    res
      .status(500)
      .json({ error: "Error ao deletar tarefa", details: error.message });
  }
});

module.exports = router;
