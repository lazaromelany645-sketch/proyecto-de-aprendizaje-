const { pool } = require('../config/db');
exports.getAll = (req, res) => {
  pool.query('SELECT * FROM veterinario ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
exports.create = (req, res) => {
  const { nombre, especialidad } = req.body;
  pool.query('INSERT INTO veterinario (nombre, especialidad) VALUES (?, ?)', [nombre, especialidad], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId });
  });
};
exports.update = (req, res) => {
  const { id } = req.params;
  const { nombre, especialidad } = req.body;
  pool.query('UPDATE veterinario SET nombre=?, especialidad=? WHERE id=?', [nombre, especialidad, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Veterinario actualizado' });
  });
};
exports.delete = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM veterinario WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Veterinario eliminado' });
  });
};
