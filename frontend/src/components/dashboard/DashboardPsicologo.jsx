import React, { useState } from 'react';
import Inicio from './Inicio.jsx';
import Agenda from './Agenda.jsx';
import CrearPaciente from './CrearPaciente.jsx';
import Tareas from './Tarea.jsx';
import VerPacientes from './VerPacientes.jsx';

export default function DashboardPsicologo({ usuario, alCerrarSesion }) {
  const [areaActual, setAreaActual] = useState('inicio');

  // Protección de seguridad
  if (!usuario) return <div style={{ padding: '50px', textAlign: 'center' }}><h2>Cargando sesión...</h2></div>;

  return (
    <div className="dashboard-consultorio">
      <header className="dashboard-header">
        <div>
          <h1>Bienvenido/a, estás en SerenaMente</h1>
          <p className="cedula-tag">Cédula Profesional: {usuario?.cedula || 'No registrada'}</p>
        </div>
      </header>

      <div className="dashboard-grid">
        <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <div className="user-profile-header" style={{ paddingBottom: '1rem' }}>
            <h3 style={{ color: 'white', margin: 0 }}>Dr(a). {usuario.nombre || 'Psicólogo'}</h3>
            <p style={{ fontSize: '0.8rem', opacity: '0.7', margin: 0 }}>Panel de Control</p>
          </div>
          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '1rem 0' }} />
          
          <div className="nav-group" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <button onClick={() => setAreaActual('inicio')}>🏠 Inicio</button>
            <button onClick={() => setAreaActual('agenda')}>📅 Agenda</button>
            
            <div style={{ marginTop: '2rem', padding: '0 16px', fontSize: '0.75rem', opacity: '0.6', textTransform: 'uppercase', fontWeight: 'bold' }}>
              Pacientes
            </div>
            <button onClick={() => setAreaActual('pacientes')}>👥 Ver Todos</button>
            <button onClick={() => setAreaActual('crear-paciente')}>➕ Registrar Nuevo</button>
            <button onClick={() => setAreaActual('tareas')}>📋 Asignar Tareas</button>
          </div>

          <button 
            className="btn-cerrar-sesion" 
            onClick={alCerrarSesion}
            style={{ marginTop: 'auto', background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.3)', color: '#ff7675', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' }}
          >
            Cerrar Sesión
          </button>
        </aside>

        <main className="dashboard-main">
          {/* PASAMOS EL USUARIO A TODAS LAS ÁREAS */}
          {areaActual === 'inicio' && <Inicio usuario={usuario} />}
          {areaActual === 'agenda' && <Agenda usuario={usuario} />}
          {areaActual === 'pacientes' && <VerPacientes usuario={usuario} />}
          {areaActual === 'crear-paciente' && <CrearPaciente usuario={usuario} />}
          {areaActual === 'tareas' && <Tareas usuario={usuario} />}
        </main>
      </div>
    </div>
  );
}