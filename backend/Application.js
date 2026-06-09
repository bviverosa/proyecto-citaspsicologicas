const express = require('express');
const app = express();
const port = 8080; 
require('dotenv').config();
const path = require('path');
const bycrypt = require('bcrypt');
// IMPORTANTE: Importamos tu conexión real
const sequelize = require('./database.js'); 
const Usuario = require('./model/Usuario.js'); // Importamos tu modelo

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Pacientes
//Endpoint para registrar los datos del paciente
/*
EN PROCESO
app.patch('/updatePassword', async (req, res) => {
  const { id_usuario, nueva_contrasena,  vieja_contrasena } = req.body;
  try {
});*/

app.post('/registerPatientData', async (req, res) => {
  const { 
    nombre, email, fecha_nacim, genero, domicilio, 
    telefono, ocupacion, escolaridad, estado_civil 
  } = req.body;

  try {
  
    const primerasCuatroLetras = nombre.substring(0, 4).replace(/\s+/g, '');
    const anioNacimiento = new Date(fecha_nacim).getFullYear();
    const contrasenaPlana = `${primerasCuatroLetras}${anioNacimiento}`;


    const saltRounds = 10;
    const contrasenaHash = await bcrypt.hash(contrasenaPlana, saltRounds);

  
    const valores = [
      nombre, email, fecha_nacim, genero, domicilio, 
      telefono, ocupacion, escolaridad, estado_civil, 
      contrasenaHash 
    ];

    await sequelize.query(
      'CALL registrarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      { replacements: valores }
    );

  
    res.json({ 
      message: 'Patient information registered successfully',
      tempCredentials: {
        username: email,
        password: contrasenaPlana 
      }
    });

  } catch (error) {
    console.error('Error al registrar paciente:', error);
    res.status(500).json({ error: 'Error al guardar los datos' });
  }
});
//Obtener los datos del paciente para mostrar en la ficha
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
//Endpoint para actualizar datos del paciente
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
//Endpoint para desactivar paciente
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
//Psicólogos
//Endpoint para registrar los datos del psicólogo
app.post('/registerPsychologistData', async (req, res) => {
  const { nombre, email, cedula, enfoque } = req.body;

  try {
    // =========================================================================
    // 1. GENERAR CONTRASEÑA TEMPORAL 
    // Ejemplo: "Carlos Mendoza" y Cédula "1234567" -> Carl4567
    // =========================================================================
    const primerasCuatroLetras = nombre.substring(0, 4).replace(/\s+/g, '');
    const ultimosCuatroCedula = cedula.slice(-4); // Toma los últimos 4 caracteres
    const contrasenaPlana = `${primerasCuatroLetras}${ultimosCuatroCedula}`;

    // =========================================================================
    // 2. HASHEAR LA CONTRASEÑA CON BCRYPT
    // =========================================================================
    const saltRounds = 10;
    const contrasenaHash = await bcrypt.hash(contrasenaPlana, saltRounds);

    // =========================================================================
    // 3. ARREGLO DE VALORES PARA EL STORED PROCEDURE
    // El orden debe coincidir exactamente con los IN del SP + el Hash
    // =========================================================================
    const valores = [
      nombre, 
      email, 
      cedula, 
      enfoque, 
      contrasenaHash // <-- Enviamos el hash al SP
    ];

    // Ejecutamos el procedimiento con los 5 signos de interrogación (4 originales + hash)
    await sequelize.query(
      'CALL agregarPsicologo(?, ?, ?, ?, ?)', 
      { replacements: valores }
    );

    // Respondemos con éxito y mostramos la contraseña plana por única vez
    res.json({ 
      message: 'Psychologist registered successfully',
      tempCredentials: {
        username: email,
        password: contrasenaPlana // Para que se la puedas entregar al psicólogo
      }
    });

  } catch (error) {
    console.error('Error al registrar psicólogo:', error);
    res.status(500).json({ error: 'Error al guardar los datos del psicólogo' });
  }
});
//Endpoint para actualizar los datos del psicólogo
app.patch('/updatePsychologistData/:id', async (req, res) => {
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
//Obtener los datos del psicólogo 
app.get('/getPsychologistData/:id', async (req, res) => {
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



app.post('/addAppointment', async (req, res) => {
  const { 
    id_paciente, 
    id_psicologo, 
    fecha_hora, 
    modalidad,
    monto,
    metodo_pago,
    estado_pago,
    url_pago
  } = req.body; 
  console.log(req.body);
  try {
    //William IMPORTANTE: Asegurate que en el front el formato de fecha_hora sea "YYYY-MM-DD HH:mm:ss" para que puedas separarlo correctamente
    const [fecha, hora] = fecha_hora.split(' ');

    if (!fecha || !hora) {
      return res.status(400).json({ error: 'El formato de fecha_hora debe ser "YYYY-MM-DD HH:mm:ss"' });
    }

    const valores = [
      id_paciente,   
      id_psicologo,  
      fecha,         
      hora,          
      modalidad,     
      monto,         
      metodo_pago,   
      estado_pago,
      url_pago||null      
    ];
    console.log(valores);

    await sequelize.query('CALL agendarCita(?, ?, ?, ?, ?, ?, ?, ?, ?)', {
      replacements: valores
    });

    res.json({ message: 'Appointment scheduled successfully' });
  } catch (error) {
    console.error('Error al agendar cita:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Servidor Express corriendo unificado en http://localhost:${port}`);
});