const express = require('express');
const app = express();
const port = 8080; 
require('dotenv').config();
const path = require('path');
// IMPORTANTE: Importamos tu conexión real
const sequelize = require('./database.js'); 
const Usuario = require('./model/Usuario.js'); // Importamos tu modelo

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// ==========================================
// RUTAS DE PACIENTES
// ==========================================
app.get('/getPatientData/:id', async (req, res) => {
  try {
    const results = await sequelize.query('CALL obtenerFicha(:id)', {
      replacements: { id: req.params.id }
    });
    res.json(results[0]); 
  } catch (error) {
    console.error('Error al obtener la ficha:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/registerPatientData', async (req, res) => {
  const { 
    nombre, email, fecha_nacim, genero, domicilio, 
    telefono, ocupacion, escolaridad, estado_civil 
  } = req.body;
  const valores = [nombre, email, fecha_nacim, genero, domicilio, telefono, ocupacion, escolaridad, estado_civil];

  try {
    await sequelize.query(
      'CALL registrarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      { replacements: valores }
    );
    res.json({ message: 'Patient information registered successfully' });
  } catch (error) {
    console.error('Error al registrar paciente:', error);
    res.status(500).json({ error: 'Error al guardar los datos' });
  }
});

app.put('/deactivatePatient/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query('UPDATE usuarios SET estado = 0 WHERE id_usuario = :id', {
      replacements: { id }
    });
    res.json({ message: 'Patient deactivated successfully (Logical delete)' });
  } catch (error) {
    console.error('Error al desactivar paciente:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================================
// ARRANQUE DEL SERVIDOR
// ==========================================
app.listen(port, () => {
  console.log(`Servidor Express corriendo unificado en http://localhost:${port}`);
});