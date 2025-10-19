const { pool } = require('../config/db');
exports.getAll = (req, res) => {
  pool.query('SELECT * FROM cliente ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
exports.create = (req, res) => {
  const { nombre, telefono, correo } = req.body;
  pool.query('INSERT INTO cliente (nombre, telefono, correo) VALUES (?, ?, ?)', [nombre, telefono, correo], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId });
  });
};
exports.update = (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, correo } = req.body;
  pool.query('UPDATE cliente SET nombre=?, telefono=?, correo=? WHERE id=?', [nombre, telefono, correo, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cliente actualizado' });
  });
};
exports.delete = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM cliente WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cliente eliminado' });
  });
};
