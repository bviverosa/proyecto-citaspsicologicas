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
app.patch('/updatePatientData/:id', async (req, res) => {
console.log(req.body);
  const {id}=req.params;
  const { nombre,
    email, 
    fecha_nacim, 
    genero, 
    domicilio, 
    telefono, 
    ocupacion, 
    escolaridad, 
    estado_civil } = req.body;
    const valores = [
      id,
      nombre || null,
      email || null,
      fecha_nacim || null,
      genero || null,
      domicilio || null,
      telefono || null,
      ocupacion || null,
      escolaridad || null,
      estado_civil || null
    ];
      try{
        await sequelize.query('CALL modificarFicha(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', {
          replacements: valores
        });
        res.json({ message: 'Patient information updated successfully' });
      }catch (error) {  
        console.error('Error al actualizar paciente:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      
    });

app.post('/registerPsicologistData', async (req, res) => {
  const {
    nombre,
    email,
    cedula,
    enfoque
    }= req.body; 
    console.log(req.body);
    try{
      await sequelize.query('CALL agregarPsicologo(?, ?, ?, ?)', {
        replacements: [nombre, email, cedula, enfoque]
      });
      res.json({ message: 'Psychologist information registered successfully' });
    }catch (error) {  
      console.error('Error al registrar psicólogo:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.patch('/updatePsicologistData/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre,
    email,
    cedula,
    estado_actividad
   }= req.body;
  
    const valores = [
      id,
      nombre || null,
      email || null,
      estado_actividad || null
    ];
    try{
      await sequelize.query('CALL actualizarPsicologo(?, ?, ?, ?)', {
        replacements: valores
      });
      res.json({ message: 'Psychologist information updated successfully' });
    }catch (error) {
      console.error('Error al actualizar psicólogo:', error);
      res.status(500).json({ error: 'Internal server error' });
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
app.put('/addAppointment', async (req, res) => {
  const { id_paciente, id_psicologo, fecha_hora, modalidad } = req.body; 
  const valores = [id_paciente, id_psicologo, fecha_hora, modalidad];
  try{
    await sequelize.query('CALL agendarCita(?, ?, ?, ?)', {
      replacements: valores
    });
    res.json({ message: 'Appointment scheduled successfully' });
  } catch (error) {
    console.error('Error al agendar cita:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/getPsicologistData/:id', async (req, res) => {
  console.log(req.params.id);
  try{
    const result = await sequelize.query('CALL obtenerPsicologo(:id)', {
      
      replacements: { id: req.params.id }
    });
    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener psicólogo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Servidor Express corriendo unificado en http://localhost:${port}`);
});