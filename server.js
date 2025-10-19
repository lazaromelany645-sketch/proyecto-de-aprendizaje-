require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
<<<<<<< HEAD

const clienteRoutes = require('./routes/clienteRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes');
const veterinarioRoutes = require('./routes/veterinarioRoutes');
const citaRoutes = require('./routes/citaRoutes');
=======
const categoriaRoutes = require('./routes/categoriaRoutes');
const subcategoriaRoutes = require('./routes/subcategoriaRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
>>>>>>> 8dd17250913ad1033eec85766e23d0eeebb7adb3

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/api/clientes', clienteRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/citas', citaRoutes);

=======
// Serve frontend
app.use('/', express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/categorias', categoriaRoutes);
app.use('/api/subcategorias', subcategoriaRoutes);
app.use('/api/docentes', docenteRoutes);
app.use('/api/cursos', cursoRoutes);

// fallback to index
>>>>>>> 8dd17250913ad1033eec85766e23d0eeebb7adb3
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

<<<<<<< HEAD
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor veterinaria corriendo en http://localhost:${PORT}`));
=======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor cursis-virtuaels corriendo en http://localhost:${PORT}`));
>>>>>>> 8dd17250913ad1033eec85766e23d0eeebb7adb3
