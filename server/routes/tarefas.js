const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET todas tarefas
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tarefas ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST nova tarefa
router.post('/', async (req, res) => {
  const { texto } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO tarefas (texto) VALUES ($1) RETURNING *',
      [texto]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT atualizar tarefa
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { texto } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE tarefas SET texto = $1 WHERE id = $2 RETURNING *',
      [texto, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE tarefa
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM tarefas WHERE id = $1',
      [id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;