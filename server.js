require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const categoriaRoutes = require('./routes/categoriaRoutes');
const subcategoriaRoutes = require('./routes/subcategoriaRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use('/', express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/categorias', categoriaRoutes);
app.use('/api/subcategorias', subcategoriaRoutes);
app.use('/api/docentes', docenteRoutes);
app.use('/api/cursos', cursoRoutes);

// fallback to index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor cursis-virtuaels corriendo en http://localhost:${PORT}`));
