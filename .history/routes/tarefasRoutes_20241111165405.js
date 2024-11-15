const express = require("express");
const Tarefa = require("../models/tarefa");
const router = express.Router();


// criar uma nova tarefa 

router.post("/tarefas", async (req, res) => {
    try {
        const tarefa = await Tarefa.create(req.body);
        res.stat
    }
})