import React from 'react';

export default function Inicio({ usuario }) {
  const pacientes = JSON.parse(localStorage.getItem('pacientes') || '[]');
  const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
  const citas = JSON.parse(localStorage.getItem('citas') || '[]');
  const proximaCita = citas.length > 0 ? citas[0] : null;

  return (
    <div className="inicio-dashboard" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Título centrado */}
      <h2 style={{ 
        color: 'var(--verde-oscuro)', 
        marginBottom: '3rem', // Más espacio entre el título y el grid
        textAlign: 'center',
        fontSize: '2rem' // Un título más prominente
      }}>
        Resumen de Actividades
      </h2>
      
      {/* Contenedor Grid 2x2 */}
      <div className="grid-2x2">
        <div className="card-stats"><h4>Citas Hoy</h4><p className="big-number">{citas.length}</p></div>
        <div className="card-stats"><h4>Pacientes Activos</h4><p className="big-number">{pacientes.length}</p></div>
        <div className="card-stats"><h4>Tareas Pendientes</h4><p className="big-number">{tareas.length}</p></div>
        
        {/* Tu bloque de Próxima Cita adaptado como la cuarta tarjeta */}
        <div className="card-stats">
          <h4>Próxima Cita</h4>
          {proximaCita ? (
            <p>{proximaCita.nombrePaciente} <br/> {proximaCita.hora}</p>
          ) : (
            <p style={{ fontSize: '0.9rem' }}>Sin citas próximas</p>
          )}
        </div>
      </div>
    </div>
  );
}