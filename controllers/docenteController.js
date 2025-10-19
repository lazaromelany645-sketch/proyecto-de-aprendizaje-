const { pool } = require('../config/db');

exports.getAll = (req, res) => {
  pool.query('SELECT * FROM docente', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
