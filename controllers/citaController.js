const { pool } = require('../config/db');
exports.getAll = (req, res) => {
  const sql = `SELECT ci.id, ci.fecha, ci.hora, ci.motivo, ci.id_mascota, ci.id_veterinario, m.nombre AS mascota, m.especie, c.nombre AS cliente, v.nombre AS veterinario
               FROM cita ci
               LEFT JOIN mascota m ON ci.id_mascota = m.id
               LEFT JOIN cliente c ON m.id_cliente = c.id
               LEFT JOIN veterinario v ON ci.id_veterinario = v.id
               ORDER BY ci.fecha DESC, ci.hora DESC`;
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
exports.create = (req, res) => {
  const { fecha, hora, motivo, id_mascota, id_veterinario } = req.body;
  pool.query('INSERT INTO cita (fecha, hora, motivo, id_mascota, id_veterinario) VALUES (?, ?, ?, ?, ?)', [fecha, hora, motivo, id_mascota, id_veterinario], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId });
  });
};
exports.update = (req, res) => {
  const { id } = req.params;
  const { fecha, hora, motivo, id_mascota, id_veterinario } = req.body;
  pool.query('UPDATE cita SET fecha=?, hora=?, motivo=?, id_mascota=?, id_veterinario=? WHERE id=?', [fecha, hora, motivo, id_mascota, id_veterinario, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cita actualizada' });
  });
};
exports.delete = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM cita WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cita eliminada' });
  });
};
