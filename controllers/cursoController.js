const { pool } = require('../config/db');

exports.getAll = (req, res) => {
  const sql = `
    SELECT c.id, c.titulo, c.descripcion, c.fecha_inicio, c.fecha_fin, c.duracion_horas, c.precio,
           c.id_subcategoria, c.id_docente,
           s.nombre AS subcategoria, cat.nombre AS categoria, d.nombre AS docente
    FROM curso c
    LEFT JOIN subcategoria s ON c.id_subcategoria = s.id
    LEFT JOIN categoria cat ON s.id_categoria = cat.id
    LEFT JOIN docente d ON c.id_docente = d.id
    ORDER BY c.id DESC`;
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.create = (req, res) => {
  const { titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, id_subcategoria, id_docente } = req.body;
  const sql = `INSERT INTO curso (titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, id_subcategoria, id_docente)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  pool.query(sql, [titulo, descripcion, fecha_inicio || null, fecha_fin || null, duracion_horas || null, precio || null, id_subcategoria || null, id_docente || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Curso creado' });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, id_subcategoria, id_docente } = req.body;
  const sql = `UPDATE curso SET titulo=?, descripcion=?, fecha_inicio=?, fecha_fin=?, duracion_horas=?, precio=?, id_subcategoria=?, id_docente=? WHERE id=?`;
  pool.query(sql, [titulo, descripcion, fecha_inicio || null, fecha_fin || null, duracion_horas || null, precio || null, id_subcategoria || null, id_docente || null, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Curso actualizado' });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM curso WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Curso eliminado' });
  });
};
