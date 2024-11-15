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
        res.json(tarefas);
    } catch  (error) {
        res.status(500).json({ error: "Error ao buscar tarefas" });
    }
});



// Ler tarefa por ID

router.get("/tarefas/:id", async (req, res) => {
    try {
        const tarefas = await Tarefa.findByPk(req.params.id);
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

router.put("/tarefas/:id", async (req, res) => {
    try {
        const tarefa = await Tarefa.findByPk(reqparams.id);
        if (tarefa) {
            
        }
    }
    ]
})