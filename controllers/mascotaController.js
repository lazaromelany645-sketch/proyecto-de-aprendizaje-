const { pool } = require('../config/db');
exports.getAll = (req, res) => {
  pool.query('SELECT m.*, c.nombre AS cliente FROM mascota m LEFT JOIN cliente c ON m.id_cliente = c.id ORDER BY m.id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
exports.getByCliente = (req, res) => {
  const id_cliente = req.params.id_cliente;
  pool.query('SELECT * FROM mascota WHERE id_cliente = ?', [id_cliente], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
exports.create = (req, res) => {
  const { nombre, especie, raza, edad, id_cliente } = req.body;
  pool.query('INSERT INTO mascota (nombre, especie, raza, edad, id_cliente) VALUES (?, ?, ?, ?, ?)', [nombre, especie, raza, edad, id_cliente], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId });
  });
};
exports.update = (req, res) => {
  const { id } = req.params;
  const { nombre, especie, raza, edad, id_cliente } = req.body;
  pool.query('UPDATE mascota SET nombre=?, especie=?, raza=?, edad=?, id_cliente=? WHERE id=?', [nombre, especie, raza, edad, id_cliente, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Mascota actualizada' });
  });
};
exports.delete = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM mascota WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Mascota eliminada' });
  });
};
