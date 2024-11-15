const express = require("express");
const Tarefa = require("../models/tarefa");
const router = express.Router();


// criar uma nova tarefa 

router.post("/tarefas", async (req, res) => {
    try {
        const tarefa = await Tarefa.create(req.body);
        res.status(201).json(tarefa);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar a tarefa" });
    }
});


// Ler todas as tarefas 

router.get("/tarefas", async (req, res) => {
    try {
        const tarefas = await Tarefa.findAll();
        res.json

    }
})