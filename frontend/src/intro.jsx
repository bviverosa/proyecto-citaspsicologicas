import React, { useState } from 'react';
import './styles.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 1. Nuevo estado para controlar si se ve el login o el registro
  const [vista, setVista] = useState('login'); // valores: 'login' o 'registro'
  // Estado para alternar el perfil en el formulario de registro
  const [tipoRegistro, setTipoRegistro] = useState('psicologo'); 

  // Funciones de control
  const logout = () => {
    console.log("Cerrando sesión");
    setIsLoggedIn(false);
    setVista('login'); // Al salir, regresa al login
  };

  const login = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión...");
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    if (usuario === 'admin' && password === '1234') {
      console.log("Acceso concedido");
      setIsLoggedIn(true);
    } else {
      alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
    }
  };

  const registrarPsicologo = (e) => {
    e.preventDefault();
    alert("Psicólogo registrado con éxito.");
    setVista('login'); // Lo mandamos al login para que entre
  };

  const registrarPaciente = (e) => {
    e.preventDefault();
    alert("Paciente registrado con éxito.");
    setVista('login'); // Lo mandamos al login para que entre
  };

  const registrarPacienteEnApp = (e) => { e.preventDefault(); console.log("Paciente registrado en expediente"); };
  const agendarCita = (e) => { e.preventDefault(); console.log("Cita agendada"); };
  const asignarTarea = (e) => { e.preventDefault(); console.log("Tarea asignada"); };

  return (
    <div>
     {/* HEADER DINÁMICO */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🧠 SerenaMente <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>| NOM-004-SSA3-2012</span></h1>
        
        <div>
          {/* BOTÓN: Volver al inicio (Se muestra si NO ha iniciado sesión) */}
          {!isLoggedIn && (
            <span 
              onClick={() => window.location.reload()} 
              style={{ fontSize: '0.95rem', color: 'var(--blanco)', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
            >
              ← Volver al Inicio 🌿
            </span>
          )}

          {/* BOTÓN: Cerrar Sesión (Se muestra si YA inició sesión) */}
          {isLoggedIn && (
            <nav id="nav-sistema">
                <button onClick={logout}>Cerrar Sesión</button>
            </nav>
          )}
        </div>
      </header>

      {/* 2. SI NO ESTÁ LOGUEADO Y LA VISTA ES 'LOGIN' */}
      {!isLoggedIn && vista === 'login' && (
        <div id="login-container" style={{ maxWidth: '400px', margin: '100px auto', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center', color: 'var(--verde-oscuro)' }}>Iniciar Sesión</h2>
          <form id="form-login" onSubmit={login}>
              <div className="form-group">
                  <label htmlFor="usuario">Identificador del Psicólogo:</label>
                  <input type="text" id="usuario" required placeholder="Ej. PsicoRodriguez" />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <input type="password" id="password" required placeholder="••••••••" />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Ingresar al Sistema</button>
          </form>

          {/* NUEVO BOTÓN PARA IR A REGISTRO */}
          <div style={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '10px' }}>¿No tienes una cuenta?</p>
            <button 
              type="button" 
              onClick={() => setVista('registro')} 
              style={{ background: 'none', border: '1px solid var(--verde-oscuro)', color: 'var(--verde-oscuro)', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
            >
              Registrarse en el Sistema
            </button>
          </div>
        </div>
      )}

      {/* 3. SI NO ESTÁ LOGUEADO Y LA VISTA ES 'REGISTRO' */}
      {!isLoggedIn && vista === 'registro' && (
        <div id="registro-container" style={{ maxWidth: '450px', margin: '60px auto', background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '10px', textAlign: 'center', color: 'var(--verde-oscuro)' }}>Crear Nueva Cuenta</h2>
          
          {/* Selectores de perfil */}
          <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
            <button type="button" onClick={() => setTipoRegistro('psicologo')} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--verde-oscuro)', background: tipoRegistro === 'psicologo' ? 'var(--verde-oscuro)' : 'white', color: tipoRegistro === 'psicologo' ? 'white' : 'var(--verde-oscuro)', cursor: 'pointer', fontWeight: 'bold' }}>
              Psicólogo
            </button>
            <button type="button" onClick={() => setTipoRegistro('paciente')} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--verde-oscuro)', background: tipoRegistro === 'paciente' ? 'var(--verde-oscuro)' : 'white', color: tipoRegistro === 'paciente' ? 'white' : 'var(--verde-oscuro)', cursor: 'pointer', fontWeight: 'bold' }}>
              Paciente
            </button>
          </div>

          {/* Formulario de Psicólogo */}
          {tipoRegistro === 'psicologo' && (
            <form onSubmit={registrarPsicologo}>
              <div className="form-group"><label>Nombre Completo:</label><input type="text" required placeholder="Dr. Alejandro Gómez" /></div>
              <div className="form-group"><label>Cédula Profesional:</label><input type="text" required placeholder="Número de cédula" /></div>
              <div className="form-group"><label>Contraseña:</label><input type="password" required placeholder="••••••••" /></div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Registrar Psicólogo</button>
            </form>
          )}

          {/* Formulario de Paciente */}
          {tipoRegistro === 'paciente' && (
            <form onSubmit={registrarPaciente}>
              <div className="form-group"><label>Nombre Completo:</label><input type="text" required placeholder="Tu nombre" /></div>
              <div className="form-group"><label>CURP:</label><input type="text" required placeholder="18 caracteres" maxLength="18" /></div>
              <div className="form-group"><label>Contraseña:</label><input type="password" required placeholder="••••••••" /></div>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Registrar Paciente</button>
            </form>
          )}

          {/* BOTÓN PARA REGRESAR AL LOGIN */}
          <button 
            type="button" 
            onClick={() => setVista('login')} 
            style={{ background: 'none', border: 'none', color: '#666', textDecoration: 'underline', marginTop: '20px', cursor: 'pointer', width: '100%', fontSize: '0.85rem' }}
          >
            ← Volver al Inicio de Sesión
          </button>
        </div>
      )}

      {/* 4. INTERFAZ INTERNA (Cuando ya inició sesión) */}
      {isLoggedIn && (
        <main id="app-container">
          <section>
              <article>
                  <h2 style={{ color: 'var(--verde-oscuro)', marginBottom: '15px' }}>1. Expediente Clínico & Alta de Pacientes</h2>
                  <form id="form-paciente" onSubmit={registrarPacienteEnApp}>
                      <fieldset>
                          <legend>Ficha de Identificación Básica</legend>
                          <div className="grid-2">
                              <div className="form-group">
                                  <label htmlFor="nombre">Nombre Completo:</label>
                                  <input type="text" id="nombre" required placeholder="Nombre del paciente" />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="curp">CURP:</label>
                                  <input type="text" id="curp" required placeholder="Clave de Identidad" />
                              </div>
                          </div>
                          <div className="form-group">
                              <label htmlFor="consentimiento">
                                  <input type="checkbox" id="consentimiento" required />
                                  El paciente firma y acepta el Consentimiento Informado
                              </label>
                          </div>
                      </fieldset>
                      <button type="submit" className="btn-primary">Registrar en Expediente</button>
                  </form>
              </article>

              <article style={{ marginTop: '40px' }}>
                  <h2 style={{ color: 'var(--verde-oscuro)', marginBottom: '15px' }}>2. Agendar Nueva Cita</h2>
                  <form id="form-cita" onSubmit={agendarCita}>
                      <div className="grid-3" style={{ marginBottom: '15px' }}>
                          <div className="form-group">
                              <label htmlFor="select-paciente">Seleccionar Paciente:</label>
                              <select id="select-paciente" required>
                                  <option value="">-- Seleccione un paciente --</option>
                              </select>
                          </div>
                          <div className="form-group">
                              <label htmlFor="fecha-cita">Fecha:</label>
                              <input type="date" id="fecha-cita" required />
                          </div>
                          <div className="form-group">
                              <label htmlFor="hora-cita">Hora:</label>
                              <input type="time" id="hora-cita" required />
                          </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px' }} className="form-group">
                          <div>
                              <label htmlFor="modalidad">Modalidad:</label>
                              <select id="modalidad" required>
                                  <option value="Presencial">Presencial</option>
                                  <option value="Llamada Virtual">Llamada Virtual</option>
                              </select>
                          </div>
                          <div>
                              <label htmlFor="observaciones">Notas Clínicas Iniciales:</label>
                              <input type="text" id="observaciones" placeholder="Observaciones preliminares..." />
                          </div>
                      </div>
                      <button type="submit" className="btn-primary">Agendar Cita</button>
                  </form>
              </article>

              <article style={{ marginTop: '40px' }}>
                  <h3 style={{ marginBottom: '10px' }}>Historial y Control de Citas Activas</h3>
                  <table>
                      <thead>
                          <tr>
                              <th>Paciente</th>
                              <th>Fecha / Hora</th>
                              <th>Modalidad</th>
                              <th>Estado</th>
                              <th>Acciones</th>
                          </tr>
                      </thead>
                      <tbody id="tabla-citas-body"></tbody>
                  </table>
              </article>
          </section>

          <aside>
              <div>
                  <h3 style={{ color: 'var(--verde-oscuro)', marginBottom: '10px' }}>📋 Asignar Tarea Terapéutica</h3>
                  <form id="form-tarea" onSubmit={asignarTarea}>
                      <div className="form-group">
                          <label htmlFor="tarea-paciente">Para:</label>
                          <select id="tarea-paciente" required></select>
                      </div>
                      <div className="form-group">
                          <label htmlFor="descripcion-tarea">Descripción de la Actividad:</label>
                          <textarea id="descripcion-tarea" rows="2" required placeholder="Ej. Bitácora de pensamientos automáticos..."></textarea>
                      </div>
                      <button type="submit" className="btn-primary" style={{ padding: '6px' }}>Asignar</button>
                  </form>
              </div>

              <div>
                  <h4 style={{ marginBottom: '5px' }}>Seguimiento de Cumplimiento</h4>
                  <p style={{ fontSize: '0.8rem', color: '#7f8c8d', marginBottom: '10px' }}>*Nota: Sin penalizaciones por incumplimiento.</p>
                  <ul id="lista-tareas"></ul>
              </div>

              <div className="multimedia-box">
                  <h4 style={{ color: 'var(--verde-oscuro)' }}>🫁 Herramienta Co-Regulación</h4>
                  <p style={{ fontSize: '0.8rem', marginBottom: '5px' }}>Guía visual de respiración 4-7-8.</p>
                  <canvas id="canvasRespiracion" width="120" height="120"></canvas>
              </div>
          </aside>
        </main>
      )}

      <footer>
        <p>Desarrollado por: PsiqIA - ESCOM IPN (Peña Osorio Andrea, Peña Osorio Karen, Montes Martinez William Emir, Viveros Alvarado Bryan)</p>
        <p>&copy; 2026 SerenaMente - Cumplimiento de expediente electrónico.</p>
      </footer>
    </div>
  );
}

export default App;