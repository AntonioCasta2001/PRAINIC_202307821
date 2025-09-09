const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const usuariosRoutes = require('./routes/usuariosRutas');
app.use('/api/usuarios', usuariosRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});