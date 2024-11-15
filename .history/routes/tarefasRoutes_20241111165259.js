const express = require("express");
const Tarefa = require("../models/tarefa");
const router = express.Router();


// criar uma nova tarefa 

router.post("/tarefas", async (req, res) => {
    try {
        const tarefa = awai Tarefa.create(req)
    }
})