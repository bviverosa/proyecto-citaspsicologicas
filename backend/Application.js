const express = require('express');
const app = express();
const port = 8080; 
require('dotenv').config();
const path = require('path');
const bycrypt = require('bcrypt');
const sequelize = require('./database.js'); 
const Usuario = require('./model/Usuario.js'); 
const { QueryTypes } = require('sequelize');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



app.patch('/updatePassword', async (req, res) => {
  const { email, nueva_contrasena,  vieja_contrasena } = req.body;
  console.log(req.body)
  try {
    const [rows] = await sequelize.query(
      'CALL obtenerUsuario(?)',
      { replacements: [email] }
    );

    if (!rows) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const contrasenaValida = await bycrypt.compare(vieja_contrasena, rows.contrasena);

    if (contrasenaValida) {
      const saltRounds = 10;
      const nuevaContrasenaHash = await bycrypt.hash(nueva_contrasena, saltRounds);
      await sequelize.query(
        'CALL actualizarContrasena(?, ?)',
        { replacements: [email, nuevaContrasenaHash] }
      );
      res.json({ message: 'Contraseña actualizada exitosamente' });
    }else{
       return res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }


  }catch (error) {

    console.error('Error al actualizar contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/logIn', async (req, res) => {
  const { email, contrasena } = req.body; // 'contrasena' viene en texto plano desde el formulario
console.log(email, contrasena);
  try {
    const [rows] = await sequelize.query(
      'CALL obtenerUsuario(?)',
      { replacements: [email] }
    );

    const usuario = rows.nombre_usuario; // Ajusta esto según la estructura real de tu respuesta
    console.log('Usuario encontrado:', usuario);
    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    
    const contrasenaValida = await bycrypt.compare(contrasena, rows.contrasena);

    if (!contrasenaValida) {
      return res.status(401).json({ error: 'Contraseña inválida' });
    }

    if (rows.estado !== 1) {
      return res.status(403).json({ error: 'Este usuario se encuentra inactivo' });
    }

  
    res.json({
      message: 'Login successful',
      user: {
        id: rows.id_usuario,
        nombre: rows.nombre_usuario,
        rol: rows.rol_usuario
      }
    });
} catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error interno del servidor al validar' });
  }
});

// Pacientes
//Endpoint para registrar los datos del paciente
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
    const contrasenaHash = await bycrypt.hash(contrasenaPlana, saltRounds);

  
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
    // Generar la contraseña
    // Ejemplo: "Carlos Mendoza" y Cédula "1234567" sería Carl4567
    const primerasCuatroLetras = nombre.substring(0, 4).replace(/\s+/g, '');
    const ultimosCuatroCedula = cedula.slice(-4); 
    const contrasenaPlana = `${primerasCuatroLetras}${ultimosCuatroCedula}`;
  
    const saltRounds = 10;
    const contrasenaHash = await bycrypt.hash(contrasenaPlana, saltRounds);

    const valores = [
      nombre, 
      email, 
      cedula, 
      enfoque, 
      contrasenaHash 
    ];

    await sequelize.query(
      'CALL agregarPsicologo(?, ?, ?, ?, ?)', 
      { replacements: valores }
    );

    res.json({ 
      message: 'Psychologist registered successfully',
      tempCredentials: {
        username: email,
        password: contrasenaPlana 
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


//Citas
//Endpoint para agendar una cita
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
//Endpoint para actualizar una cita
app.patch('/updateAppointment/:id', async (req, res) => {
  const { id } = req.params;
  const { 
    id_psicologo, 
    modalidad,
    fecha_hora 
    
  } = req.body;

  try {
    const [fecha, hora] = fecha_hora.split(' ');

    if (!fecha || !hora) {
      return res.status(400).json({ error: 'El formato de fecha_hora debe ser "YYYY-MM-DD HH:mm:ss"' });
    }

    const valores = [
      id,
      id_psicologo || null,
      modalidad || null,
      fecha || null,
      hora || null, 
    ];
     
    await sequelize.query('CALL actualizarCita(?,?,?,?,?)', {
      replacements: valores
    });

    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Endpoint para eliminar una cita que no ha ocurrido aún
app.delete('/deleteAppointment/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query('CALL eliminarCita(:id)', {
      replacements: { id }
    });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Endpoint para obtener la información de una cita específica
app.get('/getAppointmentbyPatient/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await sequelize.query('SELECT * FROM obtenercitaspaciente WHERE id_cliente = :id', {
      replacements: { id },
      type: QueryTypes.SELECT
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error('Error al obtener cita:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/getAppointment/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sequelize.query('CALL obtenerCita(:id)', {
      replacements: { id }
    });
    res.json(result[0]);
    console.log(result[0]);
  } catch (error) {
    console.error('Error al obtener cita:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
});
//Pagos
//Endpoint para actualizar el estado  o metodo de pago de una cita
app.patch('/updatePaymentStatus/:id', async (req, res) => {
  const { id } = req.params;
  const { estado_pago, metodo_pago } = req.body;
  try {
    await sequelize.query('CALL actualizarPago(:id, :estado_pago, :metodo_pago)', {
      replacements: { id, estado_pago, metodo_pago }
    });
    res.json({ message: 'Payment status updated successfully' });
  } catch (error) {
    console.error('Error al actualizar estado de pago:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Notas clinicas
//Endpoint para agregar una nota clínica a una cita
app.post('/addClinicalNote', async (req, res) => {
  const { id_cita, contenido, enfoque, id_expediente } = req.body;
  
  const valores = [id_cita, contenido, enfoque];

  try {
    await sequelize.query(
      'CALL agregarNotaClinica(?, ?, ?, ?)', 
      { replacements: valores }
    );
    
    res.json({ message: 'Clinical note added successfully' });
  } catch (error) {
    console.error('Error al agregar la nota clínica:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
/*app.patch('/updateClinicalNote/:id', async (req, res) => {
  const { id } = req.params; // ID de la nota a modificar
  const { contenido, enfoque } = req.body;

  try {
    await sequelize.query(
      'CALL modificarNotaClinica(:id, :contenido, :enfoque)', 
      { 
        replacements: { id, contenido, enfoque } 
      }
    );

    res.json({ message: 'Clinical note updated successfully' });
  } catch (error) {
    console.error('Error al modificar la nota clínica:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/
//Endpoint para obtener las notas clínicas de una cita específica
app.get('/getClinicalNotes/:id_expediente', async (req, res) => {
  const { id_expediente } = req.params;
  try {
    const result = await sequelize.query('CALL obtenerNota(:id_expediente)', {
      replacements: { id_expediente }
    });
    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener notas clínicas:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Sin endpoint para eliminar las notas clínicas, ya que por ética profesional no se deberían eliminar los registros clínicos, solo modificarlos si es necesario y siempre dejando un rastro de los cambios realizados.
//Actividades Paciente
app.post('/addActivity', async (req, res) => {
  const { descripcion, id_cita } = req.body;

  try {
    await sequelize.query('CALL agregarTarea( :descripcion, :id_cita)', {
      replacements: { id_cita, descripcion }
    });
    res.json({ message: 'Activity added successfully' });
  } catch (error) {
    console.error('Error al agregar actividad:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.patch('/uploadActivityFile/:id_tarea', async (req, res) => {
  const { id_tarea } = req.params;
  const { archivo_url } = req.body; // El link del archivo subido

  if (!archivo_url) {
    return res.status(400).json({ error: 'El campo archivo_url es requerido.' });
  }

  try {
    await sequelize.query(
      'CALL subirArchivoTarea(:id_tarea, :archivo_url)', 
      { replacements: { id_tarea, archivo_url } }
    );
    res.json({ message: 'Document attached to the task successfully' });
  } catch (error) {
    console.error('Error al subir archivo de la tarea:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});
app.delete('/deleteActivity/:id_tarea', async (req, res) => {
  const { id_tarea } = req.params; 

  try {
    await sequelize.query(
      'CALL eliminarTarea(?)', 
      { replacements: [id_tarea] }
    );

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    
    res.status(400).json({ 
      error: error.message || 'Internal server error' 
    });
  }
});
app.patch('/deleteFile/:id_tarea', async (req, res) => {
  const { id_tarea } = req.params;

  try { 
    await sequelize.query(
      'CALL eliminarArchivoTarea(?)',
      { replacements: [id_tarea] }
    );
    res.json({ message: 'File removed from the task successfully' });
  } catch (error) {
    console.error('Error al eliminar el archivo de la tarea:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
});
app.get('/getActivity/:id_cita', async (req, res) => {

  const { id_cita } = req.params;
  try {
    const result = await sequelize.query('CALL obtenerTarea(:id_cita)', {
      replacements: { id_cita }
    });
    res.json(result[0]);
  } catch (error) {
    console.error('Error al obtener la actividad:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo unificado en http://localhost:${port}`);
});