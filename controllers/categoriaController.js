const { pool } = require('../config/db');

exports.getAll = (req, res) => {
  pool.query('SELECT * FROM categoria', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
