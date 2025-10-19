require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const clienteRoutes = require('./routes/clienteRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes');
const veterinarioRoutes = require('./routes/veterinarioRoutes');
const citaRoutes = require('./routes/citaRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/api/clientes', clienteRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/citas', citaRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor veterinaria corriendo en http://localhost:${PORT}`));
