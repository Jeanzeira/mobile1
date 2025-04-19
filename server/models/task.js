const pool = require('../config/db');

class Task {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id');
    return rows;
  }

  static async create(task) {
    const { rows } = await pool.query(
      'INSERT INTO tasks (description, completed) VALUES ($1, $2) RETURNING *',
      [task.description, task.completed || false]
    );
    return rows[0];
  }

  // Outros métodos (update, delete, etc.)
}

module.exports = Task;