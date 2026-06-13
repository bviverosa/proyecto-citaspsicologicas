import React, { useState } from 'react';
import Inicio from './Inicio.jsx';
import Agenda from './Agenda.jsx';
import Tarea from './Tarea.jsx';

export default function DashboardPsicologo({ usuario, alCerrarSesion }) {
  const [areaActual, setAreaActual] = useState('inicio');

  return (
    <div className="dashboard-consultorio">
      <header className="dashboard-header">
        <div>
          <h1>Bienvenido/a, estás en SerenaMente</h1>
          <p className="cedula-tag">Cédula Profesional: {usuario?.cedula}</p>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* SIDEBAR */}
        <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <div className="user-profile-header" style={{ paddingBottom: '1rem' }}>
            <h3 style={{ color: 'white', margin: 0 }}>Dr(a). {usuario ? usuario.nombre : 'Psicólogo'}</h3>
            <p style={{ fontSize: '0.8rem', opacity: '0.7', margin: 0 }}>Panel de Control</p>
          </div>
          
          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '1rem 0' }} />
          
          {/* Navegación */}
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

          {/* Botón Cerrar Sesión fijo al final */}
          <button 
            className="btn-cerrar-sesion" 
            onClick={alCerrarSesion}
            style={{ 
              marginTop: 'auto', 
              background: 'transparent', 
              border: '1px solid rgba(255, 255, 255, 0.3)', 
              color: '#ff7675', 
              padding: '12px 16px', 
              borderRadius: '8px', 
              cursor: 'pointer',
              marginBottom: '20px' // Espacio al fondo
            }}
          >
            Cerrar Sesión
          </button>
        </aside>

        {/* MAIN: Aquí es donde se muestra el contenido */}
        <main className="dashboard-main">
          {areaActual === 'inicio' && <Inicio usuario={usuario} />}
          {areaActual === 'pacientes' && <h3>Mis Pacientes</h3>}
          {areaActual === 'crear-paciente' && <h3>Registrar Paciente</h3>}
          {areaActual === 'agenda' && <Agenda />}
          {areaActual === 'tareas' && <Tarea />}
        </main>
      </div>
    </div>
  );
}