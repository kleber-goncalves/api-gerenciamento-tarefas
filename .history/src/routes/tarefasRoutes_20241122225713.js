const express = require('express');
const Tarefa = require('../models/tarefa');
const { verify } = require('jsonwebtoken');
const { verifyToken } = require('../middlewares/authMiddleware');
const { body, validationResult } = require('express-validator');
const winston = require('winston');
const router = express.Router();


// Logger para registrar as requisições

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: 'logs/tarefasRoutes.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});



// criar uma nova tarefa

router.post(
  '/tasks',
  verifyToken,
  [
    body('titulo').notEmpty().withMessage('Titulo é obrigatorio'),
    body('descricao')
      .isLength({ min: 10 })
      .withMessage('Descricao deve ter no minimo 10 carecteres'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validação falhou', { errors: errors.array() });
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const tarefa = await Tarefa.create(req.body);
      logger.info('Tarefa criada com sucesso', { tarefaId: tarefa.id });
      res.status(201).json(tarefa);
    } catch (error) {
      logger.error('Erro ao criar tarefa', { error: error.message });
      console.error('Erro ao criar a tarefa:', error);
      res
        .status(500)
        .json({ error: 'Erro ao criar a tarefa', details: error.message });
    }
  }
);

// Ler todas as tarefas

router.get('/tasks', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default: page 1, 10 tarefas por paginas
  const offset = (page - 1) * limit;
  logger.info('Buscando tarefas com paginação', { page, limit });
  console.log('GET /tasks foi chamado');

  try {
    const tarefa = await Tarefa.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json(tarefa);
  } catch (error) {
    logger.error('Erro ao buscar tarefas', { error: error.message });
    console.error('Erro ao buscar a tarefa:', error);
    res
      .status(500)
      .json({ error: 'Error ao buscar tarefas', details: error.message });
  }
});

// Ler tarefa por ID

router.get('/tasks/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (tarefa) {
      res.json(tarefa);
    } else {
      res.status(404).json({ error: 'Tarefas nao encontrada' });
    }
  } catch (error) {
    console.error('Tarefas nao encontrada:', error);
    res
      .status(500)
      .json({ error: 'Tarefas nao encontrada', details: error.message });
  }
});

// Atualizar uma tarefas por ID

router.put('/tasks/:id', verifyToken, async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (tarefa) {
      await tarefa.update(req.body);
      res.json(tarefa);
    } else {
      res.status(404).json({ error: 'Tarefa nao encontrada id incorreto' });
    }
  } catch (error) {
    console.error('Erro ao atualizar a tarefa:', error);
    res
      .status(500)
      .json({ error: 'Error ao atualizar tarefa', details: error.message });
  }
});

// Deletar uma tarefa por ID

router.delete('/tasks/:id', verifyToken, async (req, res) => {
  try {
    const tarefa = await Tarefa.findByPk(req.params.id);
    if (tarefa) {
      await tarefa.destroy();
      res.json({ message: 'Tarefa deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Tarefa nao encontrada' });
    }
  } catch (error) {
    console.error('Erro ao deletar a tarefa:', error);
    res
      .status(500)
      .json({ error: 'Error ao deletar tarefa', details: error.message });
  }
});

module.exports = router;
