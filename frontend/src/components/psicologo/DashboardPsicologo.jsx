// src/components/dashboard/DashboardPsicologo.jsx
import React from 'react';

export default function DashboardPsicologo({ usuario, alCerrarSesion }) {
  return (
    <div className="dashboard-consultorio">
      <header className="dashboard-header">
        <div>
          <h1>Bienvenido/a, Dr(a). {usuario.nombre || 'Especialista'}</h1>
          <p className="cedula-tag">Cédula Profesional: {usuario.cedula}</p>
        </div>
        <button onClick={alCerrarSesion} className="btn-logout">
          Cerrar Sesión 🚪
        </button>
      </header>

      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <nav>
            <a className="active">📋 Agenda de Pacientes</a>
            <a>📁 Expedientes Clínicos</a>
            <a>💬 Mensajes / Consultas</a>
            <a>⚙️ Configuración de Cuenta</a>
          </nav>
        </aside>

        <main className="dashboard-main">
          <div className="card-vacia">
            <h3>Panel de Control Activo</h3>
            <p>Selecciona una opción del menú para comenzar a gestionar tus consultas psicoeducativas.</p>
          </div>
        </main>
      </div>
    </div>
  );
}