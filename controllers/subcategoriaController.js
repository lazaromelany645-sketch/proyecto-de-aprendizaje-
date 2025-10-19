const { pool } = require('../config/db');

exports.getAll = (req, res) => {
  pool.query('SELECT s.*, c.nombre AS categoria FROM subcategoria s LEFT JOIN categoria c ON s.id_categoria = c.id', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
