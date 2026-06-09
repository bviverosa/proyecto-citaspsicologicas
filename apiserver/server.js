
const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2');
require('dotenv').config();


app.use(express.json()); 

const pool = mysql.createPool({
  host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
  waitForConnections: true,    
  connectionLimit: 10,         
  queueLimit: 0,              
  keepAliveInitialDelay: 10000, 
  enableKeepAlive: true
});
app.get('/getPatientData/:id', (req, res) => {
 
results = pool.query('CALL obtenerFicha(?)', [req.params.id], function (error, results, fields) {
   if (error) throw error;
    res.json(results[0]);
  
})
})
app.patch('/updateFicha/:id', (req, res) => {
  const { id } = req.params; // El ID de la ficha a modificar
  
  
  const {
    nombre,
    fecha_nacim,
    genero,
    domicilio,
    telefono,
    ocupacion,
    escolaridad,
    estado_civil
  } = req.body;
  const valores = [
    id,
    nombre || null,
    fecha_nacim || null,
    genero || null,
    domicilio || null,
    telefono || null,
    ocupacion || null,
    escolaridad || null,
    estado_civil || null
  ];

  const query = 'CALL modificarFicha(?, ?, ?, ?, ?, ?, ?, ?, ?)';

  pool.query(query, valores, function (error, results) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al actualizar los datos' });
    }
    
    res.json({ message: 'Ficha actualizada parcialmente con éxito' });
  });
});

app.put('/deactivatePatient/:id', (req, res) => {
  const { id } = req.params;

 
  const query = 'UPDATE usuarios SET estado = 0 WHERE id_usuario = ?';

  pool.query(query, [id], function (error, results, fields) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    res.json({ message: 'Patient deactivated successfully (Logical delete)' });
  });
});
app.post('/registerPatientData', (req, res) => {
 

  const { 
    nombre,
    email, 
    fecha_nacim, 
    genero, 
    domicilio, 
    telefono, 
    ocupacion, 
    escolaridad, 
    estado_civil,
  } = req.body;
  
  

  pool.query('CALL registrarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, email, fecha_nacim, genero, domicilio, telefono, ocupacion, escolaridad, estado_civil], function (error, results, fields) {
    if (error) throw error;
    res.json({ message: 'Patient information registered successfully' });
  });
});
app.patch('/updatePatientData/:id', (req, res) => {
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
    pool.query('CALL actualizarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', valores, function (error, results, fields) {
      if (error) throw error;
      res.json({ message: 'Patient information updated successfully' });
      
    });
});
app.post('/registerPsicologistData', (req, res) => {
  const {
    nombre,
    email,
    cedula,
    enfoque
    }= req.body; 
    console.log(req.body);
    pool.query('CALL agregarPsicologo(?, ?, ?, ?)', [nombre, email, cedula, enfoque], function (error, results, fields) { 
      if (error) throw error;
      res.json({ message: 'Psychologist information registered successfully' });
    });
  });
  app.patch('/updatePsicologistData/:id', (req, res) => {
  const { id } = req.params;
  const { nombre,
    email,
    estado_actividad
   }= req.body;
  
    const valores = [
      id,
      nombre || null,
      email || null,
      estado_actividad || null
    ];
    pool.query('CALL actualizarPsicologo(?, ?, ?, ?)', valores, function (error, results, fields) {
      if (error) throw error;
      res.json({ message: 'Psychologist information updated successfully' });
    });
  });
//Citas
app.put('/addAppointment', (req, res) => {
  const { id_paciente, id_psicologo, fecha_hora, modalidad } = req.body; 
  const valores = [id_paciente, id_psicologo, fecha_hora, modalidad];
  pool.query('CALL agregarCita(?, ?, ?, ?)', valores, function (error, results, fields) {
    if (error) throw error;
    res.json({ message: 'Appointment added successfully' });
  });
});
app.get('getPsicologistData/:id', (req, res) => {
  pool.query('CALL obtenerPsicologo(?)', [req.params.id], function (error, results, fields) {
    if (error) throw error;
    res.json(results[0]);
  })});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


